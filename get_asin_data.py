from dotenv import load_dotenv
from os import getenv
import requests
import json

# Load environment variables
load_dotenv()

api_key = getenv('ASIN_API_KEY')
base_url = 'https://api.asindataapi.com/request'

# Parameters for the API request
params = {
    'api_key': api_key,
    'type': 'search',
    'amazon_domain': 'amazon.com',
    'search_term': 'gaming labtops',
    'output': 'json',
}

# Send the API request
response = requests.get(base_url, params=params)

# Check if the request was successful
if response.status_code > 399:
    print(f"Failed to retrieve data: {response.status_code}")
    exit()

products = response.json().get('search_results', [])
print(f"Found {len(products)} items")

data = []

for product in products:
    fetched_product = {
        'title': product.get('title'),
        'asin': product.get('asin'),
        'image': product.get('image'),
        'rating': product.get('rating'),
        'rating_total': product.get('ratings_total'),
        'price': product.get('price', {}).get('raw'),
        'category': 'gaming-laptops',
    }
    data.append(fetched_product)

with open('./data/list_gaming_labtops.json', 'w') as file:
    json.dump(data, file, indent=4)
