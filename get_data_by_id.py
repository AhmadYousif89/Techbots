from random import randint
import requests
import json
import os


def load_json_file(file_path):
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
        return data
    except FileNotFoundError:
        print(f"File not found: {file_path}")
        return []


productType = 'gaming_labtops'

json_data = load_json_file(f'./data/list_{productType}.json')

api_key = '86615A7E8B964DD78590F880BB0707E9'
base_url = 'https://api.asindataapi.com/request'


def fetch_product_details(asin):
    product_params = {
        'api_key': api_key,
        'type': 'product',
        'amazon_domain': 'amazon.com',
        'asin': asin,
        'output': 'json',
    }

    response = requests.get(base_url, params=product_params)
    if response.status_code > 399:
        print(
            f"Failed to fetch product details for ASIN {asin}: {response.status_code}"
        )
        return None

    product = response.json().get('product', {})
    print(f"Fetched product ASIN {asin}")

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


file_path = f'./data/fetched_{productType}.json'
if not os.path.exists(file_path):
    # Initialize the JSON file with an empty list if it doesn't exist
    try:
        with open(file_path, 'w') as file:
            json.dump([], file, indent=4)
    except IOError as e:
        print(f"Error initializing the file: {e}")

# Fetch and save detailed product information incrementally
limit = 20
print(f"Processing {limit} products for category {productType}.")
for i, data in enumerate(json_data[:limit], start=1):
    asin = data.get('asin')
    price = data.get('price')
    productType = data.get('category')
    if asin:
        product_details = fetch_product_details(asin)
        if product_details:
            product_details['price'] = price
            product_details['category'] = productType
            product_details['stock_quantity'] = randint(5, 50)
            try:
                with open(file_path, 'r+') as file:
                    data = json.load(file)
                    data.append(product_details)
                    file.seek(0)
                    json.dump(data, file, indent=4)
            except IOError as e:
                print(f"Error writing to the file: {e}")

            print(f"Processed {i}/{len(json_data[:limit])} products")

print("All products have been processed and saved.")
