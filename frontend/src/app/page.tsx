"use client"

import { useState } from "react";
import Recipe from "./recipe/[id]";
import { getSpider } from "../lib/scrape.util";

export default function Home() {

  const SCRAPER_URL = "http://localhost:9080/crawl.json";
  const [url, setUrl] = useState('');
  const [recipe, setRecipe] = useState(undefined);

  async function scrape() {
    if (url === '') return;
    const spider = getSpider(url)
    if (spider === undefined) return;
    const response = await fetch(`${SCRAPER_URL}?spider_name=${getSpider(url)}&url=${url}`);
    const json = await response.json();
    setRecipe(() => ({...json.items[0], url: url}))
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 gap-2">
      <h1 className="text-3xl">Scrape your favorite recipe!</h1>
      <div className="w-3/4 flex justify-center gap-2">
        <input type="text" onChange={event => setUrl(event.target.value)} value={url} className="w-5/6 border-2 border-black rounded-lg p-1" placeholder="Recipe URL" />
        <button onClick={scrape} className="border-2 border-black rounded-lg p-1">Import</button>
      </div>
      {recipe != undefined && <Recipe recipe={recipe} />}
    </main>
  );
}
