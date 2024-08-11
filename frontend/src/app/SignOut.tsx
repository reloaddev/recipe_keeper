"use client"

import {signOut, useSession} from "next-auth/react"

export function SignOut() {
    const {data: session} = useSession();

    return (
        <form
            action={() => {
                signOut();
            }}
        >
            <div className="flex flex-col gap-2 items-center mt-20">
                <h3 className="text-xl text-center font-bold">Logged in as {session?.user?.name}</h3>
                <button className="w-full p-4 rounded-2xl text-white bg-violet"
                        type="submit">
                    Sign Out
                </button>
            </div>
        </form>
    )
}