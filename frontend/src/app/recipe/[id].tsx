import {Recipe} from "@/src/lib/scrape.util";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";

export default function RecipeView({recipe}: { recipe: Recipe }) {
    const router = useRouter();
    const { data: session, status } = useSession();

    const title = recipe.title;
    const ingredientList = recipe.ingredients;
    const instructions = recipe.instructions;
    const ingredientItems = ingredientList?.map(ingredient => <li
        key={ingredient.name}>{ingredient.amount} {ingredient.name}</li>)
    const formattedInstructions = instructions?.replaceAll("<br>", "\n").trimEnd();

    async function saveRecipe() {
        await fetch("/api", {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                title: title,
                ingredients: ingredientList,
                instructions: formattedInstructions,
                url: recipe.url,
                userId: session?.user?.id
            })
        })
    }

    return (
        <div className="flex flex-col my-5 sm:mt-20 p-5 sm:p-10 border-solid border-2 border-black rounded-lg">
            <h1 className="text-2xl">{title}</h1>
            <h1 className="text-xl mt-7">Ingredients</h1>
            <ul>{ingredientItems}</ul>
            <h1 className="text-xl mt-7">Instructions</h1>
            <div className="display-linebreak">{formattedInstructions}</div>
            {status === "authenticated" && <button onClick={saveRecipe}
                                       className="w-1/3 sm:w-1/12 mt-5 text-white bg-violet rounded-lg p-2 sm:p-3 ml-auto">
                Save
            </button>}
            {status === "unauthenticated" &&
                <p className="mt-5 text-violet ml-auto"
                   onClick={() => router.push('/')}>
                    Login to save recipes
                </p>}
        </div>
    )

}