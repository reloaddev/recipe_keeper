import {Menu} from "react-feather";

export default function Header() {
    return (
        <header className="flex justify-between items-center bg-gray-500 h-16 p-8">
            <h1 className="text-2xl text-white">Recipe Scraper</h1>
            <Menu size={30} color="white"/>
        </header>
    )
}