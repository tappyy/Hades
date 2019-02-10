#! /usr/bin/env python3

import requests
import sys
import logging
import json
from bs4 import BeautifulSoup
from queue import Queue, Empty
from collections import deque
from urllib.parse import urljoin, urlparse
from utils.fileOps import remove_file, save_deque_to_txt, file_exists, build_queue_from_txt, get_config_value, create_config_file, set_config_value
from utils.constants import QUEUE_FILE, STARTING_QUEUE, CONFIG_FILE, MAX_DEPTH
from utils.helpers import is_onion_site

# TODO: xpath is considerably quicker - perform benchmarks!
# TODO: exit crawler process function (to kill entire process)
# TODO: store stats such as:
# - number of crawled urls
# - total up time
# - pages crawled per second (for benchmarking multi-threading etc (create graphs))
# TODO: move spider to seperate thread from server
# TODO: move spdier init from start function into init function (start should just set bool to true)
# TODO: start crawl from beginning at end of crawl


class SpiderMan:
    def __init__(self):
        self.__init_crawler()

    def __init_crawler(self):
        self.__currentRootUrl = ''
        self.__crawlQueue = deque([])
        self.__urlsTodo = set()
        self.__haveScraped = set()
        self.__isCrawling = False

        # init depth levels
        self.__maxDepth = MAX_DEPTH
        self.__currentDepth = 0

        # init session
        self.__session = requests.session()
        self.__session.proxies = {}
        self.__session.proxies['http'] = 'socks5h://localhost:9150'
        self.__session.proxies['https'] = 'socks5h://localhost:9150'

        self.__init_queue()
        self.__init_depth()
        self.__run_crawler()

    def __init_queue(self):
        if file_exists(QUEUE_FILE):
            logging.info('found queue file')
            queue = build_queue_from_txt(QUEUE_FILE)
            self.__crawlQueue.extend(queue)
        else:
            logging.debug('using starting urls')
            self.__crawlQueue.extend(STARTING_QUEUE)

    def __init_depth(self):
        if not file_exists(CONFIG_FILE):
            logging.warning('Config file not found.')
            create_config_file()

        self.__currentDepth = int(get_config_value(
            'spider_config', 'current_depth'))

    def __make_request(self, url):
        logging.debug('requesting: {}'.format(url))
        # remove any cookies
        self.__session.cookies.clear()

        # set __session headers
        headers = {}
        headers['User-agent'] = 'Chrome'

        try:
            r = self.__session.get(url, headers=headers, timeout=(3, 30))
            if r:
                return r.text
        except requests.RequestException as error:
            logging.error(error)
            return

    def __parse_links(self, html):
        for link in html.find_all('a', href=True):
            href = link.get('href')
            if href.startswith('/'):  # this is a sub-page of current domain
                absoluteUrl = urljoin(self.__currentRootUrl, href)
                self.__add_to_queue(absoluteUrl)
            elif href.startswith('http://') or href.startswith('https://'):
                self.__add_to_queue(href)

    def __add_to_queue(self, url):
        if is_onion_site(url) and url not in self.__haveScraped:
            self.__urlsTodo.add(url)

    def __set_root_domain(self, url):
        parsed = urlparse(url)
        current = '{url.scheme}://{url.netloc}'.format(url=parsed)
        self.__currentRootUrl = current

    def __parse_content(self, soup, url):
        data = {
            "website_root": self.__currentRootUrl,
            "page_url": url,
            "page_title": soup.title.string,
            "body_content": soup.get_text()
        }

        requests.post('http://localhost:9000/api/pages', data=data)

    def __end_of_level(self):
        if(self.__currentDepth < self.__maxDepth):

            # queue next list of links
            self.__crawlQueue.clear()
            self.__crawlQueue.extend(self.__urlsTodo)
            self.__urlsTodo.clear()

            # update current depth
            self.__currentDepth += 1
        else:
            exit(0)

    def __run_crawler(self):
        while self.__isCrawling:
            if self.__crawlQueue:
                try:
                    targetUrl = self.__crawlQueue.popleft()
                    if targetUrl not in self.__haveScraped:
                        # set current root domain
                        self.__set_root_domain(targetUrl)

                        # make request
                        html = self.__make_request(targetUrl)
                        if html is not None:
                            # make that beautiful soup
                            soup = BeautifulSoup(html, 'html.parser')

                            # parse links
                            self.__parse_links(soup)

                            # parse content
                            self.__parse_content(soup, targetUrl)

                            # set current as scraped
                            self.__haveScraped.add(targetUrl)
                        else:
                            continue
                except Exception as error:
                    logging.error(error)
                    continue
            else:
                logging.info('end of level: {}'.format(
                    self.__currentDepth))
                self.__end_of_level()

    def stop(self):
        if self.__isCrawling:
            self.__isCrawling = False
            save_deque_to_txt(self.__crawlQueue)
            set_config_value('spider_config', 'current_depth',
                             self.__currentDepth)

    def start(self):
        if not self.__isCrawling:
            self.__init_queue()
            self.__init_depth()
            self.__isCrawling = True
            logging.info('Started crawling')
            self.__run_crawler()
