#! /usr/bin/env python3

import requests
import sys
from bs4 import BeautifulSoup
from queue import Queue, Empty
from urllib.parse import urljoin


# TODO: xpath is considerably quicker - perform benchmarks!


class SpiderMan:
    def __init__(self):
        self.startingUrl = 'https://hashtagmarketing.co.uk'
        self.crawlQueue = Queue()
        # self.toScrape = set() # used to convert crawlQueue to JSON (queues can't be iterated /sadface )
        self.haveScraped = set()
        # add starting url to queue
        self.crawlQueue.put(self.startingUrl)
        # set depth levels
        self.depthLimit = 2
        self.currentDepth = 0

    def make_request(self, url):
        print('requesting url: {}'.format(url))
        rawHtml = requests.get(url).text
        return rawHtml

    def parse_links(self, base_url):
        print('parsing url for links...')
        rawHtml = self.make_request(base_url)
        links = []  # for test output
        soup = BeautifulSoup(rawHtml, 'html.parser')

        for link in soup.find_all('a', href=True):
            href = link.get('href')
            if href.startswith('/'):  # this is a sub-page of current domain
                # convert from relative to absolute
                absoluteUrl = urljoin(base_url, href)
                if (href not in self.haveScraped):
                    links.append(absoluteUrl)
                    # self.crawlQueue.put(absoluteUrl)
            else:
                links.append(href)
        self.debug_array(links)

    def debug_array(self, stuff):
        for item in stuff:
            print(item)

    def run_crawler(self):
        # while self.currentDepth < self.depthLimit:
        while True:
            try:
                targetUrl = self.crawlQueue.get()
                if targetUrl not in self.haveScraped:
                    print('scraping url: {}'.format(targetUrl))
                    self.haveScraped.add(targetUrl)
                    # 1. get all links on current page
                    self.parse_links(targetUrl)
                    # 2. get current page content

                    # 3. increment current depth
                    # self.currentDepth = self.currentDepth + 1
                    exit(0)
            except Empty:
                return
            except Exception as e:
                print(e)
                continue


spider = SpiderMan()
spider.run_crawler()
