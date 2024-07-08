import requests
import json
import os

# Define your ASIN and API key
asin = 'B0CP8D4SM2'
api_key = 'D86C35C4BFD645119632B8061DD545D1'
base_url = f'https://api.asindataapi.com/request/'

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

# Define the directory and file path
directory = f'./data/{asin}'
file_path = os.path.join(directory, 'reviews.json')

# Create the directory if it doesn't exist
os.makedirs(directory, exist_ok=True)

# Write the reviews to a JSON file
with open(file_path, 'w') as file:
    json.dump(result, file, indent=4)

print(f"Reviews saved to {file_path}")
