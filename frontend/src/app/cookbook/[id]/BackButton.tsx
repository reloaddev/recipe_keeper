"use client"

import {useRouter} from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <button className="w-1/4 text-white bg-violet rounded-lg p-2 sm:p-3 ml-auto"
                onClick={() => router.back()}>
            Back
        </button>
    )
}