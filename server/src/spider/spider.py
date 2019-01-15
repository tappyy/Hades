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
        # self.toScrape = set() # used to convert crawlQueue to JSON (queues can't be iterated /sadface )
        self.haveScraped = set()
        # add starting url to queue
        # self.crawlQueue.put(self.startingUrl)
        # set depth levels
        self.maxDepth = 2
        self.currentDepth = 0

    def make_request(self, url):
        print('requesting url: {}'.format(url))
        rawHtml = requests.get(url).text
        return rawHtml

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
            print(url)
            self.crawlQueue.append(url)

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

    def run_crawler(self):
        while self.crawlQueue and self.currentDepth < self.maxDepth:
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
                    # 3. increment current depth
                    self.currentDepth += 1
            except Exception as e:
                print(e)
                continue


spider = SpiderMan()
spider.run_crawler()
