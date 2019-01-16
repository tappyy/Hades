#! /usr/bin/env python3

import requests
import sys
from bs4 import BeautifulSoup
from queue import Queue, Empty
from collections import deque
from urllib.parse import urljoin, urlparse


# TODO: xpath is considerably quicker - perform benchmarks!


class SpiderMan:
    def __init__(self):
        self.startingUrl = 'https://hashtagmarketing.co.uk'
        self.currentRootUrl = ''
        self.set_root_domain(self.startingUrl)
        # self.crawlQueue = Queue()
        self.crawlQueue = deque([self.startingUrl])
        self.foundUrls = set()
        # self.toScrape = set() # used to convert crawlQueue to JSON (queues can't be iterated /sadface )
        self.haveScraped = set()
        # add starting url to queue
        # self.crawlQueue.put(self.startingUrl)
        # set depth levels
        self.maxDepth = 1
        self.currentDepth = 0

    def make_request(self, url):
        print('requesting url: {}'.format(url))
        # 3 second connect timeout, 30 second read timeout
        try:
            response = requests.get(url, timeout=(3, 30))
            if response and response.status_code == 200:
                return response.text
        except requests.RequestException:
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
            self.foundUrls.add(url)

    def set_root_domain(self, url):
        parsed = urlparse(url)
        current = '{url.scheme}://{url.netloc}'.format(url=parsed)
        print('current domain: {}'.format(current))
        self.currentRootUrl = current

    def parse_content(self, soup):
        print(soup.get_text())

    def debug_array(self, stuff):
        for item in stuff:
            print(item)

    def end_of_level(self):
        print('end of level: {}'.format(self.currentDepth))
        if self.currentDepth < self.maxDepth:
            self.crawlQueue.clear()
            self.crawlQueue.extend(self.foundUrls)
            self.foundUrls.clear()
            self.currentDepth += 1

    def run_crawler(self):
        while True:
            if self.crawlQueue and self.currentDepth < self.maxDepth:
                try:
                    targetUrl = self.crawlQueue.popleft()
                    if targetUrl not in self.haveScraped:
                        # set current root domain
                        self.set_root_domain(targetUrl)

                        # make request
                        html = self.make_request(targetUrl)

                        # make that beautiful soup
                        soup = BeautifulSoup(html, 'html.parser')

                        # parse links
                        self.parse_links(soup)

                        # parse content

                        # set current as scraped
                        self.haveScraped.add(targetUrl)
                except Exception as error:
                    print(error)
                    continue
            else:
                self.end_of_level()


spider = SpiderMan()
spider.run_crawler()
