"use client"

import {usePathname} from "next/navigation";
import Link from "next/link";
import {Compass, Heart, Unlock} from "react-feather";
import {signIn, signOut, useSession} from "next-auth/react";


export function Sidenav({show, setter}: { show: boolean, setter: (val: any) => void }) {
    const {data: session} = useSession();
    const pathname = usePathname();

    const className = "bg-white w-[300px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40 px-6 py-4 flex flex-col  justify-between items-start";
    const appendClass = show ? " ml-0" : " ml-[-300px] md:ml-0";

    const MenuItem = ({icon, name, route}: { icon: any, name: string, route: string }) => {
        const colorClass = pathname === route ? "text-violet bg-violet-opacity-30" : "text-black";

        return (
            <Link
                href={route}
                onClick={() => {
                    setter((oldVal: any) => !oldVal);
                }}
                className={`w-full rounded-xl flex text-md p-2 ${colorClass}`}
            >
                <div className="text-xl flex gap-2">
                    {icon}
                    <div>{name}</div>
                </div>
            </Link>
        )
    }

    const ModalOverlay = () => (
        <div
            className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
            onClick={() => {
                setter((oldVal: any) => !oldVal);
            }}
        />
    )

    return (
        <>
            <div className={`${className}${appendClass}`}>
                <div className="w-full">
                    <h2 className="text-2xl text-start mb-10">Recipe Scraper</h2>
                    <div className="border border-black mb-10 mx-2"></div>
                    <div className="flex flex-col gap-2 items-start">
                        <MenuItem
                            name="Recipe Scraper"
                            route="/scraper"
                            icon={<Compass/>}
                        />
                        <MenuItem
                            name="Saved Recipes"
                            route="/cookbook"
                            icon={<Heart/>}
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col items-center">
                    {session?.user && (<>
                        <span className="flex gap-2 mb-1">
                            <p>Logged in as {session?.user?.name}</p>
                            <Unlock size={20} color={"#16A34A"}/>
                        </span>
                        <button
                            className="w-full p-4 rounded-2xl text-white bg-violet"
                            onClick={() => signOut()}>
                            Sign Out
                        </button>
                    </>)}
                    {!session?.user &&
                        <button
                            className="w-full p-4 rounded-2xl text-white bg-violet"
                            onClick={() => signIn("google")}>
                            Sign In
                        </button>
                    }
                </div>
            </div>
            {show ? <ModalOverlay/> : <></>}
        </>
    )
}