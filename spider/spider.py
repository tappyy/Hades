#! /usr/bin/env python3

import requests
import sys
from bs4 import BeautifulSoup
from queue import Queue, Empty
from collections import deque
from urllib.parse import urljoin, urlparse
import json


# TODO: xpath is considerably quicker - perform benchmarks!


class SpiderMan:
    def __init__(self):
        self.startingUrl = 'https://hashtagmarketing.co.uk'
        self.currentRootUrl = ''
        self.set_root_domain(self.startingUrl)
        self.crawlQueue = deque([self.startingUrl])
        self.foundUrls = set()
        self.haveScraped = set()

        # set depth levels
        self.maxDepth = 1
        self.currentDepth = 0

    def make_request(self, url):
        # self.print_json('requesting url: {}'.format(url))
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
        # print('current domain: {}'.format(current))
        self.currentRootUrl = current

    def parse_content(self, soup, url):

        data = {
            "website_root": self.currentRootUrl,
            "page_url": url,
            "page_title": soup.title.string,
            "body_content": soup.get_text()
        }

        requests.post('http://backend:9000/api/test', data=data)

        # self.print_json(data)

    def print_json(self, data):
        print(json.dumps(data))

    def debug_array(self, stuff):
        for item in stuff:
            print(item)

    def end_of_level(self):
        if(self.currentDepth < self.maxDepth):

            # queue next list of links
            self.crawlQueue.clear()
            self.crawlQueue.extend(self.foundUrls)
            self.foundUrls.clear()

            # update current depth
            self.currentDepth += 1
        else:
            exit(0)

    def run_crawler(self):
        while True:
            if self.crawlQueue:
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
                        self.parse_content(soup, targetUrl)

                        # set current as scraped
                        self.haveScraped.add(targetUrl)
                except Exception as error:
                    self.print_json(error)
                    continue
            else:
                exit()
                # print('end of level: {}'.format(self.currentDepth))
                # self.end_of_level()
