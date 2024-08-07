import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    await prisma.$connect();
    const recipes = await prisma.recipe.findMany()
        .catch(err => console.error(err));
    await prisma.$disconnect();
    return Response.json({status: 200, recipes: recipes});
}