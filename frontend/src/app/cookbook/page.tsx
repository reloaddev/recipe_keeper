"use client"

import {useEffect, useState} from "react";
import {Recipe} from "@/src/lib/scrape.util";
import {useRouter} from "next/navigation";
import {Trash2} from "react-feather";

export default function Page() {

    async function deleteRecipe(id: number | undefined) {
        if (!id) throw new Error("Recipe has no ID!");
        const response = await fetch("/api/cookbook", {
            method: "DELETE",
            body: JSON.stringify({id: id})
        });
        if (response.ok) {
            const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
            setRecipes(updatedRecipes);
        }
    }

    const router = useRouter();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const recipeListItems = recipes.map(recipe => (
        <div key={recipe.title} className="flex justify-between items-center p-5 border-2 rounded-xl shadow-md">
            <p className="text-gray-500"
               onClick={() => router.push("/cookbook/" + recipe.id)}>
                {recipe.title?.length ?? 0 > 32 ? recipe.title?.substring(0, 32) + "..." : recipe.title}
            </p>
            <button onClick={() => deleteRecipe(recipe.id)}>
                <Trash2 color={"gray"}/>
            </button>
        </div>
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
            <h3 className="text-xl">Saved Recipes</h3>
            {recipeListItems}
        </div>
    )
}