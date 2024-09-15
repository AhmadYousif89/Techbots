import os
import json
import requests
from pathlib import Path
from random import randint
from dotenv import load_dotenv
from logger import setup_logger

load_dotenv()

data_dir = Path('./data')
logger = setup_logger(
    f'./{os.path.basename(__file__)}', './logs/get_data_by_id.log'
)


def load_json_file(file_path):
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except IOError:
        logger.error(f"File not found: {file_path}")
        return []


def fetch_product_details(asin):
    api_key = os.getenv('ASIN_API_KEY', '')
    base_url = 'https://api.asindataapi.com/request'

    product_params = {
        'api_key': api_key,
        'type': 'product',
        'amazon_domain': 'amazon.com',
        'asin': asin,
        'output': 'json',
    }

    response = requests.get(base_url, params=product_params)
    if response.status_code > 399:
        logger.error(
            f"Failed to fetch product details for ASIN {asin}: {response.status_code}"
        )
        return None

    product = response.json().get('product', {})
    logger.info(f"Fetched product ASIN {asin}")

    return {
        'title': product.get('title'),
        'asin': product.get('asin'),
        'brand': product.get('brand'),
        'description': product.get('description'),
        'color': product.get('color'),
        'rating': product.get('rating'),
        'rating_breakdown': product.get('rating_breakdown'),
        'ratings_total': product.get('ratings_total'),
        'main_image': product.get('main_image'),
        'images': product.get('images'),
        'images_count': product.get('images_count'),
        'videos': product.get('videos'),
        'videos_count': product.get('videos_count'),
        'top_reviews': product.get('top_reviews'),
        'specifications_flat': product.get('specifications_flat'),
        'feature_bullets_flat': product.get('feature_bullets_flat'),
    }


def get_filenames():
    return [
        file.name.split('_')[-1].split('.')[0]
        for file in data_dir.iterdir()
        if file.name.startswith('list_')
    ]


def load_json_data(filenames):
    json_data = []
    for filename in filenames:
        file_path = data_dir / f'list_{filename}.json'
        json_data.extend(load_json_file(file_path))
    logger.info(json_data)
    return json_data


def initialize_fetched_files(json_data):
    for jdata in json_data:
        jtype = jdata.get('category')
        path = data_dir / f'fetched_{jtype}.json'
        if not path.exists():
            try:
                with open(path, 'w') as f:
                    json.dump(jdata, f, indent=4)
            except IOError as e:
                logger.error(f"Error initializing the file: {e}")


def process_products(json_data, limit=20):
    print(f"Processing {limit} products.")
    for i, data in enumerate(json_data[:limit], start=1):
        asin = data.get('asin')
        price = data.get('price')
        product_type = data.get('category')
        if asin:
            product_details = fetch_product_details(asin)
            if product_details:
                product_details['price'] = price
                product_details['category'] = product_type
                product_details['stock_quantity'] = randint(5, 50)
                save_product_details(product_details, product_type)
            print(f"Processed {i}/{limit} products")


def save_product_details(product_details, product_type):
    file_path = data_dir / f'fetched_{product_type}.json'
    try:
        with open(file_path, 'r+') as file:
            data = json.load(file)
            data.append(product_details)
            file.seek(0)
            json.dump(data, file, indent=4)
    except IOError as e:
        logger.error(f"Error writing to the file: {e}")


def main():
    filenames = get_filenames()
    json_data = load_json_data(filenames)
    # initialize_fetched_files(json_data)
    # process_products(json_data)
    # print("All products have been processed and saved.")


if __name__ == "__main__":
    main()
