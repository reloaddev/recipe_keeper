"use client"

import React, {useContext, useEffect, useState} from "react";
import {Recipe} from "@/src/lib/scrape.util";
import {useRouter} from "next/navigation";
import {Meh, Trash2} from "react-feather";
import {ResponsiveContext} from "@/src/app/ResponsiveContext";
import {useSession} from "next-auth/react";

export default function Page() {
    const {data: session} = useSession();
    const userId = session?.user?.id;
    const isMobile = useContext(ResponsiveContext).isMobile;
    const [loading, setLoading] = useState(true);

    async function deleteRecipe(ev: React.MouseEvent<HTMLButtonElement>, id: number | undefined) {
        ev.stopPropagation();
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
            <button className="m-2"
                    onClick={ev => deleteRecipe(ev, recipe.id)}>
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

        setLoading(true);
        fetchRecipes()
            .then(response => {
                response.ok && response.json().then(data => setRecipes(data.recipes))
            })
            .catch(() => {
                setRecipes([]);
                setLoading(false);
            });
        setTimeout(() => {
            setLoading(false);
        }, 300);
    }, [session, userId]);

    return (
        <div className="flex flex-col gap-5 px-5 py-5 sm:mt-6">
            <h3 className="text-xl">Saved Recipes</h3>
            {!loading && recipeListItems}
            {!loading && recipes.length === 0 &&
                <div className="flex flex-col items-center gap-4 mt-64 self-center">
                    <Meh size={80} strokeWidth={1} color={"gray"}/>
                    <p className="text-gray-500 ">No recipes saved yet</p>
                </div>
            }
        </div>
    )
}