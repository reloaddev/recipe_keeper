
> frontend@0.1.0 npx
> prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script

-- CreateTable
CREATE TABLE "recipe" (
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "ingredients" JSON NOT NULL,
    "instructions" TEXT NOT NULL,

    CONSTRAINT "recipe_pkey" PRIMARY KEY ("title","url")
);

