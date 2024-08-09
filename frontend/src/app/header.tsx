"use client"

import {BookOpen} from "react-feather";
import {useRouter} from "next/navigation";

export default function Header() {

    const router = useRouter();

    const redirectTo = (route: string) => {
        void router.push(route);
    }

    return (
        <header className="flex justify-between items-center bg-violet h-16 px-5 sm:px-16 py-8 sm:py-10">
            <h1 onClick={() => redirectTo("/")} className="text-2xl text-white">Recipe Scraper</h1>
            <BookOpen onClick={() => redirectTo("/cookbook")} size={30} color="white"/>
        </header>
    )
}