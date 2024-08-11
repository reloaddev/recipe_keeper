"use client"

import {ResponsiveContext} from "@/src/app/context/ResponsiveContext";
import {useEffect, useState} from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config";

export default function PageFrame({children}: Readonly<{ children: React.ReactNode }>) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const fullConfig = resolveConfig(tailwindConfig);
        const smBreakpoint = +fullConfig.theme.screens.sm.replace(/\D/g, "");
        setIsMobile(window.screen.width < smBreakpoint);
        window.addEventListener("resize", () => setIsMobile(window.screen.width < smBreakpoint));
    }, []);

    return (
        <div className="w-full sm:px-60">
            <ResponsiveContext.Provider value={{isMobile: isMobile}}>
                {children}
            </ResponsiveContext.Provider>
        </div>
    )
}