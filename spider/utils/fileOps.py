import os
from utils.constants import QUEUE_FILE


def save_deque_to_txt(deque):
    currentQueue = '\n'.join(deque)
    write_file(QUEUE_FILE, currentQueue)
    print('saved queue to txt')


def write_file(file, data):
    f = open(file, 'w')
    f.write(data)
    f.close()


def remove_file(file):
    os.remove(file)
    print('removed {}'.format(file))
