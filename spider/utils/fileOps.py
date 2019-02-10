import os
from utils.constants import QUEUE_FILE, CONFIG_FILE
import logging
import configparser


def save_deque_to_txt(deque):
    currentQueue = '\n'.join(deque)
    write_file(QUEUE_FILE, currentQueue)
    logging.info('saved queue to txt')


def build_queue_from_txt(file):
    logging.info('building queue')
    urls = set(line.strip() for line in open(file))
    return urls


def write_file(file, data):
    f = open(file, 'w')
    f.write(data)
    f.close()


def file_exists(file):
    return os.path.isfile(file)


def remove_file(file):
    if os.path.isfile(file):
        os.remove(file)
        logging.info('removed {}'.format(file))


def create_config_file():
    logging.info('Creating config file: {}'.format(CONFIG_FILE))
    config = configparser.ConfigParser()
    config.add_section('spider_config')
    config.set('spider_config', 'current_depth', str(0))

    with open(CONFIG_FILE, "w") as f:
        config.write(f)

    logging.info('Config file created')


def get_config_value(section, key):
    config = configparser.ConfigParser()
    config.read(CONFIG_FILE)

    result = config.get(section, key)
    if result:
        return result
    else:
        raise ValueError(
            '{givenValue} could not be found'.format(givenValue=key))


def set_config_value(section, key, value):
    logging.debug('Setting config value {section}->{key}: {value}'.format(
        section=section, key=key, value=value))
    config = configparser.ConfigParser()
    config.read(CONFIG_FILE)

    config.set(section, key, str(value))

    with open(CONFIG_FILE, "w") as f:
        config.write(f)

    logging.debug('Config file updated')
