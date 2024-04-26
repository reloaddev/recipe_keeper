from flask import Flask, request, render_template
import scrapy
from scrapy.crawler import CrawlerProcess
from scraping.spiders.chefkoch_spider import ChefkochSpider
from scraping.spiders.zucker_jagdwurst_spider import ZuckerJagdwurstSpider
from scraping.spiders.bianca_zapatka_spider import BiancaZapatkaSpider
from scrapy.signalmanager import dispatcher
from scrapy import signals

app = Flask(__name__)


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
    process = CrawlerProcess()
    process.crawl(spider, url=url)
    process.start()  # Blocks here until items are scraped
    return results


def determine_spider(url):
    if "chefkoch.de" in url:
        return ChefkochSpider
    if "zuckerjagdwurst.com" in url:
        return ZuckerJagdwurstSpider
    if "biancazapatka.com" in url:
        return BiancaZapatkaSpider
    return None
