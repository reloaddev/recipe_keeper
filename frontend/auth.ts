import NextAuth from "next-auth"
import Google from "@auth/core/providers/google";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const {handlers, signIn, signOut, auth} = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Google],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async session({token, session}) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            return session;
        },
        async jwt({token}) {
            return token;
        },
    }
});