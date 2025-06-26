"use client";

import { AnimatePresence, motion, Variants } from "motion/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

// Enhanced transition variants based on route
const getRouteTransition = (pathname: string): Variants => {
    if (pathname === "/") {
        return {
            initial: { opacity: 0, scale: 0.95, y: 40 },
            animate: { 
                opacity: 1, 
                scale: 1, 
                y: 0,
                transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: 0.6
                }
            },
            exit: { 
                opacity: 0, 
                scale: 1.05, 
                y: -40,
                transition: { duration: 0.3 }
            }
        };
    }

    if (pathname.includes("/ai") || pathname.includes("/blockchain") || pathname.includes("/fullstack")) {
        return {
            initial: { opacity: 0, x: 100, y: 20 },
            animate: { 
                opacity: 1, 
                x: 0, 
                y: 0,
                transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    duration: 0.5
                }
            },
            exit: { 
                opacity: 0, 
                x: -100, 
                y: -20,
                transition: { duration: 0.3 }
            }
        };
    }

    return {
        initial: { opacity: 0, y: 20 },
        animate: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" }
        },
        exit: { 
            opacity: 0, 
            y: -20,
            transition: { duration: 0.2 }
        }
    };
};

export default function TransitionWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [displayLocation, setDisplayLocation] = useState(pathname);
    const [transitionStage, setTransitionStage] = useState("fadeIn");

    useEffect(() => {
        if (pathname !== displayLocation) {
            setTransitionStage("fadeOut");
        }
    }, [pathname, displayLocation]);

    const variants = getRouteTransition(pathname);

    return (
        <AnimatePresence 
            mode="wait"
            onExitComplete={() => {
                setDisplayLocation(pathname);
                setTransitionStage("fadeIn");
            }}
        >
            <motion.div
                key={pathname}
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
