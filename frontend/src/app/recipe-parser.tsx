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
        <div className="flex flex-col sm:items-center sm:px-52 gap-2 px-3 mt-2">
            <h3 className="text-xl self-start">Web Scraper</h3>
            <div className="flex flex-col w-full gap-1">
                <input type="text"
                       className="border-2 border-gray-500 rounded-lg p-2" placeholder="Recipe URL"
                       onChange={event => setUrl(event.target.value)} value={url}/>
                <button
                    className="w-1/3 sm:w-1/12 self-end text-white bg-violet rounded-lg p-2 sm:p-3"
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