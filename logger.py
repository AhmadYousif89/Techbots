import logging
import os


def setup_logger(logger_name, log_file, level=logging.INFO):
    if not os.path.exists(os.path.dirname(log_file)):
        os.makedirs(os.path.dirname(log_file))

    with open(log_file, 'a') as f:
        f.write('=' * 100 + '\n')

    logger = logging.getLogger(logger_name)
    logger.setLevel(level)

    # Create a file handler
    log_file_handler = logging.FileHandler(log_file)
    log_file_handler.setLevel(level)

    # Create a console handler
    console_handler = logging.StreamHandler()
    console_handler.setLevel(level)

    # Create a logging format
    formatter = logging.Formatter('%(levelname)s: %(message)s')
    log_file_handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)

    # Add the handlers to the logger
    logger.addHandler(log_file_handler)
    logger.addHandler(console_handler)

    return logger
