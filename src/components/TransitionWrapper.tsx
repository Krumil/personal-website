"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, Variants } from "motion/react";

// Enhanced transition variants based on route
const getRouteTransition = (pathname: string): Variants => {
    if (pathname === "/") {
        return {
            initial: { opacity: 0, scale: 0.94, y: 30 },
            animate: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                    type: "spring",
                    bounce: 0.25,
                    duration: 0.5,
                },
            },
            exit: {
                opacity: 0,
                scale: 1.02,
                y: -30,
                transition: {
                    duration: 0.3,
                    ease: "easeOut",
                },
            },
        };
    }

    // if (pathname.includes("/ai") || pathname.includes("/blockchain") || pathname.includes("/fullstack")) {
    //     return {
    //         initial: { opacity: 0, x: 60 },
    //         animate: {
    //             opacity: 1,
    //             x: 0,
    //             transition: {
    //                 type: "spring",
    //                 bounce: 0.2,
    //                 duration: 0.45,
    //             },
    //         },
    //         exit: {
    //             opacity: 0,
    //             x: -60,
    //             transition: {
    //                 duration: 0.3,
    //                 ease: "easeOut",
    //             },
    //         },
    //     };
    // }

    return {
        initial: { opacity: 0, y: 15 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.35,
                ease: "easeOut",
            },
        },
        exit: {
            opacity: 0,
            y: -15,
            transition: {
                duration: 0.25,
            },
        },
    };
};

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
                    willChange: "transform, opacity",
                }}
                className="min-h-screen"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
