"use client"

import {RecipeParser} from "@/src/app/recipe-parser";

export default function Home() {

    return (
        <>
            <main className="flex flex-col mt-5 p-2 sm:p-10">
                <RecipeParser/>
            </main>
        </>
    );
}
