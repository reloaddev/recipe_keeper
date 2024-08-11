import {RecipeParser} from "@/src/app/scraper/RecipeParser";

export default async function Home() {

    return (
        <div className="flex flex-col p-2 sm:p-10">
            <RecipeParser/>
        </div>
    );
}
