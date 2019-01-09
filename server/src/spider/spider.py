#! /usr/bin/env python3

import requests
import sys
from bs4 import BeautifulSoup
from queue import Queue, Empty
# xpath is considerably quicker - perform benchmarks!


class SpiderMan:
    def __init__(self):
        self.startingUrl = 'https://www.google.com'
        self.crawlQueue = Queue()
        self.scraped = set()
        # add starting url to queue
        self.crawlQueue.put(self.startingUrl)

    def make_request(self, url):
        print('requesting url: {}'.format(url))
        rawHtml = requests.get(url).text
        return rawHtml

    def parse_links(self, html):
        print('parsing url for links...')
        links = []
        soup = BeautifulSoup(html, 'html.parser')

        for link in soup.find_all('a'):
            if link.has_attr('href'):
                links.append(link.get_text())

        self.debug_array(links)

    def debug_array(self, stuff):
        for item in stuff:
            print(item)

    def run_crawler(self):
        while True:
            try:
                target = self.crawlQueue.get()
                if target not in self.scraped:
                    print('scraping url: {}'.format(target))
                    self.scraped.add(target)
                    rawHtml = self.make_request(target)
                    self.parse_links(rawHtml)
                    exit()
            except Empty:
                return
            except Exception as e:
                print(e)
                continue


spider = SpiderMan()
spider.run_crawler()


# print('i am coming from a python script\n')
# html = requests.get('https://www.amazon.co.uk').text
# html = html.replace('\n', '')
# soup = BeautifulSoup(html, 'html.parser')
# texts = soup.get_text()
# print(texts)

# exit(0)
