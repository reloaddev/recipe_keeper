"use client"

import {Compass, Heart, Menu, UserCheck, UserMinus} from "react-feather";
import {useRouter} from "next/navigation";
import {Sidenav} from "@/src/app/components/Sidenav";
import {useContext, useState} from "react";
import {signIn, signOut, useSession} from "next-auth/react";
import {Tooltip} from 'react-tooltip'
import {ResponsiveContext} from "@/src/app/context/ResponsiveContext";


export default function Header() {
    const {data: session, status} = useSession();
    const {isMobile} = useContext(ResponsiveContext);
    const router = useRouter();
    const [showSidebar, setShowSidebar] = useState(false);
    console.log(isMobile)

    return (
        <header className="flex justify-between items-center bg-violet h-16 px-5 sm:px-16 py-8 sm:py-10">
            <h1 onClick={() => router.push("/")} className="text-2xl text-white">Recipe Scraper</h1>
            <div className="flex gap-4 items-center">
                {!isMobile && status !== "authenticated" &&
                    <button className={"text-white border-2 border-white px-4 py-2 rounded-xl"}
                            onClick={() => signIn("google")}>Sign In
                    </button>
                }
                {!isMobile && status === "authenticated" &&
                    <button className={"text-white border-2 border-white px-4 py-2 rounded-xl"}
                            onClick={() => signOut()}>
                        Sign Out
                    </button>}
                {status === "authenticated"
                    ? <UserCheck size={30} color="white" data-tooltip-id="authed-user"
                                 data-tooltip-content={`Signed in as ${session?.user?.name}`}/>
                    : <UserMinus size={30} color="white" data-tooltip-id="unauthed-user"
                                 data-tooltip-content="Not signed in"/>
                }
                <Tooltip id="authed-user" place="bottom"/>
                <Tooltip id="unauthed-user" place="bottom"/>
                {!isMobile && <Compass onClick={() => router.push("/scraper")} size={30} color="white"/>}
                {!isMobile && <Heart onClick={() => router.push("/cookbook")} size={30} color="white"/>}
                {isMobile && <Menu onClick={() => setShowSidebar(oldVal => !oldVal)} size={30} color="white"/>}
            </div>
            {isMobile && <Sidenav show={showSidebar} setShow={setShowSidebar}/>}
        </header>
    )
}