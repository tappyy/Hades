from spider import SpiderMan
import sys
import signal

# init spider
spider = SpiderMan()


def main():
    spider.start_crawler()


def signal_handler(sig, frame):
    print('Stopping spider...')
    spider.stop_crawler()
    sys.exit(0)


signal.signal(signal.SIGINT, signal_handler)

if __name__ == '__main__':
    main()
