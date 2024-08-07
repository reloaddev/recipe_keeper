"use client"

import {Heart} from "react-feather";
import {useRouter} from "next/navigation";

export default function Header() {

    const router = useRouter();

    const redirectTo = (route: string) => {
        void router.push(route);
    }

    return (
        <header className="flex justify-between items-center bg-gray-500 h-16 p-8">
            <h1 onClick={() => redirectTo("/")} className="text-2xl text-white">Recipe Scraper</h1>
            <Heart onClick={() => redirectTo("/cookbook")} size={30} color="white"/>
        </header>
    )
}