from spider import SpiderMan
import sys
import signal
from flask import Flask, request, jsonify
import logging


# init
app = Flask(__name__)
logging.basicConfig(level=logging.DEBUG, format='%(message)s')
spider = SpiderMan()


@app.route('/test')
def test():
    return jsonify({'message': 'API is working!'})


@app.route('/start')
def start_spider():
    spider.start()
    # FIXME: will not return because spider.start() is blocking thread
    return jsonify({'message': 'Spider started.'})


@app.route('/stop')
def stop_spider():
    spider.stop()
    return jsonify({'message': 'Spider stopped.'})


@app.route('/stats')
def get_stats():
    # get running stats from spider
    return jsonify({'stats': 'These are placeholder stats'})


def signal_handler(sig, frame):
    print('Stopping spider...')
    spider.stop()
    sys.exit(0)


signal.signal(signal.SIGINT, signal_handler)

if __name__ == '__main__':
    app.run(debug=True, port=9001)
