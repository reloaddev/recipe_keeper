"use client"

import RecipeView from "@/src/app/recipe/[id]";
import {getSpider} from "@/src/lib/scrape.util";
import {useState} from "react";
import {isEmpty} from "lodash";
import {EmptyState} from "@/src/app/scraper/EmptyState";
import {LoadingState} from "@/src/app/scraper/LoadingState";
import {ErrorState} from "@/src/app/scraper/ErrorState";

export function RecipeParser() {

    const SCRAPER_URL = "http://localhost:9080/crawl.json";
    const [url, setUrl] = useState('');
    const [recipe, setRecipe] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [scrapeError, setScrapeError] = useState('');

    async function scrape() {
        setScrapeError('');
        setIsLoading(true);
        if (url === "") {
            setIsLoading(false);
            return;
        }
        const spider = getSpider(url)
        if (spider === undefined) {
            setIsLoading(false);
            setScrapeError("Unsupported URL");
            return;
        }
        const response = await fetch(`${SCRAPER_URL}?spider_name=${getSpider(url)}&url=${url}`);
        const json = await response.json();
        setRecipe(() => ({...json.items[0], url: url}))
        setTimeout(() => setIsLoading(false), 1000);
    }

    return (
        <div className="flex flex-col sm:items-center gap-2 px-3 sm:px-40 mt-2 sm:mt-20">
            <h3 className="text-xl sm:text-3xl self-start">Web Scraper</h3>
            <div className="flex flex-col w-full gap-1">
                <input type="text"
                       className="border-2 border-gray-500 rounded-lg p-2" placeholder="Recipe URL"
                       onChange={event => setUrl(event.target.value)} value={url}/>
                <div className="flex gap-1 justify-end self-end w-2/3">
                    <button
                        className="w-1/2 sm:w-1/4 text-white bg-gray-600 rounded-lg p-2 sm:p-3"
                        onClick={() => {
                            setUrl("");
                            setRecipe({});
                        }}>
                        Clear
                    </button>
                    <button
                        className="w-1/2 sm:w-1/4 text-white bg-violet rounded-lg p-2 sm:p-3"
                        onClick={scrape}>
                        Import
                    </button>
                </div>
            </div>
            {!isLoading && !scrapeError && !isEmpty(recipe) && <RecipeView recipe={recipe}/>}
            {!isLoading && !scrapeError && isEmpty(recipe) && <EmptyState/>}
            {!isLoading && scrapeError && <ErrorState/>}
            {isLoading &&<LoadingState loading={isLoading}/>}
        </div>
    )
}