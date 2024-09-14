#!/usr/bin/env python3
"""
Create image placeholders for the main images of products in a JSON file.
"""

import os
import json
import base64
import subprocess
import concurrent.futures
from logger import setup_logger

logger = setup_logger(__name__, './logs/resize_images.log')


def resize_images(input_json_file, output_json_file, size=20):
    """Resizes images from URLs specified in a JSON file.

    Args:
        input_json_file: Path to the input JSON file.
        output_json_file: Path to the output JSON file.
    """
    try:
        with open(input_json_file, 'r') as f:
            data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        logger.error(f"Loading data from \"{input_json_file}\"\n{e}")
        return

    categories = list(set([product['category'] for product in data]))
    images = {category: [] for category in categories}

    for product in data:
        category = product['category']
        image = product['main_image']['link']
        if image and image not in images[category]:
            images[category].append(image)

    output_json = {}
    for category, images in images.items():
        output_json[category] = create_thumbnails(images, category, size)

    with open(output_json_file, 'w') as f:
        json.dump(output_json, f, indent=4)


def create_thumbnails(images, category, size=20):
    """Creates thumbnails for a list of images and returns their data URIs.

    Args:
        images: List of image URLs.
        category: Category of the images.
        size: Size of the thumbnails in pixels.

    Returns:
        List of image data URIs.
    """
    if not os.path.exists(f'thumbnails/{category}'):
        os.makedirs(f'thumbnails/{category}', exist_ok=True)

    data_uris = []
    with concurrent.futures.ThreadPoolExecutor() as executor:
        future_to_image = {
            executor.submit(process_image, image, category, size): image
            for image in images
        }
        for future in concurrent.futures.as_completed(future_to_image):
            data_uri = future.result()
            if data_uri is not None:
                data_uris.append(data_uri)

    return data_uris


def process_image(image, category, size):
    """Resizes an image and returns its data URI."""
    image_name = image.split('/')[-1].replace('.jpg', '_thumb.jpg')
    thumbnail_path = f'thumbnails/{category}/{image_name}'
    if not os.path.exists(thumbnail_path):
        try:  # Resize the image using ffmpeg
            subprocess.run(
                f'ffmpeg -y -i {image} -vf scale={size}:-1 {thumbnail_path}',
                check=True,
            )
        except subprocess.CalledProcessError as e:
            logger.error(f"Processing image \"{image}\" failed\n{e}")
            return
    # Convert the thumbnail to a data URI
    with open(thumbnail_path, "rb") as f:
        encoded_string = base64.b64encode(f.read()).decode('utf-8')
        data_uri = f"data:image/jpg;base64,{encoded_string}"
        return data_uri


# Example usage:
input_json = 'data/products.json'
output_json = 'data/image_data_uri.json'


resize_images(input_json, output_json)