"use client"

import { useState } from "react";
import Recipe from "./recipe/[id]";
import { getSpider } from "../lib/scrape.util";
import {Menu} from "react-feather";

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
      <>
          <header className="flex justify-between items-center bg-gray-500 h-16 p-8">
              <h1 className="text-2xl text-white">Recipe Scraper</h1>
              <Menu size={30} color="white"/>
          </header>
          <main className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-2 sm:p-10 gap-2">
              <h1 className="text-3xl">Scrape your favorite recipe!</h1>
              <div className="flex justify-center w-full sm:w-3/4 px-3">
                  <input type="text" onChange={event => setUrl(event.target.value)} value={url}
                         className="w-5/6 border-2 border-black rounded-lg p-1" placeholder="Recipe URL"/>
                  <button onClick={scrape} className="border-2 border-black rounded-lg p-1">Import</button>
              </div>
              {recipe != undefined && <Recipe recipe={recipe}/>}
          </main>
      </>
  );
}
