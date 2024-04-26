import crochet
crochet.setup()

from flask import Flask, request, render_template, jsonify
import scrapy
from scrapy.crawler import CrawlerProcess, CrawlerRunner
from scraping.spiders.chefkoch_spider import ChefkochSpider
from scraping.spiders.zucker_jagdwurst_spider import ZuckerJagdwurstSpider
from scraping.spiders.bianca_zapatka_spider import BiancaZapatkaSpider
from scrapy.signalmanager import dispatcher
from scrapy import signals
import time

app = Flask(__name__)

output_data = []
crawl_runner = CrawlerRunner()

@app.route("/")
def hello_world():
    return render_template("app.html")


@app.post("/recipe")
def scrape_recipe():
    results = []

    def crawler_results(signal, sender, item, response, spider):
        results.append(item)

    # Calls crawler_results when items are scraped
    dispatcher.connect(crawler_results, signal=signals.item_scraped)

    url = request.json["url"]
    spider = determine_spider(url)
    if spider is None:
        return "Unsupported Website"
    return scrape(spider,url)

def scrape(spider, url):
    scrape_with_crochet(spider, url) # Passing that URL to our Scraping Function
    time.sleep(5) # Pause the function while the scrapy spider is running
    return jsonify(output_data) # Returns the scraped data after being running for 20 seconds.

@crochet.run_in_reactor
def scrape_with_crochet(spider, url):
    dispatcher.connect(_crawler_result, signal=signals.item_scraped)    
    eventual = crawl_runner.crawl(spider, url = url)
    return eventual

def _crawler_result(item, response, spider):
    output_data.append(dict(item))


def determine_spider(url):
    if "chefkoch.de" in url:
        return ChefkochSpider
    if "zuckerjagdwurst.com" in url:
        return ZuckerJagdwurstSpider
    if "biancazapatka.com" in url:
        return BiancaZapatkaSpider
    return None
