"use client"

import {useEffect, useState} from "react";
import {Recipe} from "@/src/lib/scrape.util";
import {useRouter} from "next/navigation";

export default function CookBook() {

    const router = useRouter();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const recipeListItems = recipes.map(recipe => (
        <p key={recipe.title}
           className="text-xl text-gray-500 p-5 border-2 rounded-xl shadow-md"
           onClick={() => router.push("/cookbook/" + recipe.id)}>
            {recipe.title}
        </p>
    ));

    useEffect(() => {
        async function fetchRecipes() {
            return await fetch("/api/cookbook");
        }
        fetchRecipes().then(response => {
            response.ok && response.json().then(data => setRecipes(data.recipes));
        });
    }, []);

    return (
        <div className="flex flex-col gap-5 p-5">
            {recipeListItems}
        </div>
    )
}