import json


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
    all_products += json_data

with open('./data/all_products.json', 'w') as file:
    json.dump(all_products, file, indent=4)
