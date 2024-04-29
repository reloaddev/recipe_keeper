import crochet

crochet.setup()

from flask import Flask, request, render_template, jsonify
from scrapy.crawler import CrawlerRunner
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
    url = request.json["url"]
    spider = determine_spider(url)
    if spider is None:
        return "Unsupported Website"
    scrape_with_crochet(spider, url)
    return jsonify(output_data)


@crochet.wait_for(timeout=10.0)
def scrape_with_crochet(spider, url):
    dispatcher.connect(_crawler_result, signal=signals.item_scraped)
    eventual = crawl_runner.crawl(spider, url=url)
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
