import scrapy


class BiancaZapatkaSpider(scrapy.Spider):
    name = "bianca_zapatka"
    
    def start_requests(self):
        yield scrapy.Request(self.url)

    def parse(self, response):
        title = response.css("h2.wprm-recipe-name::text").get()
        ingredients = self.parse_ingredients(response)
        instructions = self.parse_instructions(response)
        yield {"title": title, "ingredients": ingredients, "instructions": instructions}

    # Extracts the ingredients from the passed response.
    # An extracted ingredient consists of amount and name.
    # The unit is part of the amount.
    def parse_ingredients(self, response):
        ingredients = response.css("li.wprm-recipe-ingredient")
        parsed_ingredients = []
        for ingredient in ingredients:
            amount = (
                self.parse_text_nonnull(ingredient.css("span.wprm-recipe-ingredient-amount"))
                + " "
                + self.parse_text_nonnull(ingredient.css("span.wprm-recipe-ingredient-unit"))
            )
            name = self.parse_text_nonnull(ingredient.css("span.wprm-recipe-ingredient-name"))
            parsed_ingredients.append({"amount": amount, "name": name})
        return parsed_ingredients
    
    # Extracts the text from the passed element query.
    # Additionally checks for text nested in links.
    def parse_text_nonnull(self, query):
        value = query.css("::text").get()
        if value is None:
            value = query.css("> a::text").get()
        return value if value is not None else ""
    
    # Extracts the instructions from the passed response.
    # All recipe steps are combined into one text whereas each step is visually seperated.
    def parse_instructions(self, response):
        instructions = response.css("li.wprm-recipe-instruction")
        parsed_instructions = []
        for instruction in instructions:
            instruction_text = instruction.css("::text").get()
            parsed_instructions.append(instruction_text)
        return "<br><br>".join(parsed_instructions)
