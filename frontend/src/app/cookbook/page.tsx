"use client"

import {useEffect, useState} from "react";
import {Recipe} from "@/src/lib/scrape.util";
import {useRouter} from "next/navigation";
import {Trash2} from "react-feather";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config";

export default function Page() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const fullConfig = resolveConfig(tailwindConfig);
        const tailwindBreakpoints = ({
            sm: +fullConfig.theme.screens.sm.replace(/\D/g, ""),
            md: +fullConfig.theme.screens.md.replace(/\D/g, ""),
            lg: +fullConfig.theme.screens.lg.replace(/\D/g, ""),
            xl: +fullConfig.theme.screens.xl.replace(/\D/g, "")
        });
        window.addEventListener("resize", () => {
            if (tailwindBreakpoints.sm && (window.screen.width < tailwindBreakpoints.sm)) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        });
    }, []);

    function renderTitle(recipe: Recipe) {
        if (isMobile) {
            return recipe.title?.length!! > 32 ? (recipe.title?.substring(0, 32) + "...") : recipe.title
        }
        return recipe.title?.length!! > 70 ? (recipe.title?.substring(0, 70) + "...") : recipe.title
    }

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
                {renderTitle(recipe)}
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
        <div className="flex flex-col gap-5 px-5 py-5 sm:mt-6">
            <h3 className="text-xl">Saved Recipes</h3>
            {recipeListItems}
        </div>
    )
}