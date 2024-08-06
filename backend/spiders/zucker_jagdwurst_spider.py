import scrapy
from util.utils import is_number, is_unit

class ZuckerJagdwurstSpider(scrapy.Spider):
    name = "zucker_jagdwurst"
    
    def start_requests(self):
        yield scrapy.Request(self.url)

    def parse(self, response):
        title = response.css("h1 > span::text").get()
        ingredients = self.parse_ingredients(response)
        instructions = self.parse_instructions(response)
        yield {"title": title, "ingredients": ingredients, "instructions": instructions}

    # Extracts the ingredients from the passed response.
    # Because amount, unit and name are stored in the same text,
    # the extraction logic is more complex and outsourced to a formatter.
    def parse_ingredients(self, response):
        ingredients = response.css(
            "div[class^=card-module--ingredients] > div > ul > li"
        )
        formatter = IngredientFormatter()
        return formatter.format_ingredients(ingredients)

    # Extracts the instructions from the passed reponse.
    # All recipe steps are combined into one text whereas each step is visually seperated.
    def parse_instructions(self, response):
        instructions = response.css(
            "div[class^=card-module--instructions] > div > ol > li > p"
        )
        parsed_instructions = []
        for instruction in instructions:
            instruction_text = instruction.css("::text").get()
            parsed_instructions.append(instruction_text)
        return "<br><br>".join(parsed_instructions)


class IngredientFormatter:

    formatted_ingredients = []

    def __init__(self):
        pass

    def format_ingredients(self, ingredients):
        text_ingredients = ingredients.css("::text").getall()
        for ingredient in text_ingredients:
            ingredient_parts = ingredient.split(" ")
            if is_number(ingredient_parts[0]) and is_unit(ingredient_parts[1]):
                self.add_ingredient(
                    amount=ingredient_parts[0] + " " + ingredient_parts[1],
                    name=" ".join(ingredient_parts[2:]),
                )
            elif is_number(ingredient_parts[0]) and not is_unit(ingredient_parts[1]):
                self.add_ingredient(
                    amount=ingredient_parts[0],
                    name=" ".join(ingredient_parts[1:]),
                )
            elif is_unit(ingredient_parts[0]):
                self.add_ingredient(
                    amount=ingredient_parts[0],
                    name=" ".join(ingredient_parts[1]),
                )
            else:
                self.add_ingredient(
                    amount="",
                    name=" ".join(ingredient_parts[0:]),
                )
        return self.formatted_ingredients

    def add_ingredient(self, amount, name):
        self.formatted_ingredients.append({"amount": amount, "name": name})
        return self.formatted_ingredients
