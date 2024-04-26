import scrapy


class ChefkochSpider(scrapy.Spider):
    name = "chefkoch"
    start_urls = [
        "https://www.chefkoch.de/rezepte/2826761434715126/Linsencurry.html",
        "https://www.chefkoch.de/rezepte/2826671434712499/Haehnchen-suesssauer-wie-im-Chinarestaurant.html",
        "https://www.chefkoch.de/rezepte/2848091436834550/Chinesisch-gebratene-Nudeln-mit-Huehnchenfleisch-Ei-und-Gemuese.html",
    ]

    def parse(self, response):
        title = response.css("h1::text").get()
        ingredients = self.parse_ingredients(response)
        instructions = self.parse_instructions(response)
        yield {"title": title, "ingredients": ingredients, "instructions": instructions}

    # Extracts the ingredients from the passed response.
    def parse_ingredients(self, response):
        ingredients = response.css("table.ingredients > tbody > tr")
        parsed_ingredients = []
        for ingredient in ingredients:
            amount = self.parse_text_nonnull(ingredient.css("td.td-left > span"))
            name = self.parse_text_nonnull(ingredient.css("td.td-right > span"))
            parsed_ingredients.append({"amount": amount, "name": name})
        return parsed_ingredients

    # Extracts the text from the passed element query.
    # Additionally checks for text nested in links.
    def parse_text_nonnull(self, query):
        value = query.css("::text").get()
        if value is None:
            value = query.css("> a::text").get()
        # Removes whitespace and \n,\t
        return " ".join(value.split()) if value is not None else ""

    # Extracts the instructions from the passed response.
    # \n and \t are replaced properly.
    def parse_instructions(self, response):
        instructions = response.xpath(
            "//h2[text()[contains(., 'Zubereitung')]]/../div[1]/text()"
        ).getall()
        instructions_formatted = (
            " ".join(instructions)
            .replace("\n", "<br>")
            .replace("\t", "&nbsp;&nbsp;&nbsp;&nbsp;")
        )
        return instructions_formatted
