import json
from random import randint


productTypes = [
    'gaming_labtops',
    'power_banks',
    'cpus',
    'labtops',
    'routers',
    'gaming_keyboards',
    'monitors',
    'mobiles',
    'computers',
    'headsets',
    'gpus',
    'watches',
]


def load_json_file(file_path):
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
        return data
    except FileNotFoundError:
        print(f"File not found: {file_path}")
        return []


all_products = []
for productType in productTypes:
    json_data = load_json_file(f'./data/fetched_{productType}.json')
    # check stock_quantity field and a random value if it's not present
    for product in json_data:
        if 'price' in product:
            # convert price from "$1,000.00" to 1000.00
            product['price'] = float(
                product['price'].replace(',', '').replace('$', '')
            )
        if 'stock_quantity' not in product:
            product['stock_quantity'] = randint(5, 50)
    all_products += json_data

with open('./data/all_products.json', 'w') as file:
    json.dump(all_products, file, indent=4)
