import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Header from "@/src/app/header";
import PageFrame from "@/src/app/PageFrame";
import {SessionProvider} from "next-auth/react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Recipe Scraper",
    description: "Your recipes in one place",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {

    return (
        <html lang="en">
        <body className={inter.className}>
        <SessionProvider>
            <PageFrame>
                <Header/>
                {children}
            </PageFrame>
        </SessionProvider>
        </body>
        </html>
    );
}
