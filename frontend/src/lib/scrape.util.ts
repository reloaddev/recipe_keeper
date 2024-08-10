export type Ingredient = {
    amount: string;
    name: string;
};

export type Recipe = {
    id?: number;
    title?: string;
    url?: string;
    ingredients?: Ingredient[];
    instructions?: string;
    userId?: string;
}

export function getSpider(url: string) {
    if (url.includes("chefkoch.de")) return 'chefkoch';
    if (url.includes("zuckerjagdwurst.com")) return 'zucker_jagdwurst';
    if (url.includes("biancazapatka.com")) return 'bianca_zapatka';
    return undefined;
}