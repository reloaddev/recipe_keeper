import {PrismaClient} from "@prisma/client";
import {Recipe} from "@/src/lib/scrape.util";
import BackButton from "@/src/app/cookbook/[id]/BackButton";

const getRecipe = (async ({params}: { params: { id: string } }) => {
    const recipeId = +params.id;
    const prisma = new PrismaClient();
    await prisma.$connect();
    const recipe = await prisma.recipe.findUniqueOrThrow({
        where: {id: recipeId}
    }).catch(err => console.error(err));
    await prisma.$disconnect();
    return recipe || {};
})

export default async function Page({params}: {params: { id: string} }) {
    const recipe: Recipe = await getRecipe({params});
    const title = recipe?.title;
    const ingredientList = recipe?.ingredients;
    const instructions = recipe?.instructions;
    const ingredientItems = ingredientList?.map(ingredient => <li key={ingredient.name + Math.random()}>{ingredient.amount} {ingredient.name}</li>)
    const formattedInstructions = instructions?.replaceAll("<br>", "\n").trimEnd();
    const url = recipe?.url;

    return (
        <div className="flex flex-col my-5 sm:mt-20 m-5 px-5 sm:p-10 border-solid border-2 border-black rounded-lg">
            <div className="flex flex-col-reverse mt-3 gap-3 sm:flex-row sm:items-center sm:justify-center">
                <h1 className="text-2xl">{title}</h1>
                <BackButton/>
            </div>
            <h1 className="text-xl mt-7">Ingredients</h1>
            <ul>{ingredientItems}</ul>
            <h1 className="text-xl mt-7">Instructions</h1>
            <div className="display-linebreak">{formattedInstructions}</div>
            <div className="mt-10 display-linebreak">Source</div>
            <a href={url} className="underline break-all">{url}</a>
        </div>
    )
}