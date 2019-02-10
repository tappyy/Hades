#! /usr/bin/env python3

import requests
import sys

from bs4 import BeautifulSoup
from queue import Queue, Empty
from collections import deque
from urllib.parse import urljoin, urlparse
import json
from utils.fileOps import remove_file, save_deque_to_txt, file_exists, build_queue_from_txt
from utils.constants import QUEUE_FILE, STARTING_QUEUE

# TODO: xpath is considerably quicker - perform benchmarks!
# TODO: save current level when exiting - config.ini file?
# TODO: use logging module
# TODO: check if site link contains .onion (stay on dark web!)
# TODO: exit crawler process function (to kill entire process)
# TODO: store stats such as:
# - number of crawled urls
# - total up time
# - pages crawled per second (for benchmarking multi-threading etc (create graphs))


class SpiderMan:
    def __init__(self):

        # remove_file(QUEUE_FILE)
        # self.startingUrl = 'http://33cb5x4tdiab2jhe.onion/'
        self.currentRootUrl = ''
        # self.set_root_domain(self.startingUrl)
        self.crawlQueue = deque([])
        self.urlsTodo = set()
        self.haveScraped = set()
        self.isCrawling = False

        # init queue
        self.init_queue()

        # set depth levels
        self.maxDepth = 3
        self.currentDepth = 0

        # init session
        self.session = requests.session()
        self.session.proxies = {}
        self.session.proxies['http'] = 'socks5h://localhost:9150'
        self.session.proxies['https'] = 'socks5h://localhost:9150'

    def init_queue(self):
        if file_exists(QUEUE_FILE):
            print('found queue file - using that')
            queue = build_queue_from_txt(QUEUE_FILE)
            self.crawlQueue.extend(queue)
        else:
            print('using starting urls')
            self.crawlQueue.extend(STARTING_QUEUE)

    def make_request(self, url):
        print('requesting: {}'.format(url))
        # remove any cookies
        self.session.cookies.clear()

        # set session headers
        headers = {}
        headers['User-agent'] = 'Chrome'

        try:
            r = self.session.get(url, headers=headers, timeout=(3, 30))
            if r:
                return r.text
        except requests.RequestException as error:
            print(error)
            return

    def parse_links(self, html):
        for link in html.find_all('a', href=True):
            href = link.get('href')
            if href.startswith('/'):  # this is a sub-page of current domain
                absoluteUrl = urljoin(self.currentRootUrl, href)
                self.add_to_queue(absoluteUrl)
            elif href.startswith('http://') or href.startswith('https://'):
                self.add_to_queue(href)

    def add_to_queue(self, url):
        if url not in self.haveScraped:
            self.urlsTodo.add(url)

    def set_root_domain(self, url):
        parsed = urlparse(url)
        current = '{url.scheme}://{url.netloc}'.format(url=parsed)
        self.currentRootUrl = current

    def parse_content(self, soup, url):
        data = {
            "website_root": self.currentRootUrl,
            "page_url": url,
            "page_title": soup.title.string,
            "body_content": soup.get_text()
        }

        requests.post('http://localhost:9000/api/pages', data=data)

    def debug_array(self, stuff):
        for item in stuff:
            print(item)

    def end_of_level(self):
        if(self.currentDepth < self.maxDepth):

            # queue next list of links
            self.crawlQueue.clear()
            self.crawlQueue.extend(self.urlsTodo)
            self.urlsTodo.clear()

            # update current depth
            self.currentDepth += 1
        else:
            exit(0)

    def stop_crawler(self):
        self.isCrawling = False
        save_deque_to_txt(self.crawlQueue)

    def start_crawler(self):
        # TODO: configure crawler queue
        #  check if queue file exists, if does, configure queue from file, else use starting queue

        # start crawler
        print('Spider status: crawling')
        self.isCrawling = True
        self.run_crawler()

    def run_crawler(self):
        while self.isCrawling:
            if self.crawlQueue:
                try:
                    targetUrl = self.crawlQueue.popleft()
                    if targetUrl not in self.haveScraped:
                        # set current root domain
                        self.set_root_domain(targetUrl)

                        # make request
                        html = self.make_request(targetUrl)
                        if html is not None:
                            # make that beautiful soup
                            soup = BeautifulSoup(html, 'html.parser')

                            # parse links
                            self.parse_links(soup)

                            # parse content
                            self.parse_content(soup, targetUrl)

                            # set current as scraped
                            self.haveScraped.add(targetUrl)
                        else:
                            continue
                except Exception as error:
                    print(error)
                    continue
            else:
                print('end of level: {}'.format(self.currentDepth))
                self.end_of_level()
