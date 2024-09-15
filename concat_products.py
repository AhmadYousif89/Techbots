#!/usr/bin/env python
"""
Concatenate all products from different JSON files into a single JSON file.
"""

import os
import re
import json
from pathlib import Path
from random import randint
from typing import Any, Dict, List
from logger import setup_logger


logger = setup_logger(
    f'./{os.path.basename(__file__)}', './logs/concat_products.log'
)


def load_json_file(file_path: Path) -> List[Dict[str, Any]]:
    """Load a JSON file and return its content as a list of dictionaries."""
    try:
        with file_path.open('r', encoding='utf-8') as file:
            return json.load(file)
    except FileNotFoundError:
        logger.error(f"File not found: {file_path}")
        return []


def clean_string(input_str: str) -> str:
    """Remove non-ASCII characters from a string."""
    return re.sub(r'[^\x00-\x7F]', '', input_str)


def clean_object(obj: Dict[str, Any]) -> Dict[str, Any]:
    """Recursively clean a dictionary object by removing non-ASCII characters."""
    return {
        key: (
            clean_string(value)
            if isinstance(value, str)
            else clean_object(value) if isinstance(value, dict) else value
        )
        for key, value in obj.items()
    }


def process_product(product):
    """Process a product dictionary and clean its values."""
    if 'price' in product:
        product['price'] = float(
            product['price'].replace(',', '').replace('$', '')
        )

    if 'stock_quantity' not in product:
        product.setdefault('stock_quantity', randint(5, 50))

    for review in product.get('top_reviews', []):
        review.setdefault('asin', product.get('asin'))
        review.setdefault('link', 'N/A')

    return clean_object(product)


def main():
    data_dir = Path('./data')
    all_products = []
    FILE_NAMES = [
        re.sub(r'^fetched_(.+)\.json$', r'\1', file.name)
        for file in data_dir.glob('fetched_*.json')
    ]

    for file in FILE_NAMES:
        path = data_dir / f'fetched_{file}.json'
        if not path.exists():
            logger.warning(f"File not found: {path}")
            continue
        json_data = load_json_file(path)
        all_products.extend(map(process_product, json_data))

    products_file = data_dir / 'products.json'

    try:
        with products_file.open('w', encoding='utf-8') as file:
            json.dump(all_products, file, indent=4)
        logger.info(
            f'JSON file cleaned and saved as {products_file} with total of {len(all_products)} products.'
        )
    except Exception as error:
        logger.error('Error cleaning JSON file:', exc_info=True)


if __name__ == "__main__":
    main()
