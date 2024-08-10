import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const body = await request.json();
    await prisma.$connect();
    await prisma.recipe.create({
        data: {
            title: body?.title,
            ingredients: body?.ingredients,
            instructions: body?.instructions,
            url: body?.url,
            userId: body?.userId
        }
    }).catch(err => console.error(err));
    await prisma.$disconnect();
    return Response.json({status: 200});
}
