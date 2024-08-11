"use client"

import {Menu, UserCheck, UserMinus} from "react-feather";
import {useRouter} from "next/navigation";
import {Sidenav} from "@/src/app/components/Sidenav";
import {useState} from "react";
import {useSession} from "next-auth/react";
import { Tooltip } from 'react-tooltip'


export default function Header() {
    const {data: session, status} = useSession();
    const router = useRouter();
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <header className="flex justify-between items-center bg-violet h-16 px-5 sm:px-16 py-8 sm:py-10">
            <h1 onClick={() => router.push("/")} className="text-2xl text-white">Recipe Scraper</h1>
            <div className="flex gap-4">
                {status === "authenticated"
                    ? <UserCheck size={30} color="white" data-tooltip-id="authed-user" data-tooltip-content={`Signed in as ${session?.user?.name}`}/>
                    : <UserMinus size={30} color="white" data-tooltip-id="unauthed-user" data-tooltip-content="Not signed in"/>
                }
                <Tooltip id="authed-user" place="bottom"/>
                <Tooltip id="unauthed-user" place="bottom"/>
                <Menu onClick={() => setShowSidebar(oldVal => !oldVal)} size={30} color="white"/>
            </div>
            <Sidenav show={showSidebar} setShow={setShowSidebar}/>
        </header>
    )
}