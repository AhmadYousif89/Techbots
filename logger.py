import logging
import os


def setup_logger(
    logger_name,
    log_file,
    formatr='%(levelname)s: %(asctime)s - %(message)s',
    info_formatr='%(levelname)s: %(message)s',
) -> logging.Logger:
    if not os.path.exists(os.path.dirname(log_file)):
        os.makedirs(os.path.dirname(log_file))

    logger = logging.getLogger(logger_name)
    logger.setLevel(logging.INFO)

    # Create handlers for the logger
    log_file_handler = logging.FileHandler(log_file)
    log_file_handler.setLevel(logging.INFO)
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)

    # Define a single formatter function based on log level
    class CustomFormatter(logging.Formatter):
        def format(self, record):
            if record.levelno == logging.INFO:
                self._style._fmt = info_formatr
            else:
                self._style._fmt = formatr
            return super().format(record)

    custom_formatter = CustomFormatter(formatr, datefmt='%Y-%m-%d %H:%M:%S')
    log_file_handler.setFormatter(custom_formatter)
    console_handler.setFormatter(custom_formatter)

    # Add handlers to the logger
    logger.addHandler(log_file_handler)
    logger.addHandler(console_handler)

    return logger
