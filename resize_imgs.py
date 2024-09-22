#!/usr/bin/env python3
"""
Create image placeholders for the main images of products in a JSON file.
"""
import os
import json
import base64
import subprocess
from sys import argv
from pathlib import Path
import concurrent.futures
from logger import setup_logger

logger = setup_logger(
    f'./{os.path.basename(__file__)}',
    './logs/resize_images.log',
    info_formatr='%(levelname)s: %(asctime)s - %(message)s',
)

data_dir = Path('./data')
thumb_dir = Path('./thumbnails')
TYPE_IMAGE_LIST = list[dict[str, str]]
TYPE_IMAGES = dict[str, TYPE_IMAGE_LIST]


def resize_images(input_json_file: str, output_json_file: str, size: int):
    """Resizes images from URLs specified in a JSON file.

    Args :
    -   **input_json_file** : Path to the input JSON file.
    -   **output_json_file** : Path to the output JSON file.
    -   **size** : Size of the thumbnails in pixels.
    """
    try:
        with open(input_json_file, 'r') as f:
            data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        logger.error(f"Failed to load data from {input_json_file}\n{e}")
        return

    categories = list(set([product['category'] for product in data]))

    images: TYPE_IMAGES = {category: [] for category in categories}

    for product in data:
        asin = product['asin']
        category = product['category']
        image = product['main_image']['link']
        if image and image not in images[category]:
            images[category].append({asin: image})

    data_uri: TYPE_IMAGES = {}
    for category, image_data in images.items():
        data_uri[category] = create_thumbnails(image_data, category, size)

    with open(output_json_file, 'w') as f:
        json.dump(data_uri, f, indent=4)
        logger.info(f"Images data has been saved in {output_json_file}")


def create_thumbnails(image_data: TYPE_IMAGE_LIST, category: str, size: int):
    """Creates thumbnails for a list of images and returns their data URIs.

    Args:
    -   **images**: List of image URLs.
    -   **category**: Category of the images.
    -   **size**: Size of the thumbnails in pixels.

    Returns :
    -   List of image data URIs.
    """
    path = thumb_dir / category
    if not path.exists():
        path.mkdir(parents=True)

    data_uris = []
    with concurrent.futures.ThreadPoolExecutor() as executor:
        future_to_image = {}
        for image in image_data:
            for asin in image:
                future = executor.submit(
                    process_image, image[asin], category, size
                )
                future_to_image[future] = asin

        for future in concurrent.futures.as_completed(future_to_image):
            data_uri = future.result()
            if data_uri:
                # Add the data URI to the list, indexed by the ASIN i.e {ASIN: data_uri}
                data_uris.append({future_to_image[future]: data_uri})

    return data_uris


def process_image(image, category, size):
    """Resizes an image and returns its data URI."""
    image_name = image.split('/')[-1].replace('.jpg', '_thumb.jpg')
    thumbnail_path = thumb_dir / f'{category}/{image_name}'
    if not thumbnail_path.exists():
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


if __name__ == '__main__':
    input_json = 'data/products.json'
    output_json = 'data/thumbnail_data_uri.json'
    size = int(argv[1]) if len(argv) > 1 else 10

    resize_images(input_json, output_json, size)
