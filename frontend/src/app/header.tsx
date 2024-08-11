"use client"

import {Menu} from "react-feather";
import {useRouter} from "next/navigation";
import {Sidenav} from "@/src/app/sidenav/Sidenav";
import {useState} from "react";

export default function Header() {

    const router = useRouter();
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <header className="flex justify-between items-center bg-violet h-16 px-5 sm:px-16 py-8 sm:py-10">
            <h1 onClick={() => router.push("/")} className="text-2xl text-white">Recipe Scraper</h1>
            <div className="flex gap-4">
                <Menu onClick={() => setShowSidebar(oldVal => !oldVal)} size={30} color="white"/>
            </div>
            <Sidenav show={showSidebar} setter={setShowSidebar}/>
        </header>
    )
}