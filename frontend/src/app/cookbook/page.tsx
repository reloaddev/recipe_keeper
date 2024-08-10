"use client"

import {useContext, useEffect, useState} from "react";
import {Recipe} from "@/src/lib/scrape.util";
import {useRouter} from "next/navigation";
import {Trash2} from "react-feather";
import {ResponsiveContext} from "@/src/app/ResponsiveContext";
import {useSession} from "next-auth/react";

export default function Page() {
    const {data: session} = useSession();
    const userId = session?.user?.id;
    const isMobile = useContext(ResponsiveContext).isMobile;

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
        <div key={recipe.title}
             className="flex justify-between items-center p-5 border-2 rounded-xl shadow-md hover:bg-gray-200"
             onClick={() => router.push("/cookbook/" + recipe.id)}>
            <p className="text-gray-500">
                {isMobile
                    ? (recipe.title?.length!! > 30 ? (recipe.title?.substring(0, 30) + "...") : recipe.title)
                    : (recipe.title?.length!! > 70 ? (recipe.title?.substring(0, 70) + "...") : recipe.title)
                }
            </p>
            <button onClick={() => deleteRecipe(recipe.id)}>
                <Trash2 color={"gray"}/>
            </button>
        </div>
    ));

    useEffect(() => {
        async function fetchRecipes() {
            return await fetch("/api/cookbook", {
                method: "POST",
                body: JSON.stringify({userId: userId}),
            });
        }

        fetchRecipes().then(response => {
            response.ok && response.json().then(data => setRecipes(data.recipes));
        });
    }, [userId]);

    return (
        <div className="flex flex-col gap-5 px-5 py-5 sm:mt-6">
            <h3 className="text-xl">Saved Recipes</h3>
            {recipeListItems}
        </div>
    )
}