"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, Variants } from "motion/react";

// Simple fade-in/fade-out variants regardless of route
const getRouteTransition = (_pathname: string): Variants => ({
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.2,
            ease: "easeIn",
        },
    },
});

export default function TransitionWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [displayLocation, setDisplayLocation] = useState(pathname);

    useEffect(() => {
        // No body needed here; displayLocation is updated via onExitComplete below
    }, [pathname]);

    const variants = getRouteTransition(displayLocation);

    return (
        <AnimatePresence
            mode="wait"
            onExitComplete={() => {
                setDisplayLocation(pathname);
            }}
        >
            <motion.div
                key={displayLocation}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{
                    willChange: "opacity",
                }}
                className="min-h-screen"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
