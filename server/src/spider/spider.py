#! /usr/bin/env python3

import requests
import sys
from bs4 import BeautifulSoup

# class SpiderAgent:
#   def __init__(self, starting_url):
#     self.starting_url = starting_url

print('i am coming from a python script\n')
html = requests.get('https://www.amazon.co.uk').text
html = html.replace('\n', '')
soup = BeautifulSoup(html, 'html.parser')
texts = soup.get_text()
print(texts)

exit(0)
