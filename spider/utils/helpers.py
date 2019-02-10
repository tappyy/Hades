import logging
import re


def debug_array(array):
    for item in array:
        logging.debug(item)


def is_onion_site(url):
    regexp = re.compile(r'.onion')
    return regexp.search(url)
