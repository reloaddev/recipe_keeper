import {Search} from "react-feather";

export function EmptyState() {
    return (
        <div className="flex flex-col items-center mt-60 gap-2">
            <Search size={80} strokeWidth={1}  color={"gray"}></Search>
            <p className="text-sm text-gray-500">Scrape your favorite recipes!</p>
        </div>
    )
}