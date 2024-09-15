import json
import requests
from os import getenv
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

api_key = getenv('ASIN_API_KEY')
base_url = f'https://api.asindataapi.com/request/'
asin = 'B0CP8D4SM2'

# Parameters for the API request
params = {
    'api_key': api_key,
    'type': 'reviews',
    'amazon_domain': 'amazon.com',
    'asin': asin,
}

# Send the API request
response = requests.get(base_url, params=params)

# Check if the request was successful
if response.status_code > 399:
    print(f'Failed to fetch reviews: {response.status_code} - {response.text}')
    exit()

# Parse the JSON response
result = response.json()

data = {
    'product': result.get('product'),
    'reviews': result.get('reviews'),
    'top_positive': result.get('top_positive'),
    'top_critical': result.get('top_critical'),
}

print(f"Found {len(result['reviews'])} reviews")

data_dir = Path('./data')
if not data_dir.exists():
    data_dir.mkdir()

file_path = data_dir / 'reviews.json'
# Write the reviews to a JSON file
with open(file_path, 'w') as f:
    json.dump(result, f, indent=4)

print(f"Reviews saved to {file_path}")
