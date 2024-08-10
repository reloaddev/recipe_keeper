"use client"

import {BookOpen, Compass} from "react-feather";
import {useRouter} from "next/navigation";

export default function Header() {

    const router = useRouter();

    return (
        <header className="flex justify-between items-center bg-violet h-16 px-5 sm:px-16 py-8 sm:py-10">
            <h1 onClick={() => router.push("/")} className="text-2xl text-white">Recipe Scraper</h1>
            <div className="flex gap-4">
                <Compass onClick={() => router.push("/scraper")} size={30} color="white"></Compass>
                <BookOpen onClick={() => router.push("/cookbook")} size={30} color="white"/>
            </div>
        </header>
    )
}