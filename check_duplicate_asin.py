#!/usr/bin/env python3
"""
Check if a JSON file contains duplicate asin values.
"""

import os
import re
import json
from pathlib import Path
from logger import setup_logger

log_dir = Path('./logs')
log_file = log_dir / 'duplicate_asins.log'
logger = setup_logger(f'./{os.path.basename(__file__)}', log_file)


def get_top_lvl_asins(json_file):
    """Process a JSON file and extract the top-level asin values."""
    top_level_asins = []  # Using a list to preserve the order of asin values
    seen_asins = set()  # Keep track of asin values to avoid duplicates
    with open(json_file, 'r') as f:
        lines = f.readlines()
    # Join all the lines and load it as a full JSON object
    json_data = json.loads(''.join(lines))
    # Iterate through the JSON objects and map each `asin` to its correct line number
    for obj in json_data:
        asin_value = obj.get("asin")
        depth = 0
        for line_number, line in enumerate(lines, start=1):
            # Update the depth based on the number of opening and closing braces
            depth += line.count('{') - line.count('}')
            if f'"asin": "{asin_value}"' not in line:
                continue
            # Check if the asin value is at the top level
            if depth == 1:
                if (asin_value, line_number) not in seen_asins:
                    top_level_asins.append((asin_value, line_number))
                    seen_asins.add((asin_value, line_number))
    return top_level_asins


def check_duplicate_asin(json_file):
    """Check if a JSON file contains duplicate asin values."""
    try:
        asin_values = get_top_lvl_asins(json_file)
    except FileNotFoundError:
        logger.error(f"File '{json_file}' not found.")
        return
    except IOError:
        logger.error(f"Unable to read file '{json_file}'.")
        return

    duplicates = {
        asin: [line for _, line in asin_values if _ == asin]
        for asin, _ in set(asin_values)
        if sum(1 for a, _ in asin_values if a == asin) > 1
    }

    if duplicates:
        msg = f"found {len(duplicates)} duplicate(s) in {json_file}:"
        logger.warning(msg)
        for asin, lines in duplicates.items():
            for line in lines:
                logger.info(f"asin {asin}: {json_file}({line})")
            print('-' * 80)


def print_log_separator(log_file, separator='='):
    """Print a separator line after the last log entry."""
    # open the log file in append/read mode
    with open(log_file, 'a+') as f:
        f.seek(0)  # Move to the beginning of the file
        lines = f.readlines()
        f.seek(0, 2)  # Move to the end of the file
        max_line_length = (
            max((len(line.rstrip()) for line in lines), default=0)
            if lines and lines[-1].strip() and separator not in lines[-1]
            else 0
        )
        if max_line_length:
            f.write(separator * max_line_length + '\n')


if __name__ == '__main__':

    data_dir = Path('./data')
    FILE_NAMES = [
        re.sub(r'^fetched_(.+)\.json$', r'\1', file.name)
        for file in data_dir.glob('fetched_*.json')
    ]

    for json_file in FILE_NAMES:
        file = data_dir / f'fetched_{json_file}.json'
        if not file.exists():
            logger.error(f"{file} does not exist.")
            continue
        check_duplicate_asin(file)

    if log_file.exists():
        print_log_separator(log_file)
