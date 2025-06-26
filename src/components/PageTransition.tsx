"use client";

import { AnimatePresence, motion, Variants } from "motion/react";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface PageTransitionProps {
    children: ReactNode;
    className?: string;
}

// Different transition variants for different routes
const getTransitionVariant = (pathname: string): Variants => {
    // Home page gets a special entrance
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
                    staggerChildren: 0.1
                }
            },
            exit: { 
                opacity: 0, 
                scale: 1.05, 
                y: -40,
                transition: {
                    duration: 0.2
                }
            }
        };
    }

    // Project pages get slide transitions
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
                    damping: 20
                }
            },
            exit: { 
                opacity: 0, 
                x: -100, 
                y: -20,
                transition: {
                    duration: 0.3
                }
            }
        };
    }

    // Default transition for other pages
    return {
        initial: { opacity: 0, y: 20 },
        animate: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        },
        exit: { 
            opacity: 0, 
            y: -20,
            transition: {
                duration: 0.2
            }
        }
    };
};

export function PageTransition({ children, className }: PageTransitionProps) {
    const pathname = usePathname();
    const [displayLocation, setDisplayLocation] = useState(pathname);
    const [transitionStage, setTransitionStage] = useState("fadeIn");

    useEffect(() => {
        if (pathname !== displayLocation) {
            setTransitionStage("fadeOut");
        }
    }, [pathname, displayLocation]);

    const variants = getTransitionVariant(pathname);

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
                className={className}
                style={{
                    // Ensure smooth transitions
                    willChange: "transform, opacity",
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

// Loading transition component
export function LoadingTransition() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
            <motion.div
                animate={{
                    rotate: 360,
                }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full"
            />
        </motion.div>
    );
}