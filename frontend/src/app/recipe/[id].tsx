import { Ingredient } from "@/src/lib/scrape.util";

export default function Recipe(recipe: any) {

    const title = recipe.recipe.title;
    const ingredientList: Ingredient[] = recipe.recipe.ingredients;
    const instructions: string = recipe.recipe.instructions;
    const ingredientItems = ingredientList.map(ingredient => <li>{ingredient.amount} {ingredient.name}</li>)
    const formattedInstructions = instructions.replaceAll("<br>", "\n").trimEnd();

    async function saveRecipe() {
        await fetch("/api", {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ title: title, ingredients: ingredientList, instructions: formattedInstructions })
        })
    }

    return (
        <div className="w-full mt-10 p-10 border-solid border-2 border-black rounded-lg">
            <h1 className="text-2xl">{title}</h1>
            <h1 className="text-xl mt-7">Ingredients</h1>
            <ul>{ingredientItems}</ul>
            <h1 className="text-xl mt-7">Instructions</h1>
            <div className="display-linebreak">{formattedInstructions}</div>
            <button onClick={saveRecipe} className="border-2 border-black rounded-lg p-1">Save</button>
        </div>
    )

}