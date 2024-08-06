import RecipeView from "@/src/app/recipe/[id]";
import {getSpider} from "@/src/lib/scrape.util";
import {useState} from "react";
import {isEmpty} from "lodash";
import {EmptyState} from "@/src/app/empty-state";
import {LoadingState} from "@/src/app/loading-state";
import {ErrorState} from "@/src/app/error-state";

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
        setTimeout(() => setIsLoading(false), 2000);
    }

    return (
        <div className="px-3">
            <h1 className="text-xl text-gray-500">Scrape your favorite recipe!</h1>
            <div className="flex w-full sm:w-3/4">
                <input type="text"
                       className="w-5/6 border-2 border-gray-500 rounded-lg p-1" placeholder="Recipe URL"
                       onChange={event => setUrl(event.target.value)} value={url}/>
                <button
                    className="text-gray-500 border-2 border-gray-500 rounded-lg p-1"
                    onClick={scrape}>
                    Import
                </button>
            </div>
            {!isLoading && !scrapeError && !isEmpty(recipe) && <RecipeView recipe={recipe}/>}
            {!isLoading && !scrapeError && isEmpty(recipe) && <EmptyState/>}
            {!isLoading && scrapeError && <ErrorState/>}
            {isLoading &&<LoadingState loading={isLoading}/>}
        </div>
    )
}