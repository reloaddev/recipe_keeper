import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    await prisma.$connect();
    const recipes = await prisma.recipe.findMany()
        .catch(err => console.error(err));
    await prisma.$disconnect();
    return Response.json({status: 200, recipes: recipes});
}

export async function DELETE(request: Request) {
    const { id } = await request.json();
    await prisma.$connect();
    await prisma.recipe.delete({
        where: { id: id }
    }).catch(err => {
        console.error(err);
        return Response.json({status: 500, ok: false});
    });
    await prisma.$disconnect();
    return Response.json({status: 200, ok: true, deletedRecipeId: id});
}