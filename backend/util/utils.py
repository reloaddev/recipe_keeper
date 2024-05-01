units = ["el", "esslöffel", "tl", "teelöffel",
        "kg", "kilogramm", "g", "gramm",
        "l", "liter", "ml", "milliliter", "cm", "zentimeter",
        "stck.", "stück", "msp", "messerspitze", "prise",
        "hand", "handvoll", "hände"]

def is_unit(x):
    return x.casefold() in list(map(lambda y: y.casefold(), units))  

def is_number(x):
    try:
        float(x)
        return True
    except ValueError:
        return False
