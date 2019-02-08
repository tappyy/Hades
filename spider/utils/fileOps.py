import os
from utils.constants import QUEUE_FILE


def save_deque_to_txt(deque):
    currentQueue = '\n'.join(deque)
    write_file(QUEUE_FILE, currentQueue)
    print('saved queue to txt')


def build_queue_from_txt(file):
    print('building queue')
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
        print('removed {}'.format(file))
