import {Check, Search} from "react-feather";

const websites = [
    "chefkoch.de",
    "zuckerjagdwurst.com",
    "biancazapatka.com",
    "More soon..."
]

export function EmptyState() {
    const websiteCheckList = websites.map((website) => {
        return (
            <div key={website}
                 className="flex items-center gap-1">
                <Check size={20} strokeWidth={2}/>
                <p className={"text-sm sm:text-xl"}>{website}</p>
            </div>
        )
    });

    return (
        <>
            <div className="flex flex-col items-center mt-44 sm:mt-72 gap-2">
                <Search size={80} strokeWidth={1} color={"gray"}></Search>
                <p className="text-sm sm:text-2xl text-gray-500">Scrape your favorite recipes!</p>
            </div>
            <div className="flex flex-col gap-1 self-center text-gray-500">
                {websiteCheckList}
            </div>
        </>
    )
}