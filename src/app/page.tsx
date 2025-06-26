"use client";

import React, { Suspense } from "react";
import { motion } from "motion/react";
import { Brain, Blocks, Code } from "lucide-react";
import GlassCard from "@/components/ui/glass-card";
import { HyperText } from "@/components/ui/hyper-text";
import { useRouterTransition } from "@/hooks/useRouterTransition";

import MiniNavbar from "@/components/MiniNavbar";
import TransitionWrapper from "@/components/TransitionWrapper";

export default function Portfolio() {
    const { navigate, isNavigating } = useRouterTransition();
    const handleUniverseSelection = async (route: string) => {
        await navigate(`/${route}`);
    };

    const heroVariant = {
        hidden: { opacity: 0, y: 25 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    } as const;

    const gridContainerVariant = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    } as const;

    const gridItemVariant = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 380,
                damping: 28,
            },
        },
    } as const;

    return (
        <TransitionWrapper>
            <Suspense
                fallback={
                    <div className="min-h-screen bg-black flex items-center justify-center">
                        <div className="text-white text-sm animate-pulse">Loading portfolio...</div>
                    </div>
                }
            >
                <MiniNavbar />
                <div className="min-h-screen bg-transparent flex flex-col items-center justify-center px-4 py-8 sm:py-12">
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={heroVariant}
                    className="text-center space-y-8 sm:space-y-12 max-w-4xl w-full"
                >
                    <motion.div variants={heroVariant} className="space-y-4 sm:space-y-6 text-center">
                        <HyperText
                            className="text-xl md:text-4xl lg:text-5xl font-bold text-foreground text-center w-full px-2"
                            text="Simone Saletti"
                        />

                        <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto px-4">
                            I love building things that solve real problems. Whether it&apos;s creating{" "}
                            <span className="text-foreground font-medium">AI-powered tools</span> that make life easier
                            or <span className="text-foreground font-medium">blockchain apps</span> that actually work.
                            I&apos;m all about turning cool ideas into something you can actually use.
                        </p>
                    </motion.div>

                    {/* Universe Selection */}
                    <motion.div
                        variants={gridContainerVariant}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 w-full max-w-5xl mx-auto"
                    >
                        {[
                            {
                                universe: "AI",
                                Icon: Brain,
                                label: "AI",
                                description:
                                    "Smart apps that actually understand what you need and help you get stuff done.",
                                route: "ai",
                            },
                            {
                                universe: "Blockchain",
                                Icon: Blocks,
                                label: "Blockchain",
                                description:
                                    "Web3 apps that don&apos;t suck. Clean interfaces, real utility, no fluff.",
                                route: "blockchain",
                            },
                            {
                                universe: "Full Stack",
                                Icon: Code,
                                label: "Full Stack",
                                description: "End-to-end web apps built with modern tools and a focus on great UX.",
                                route: "fullstack",
                            },
                        ].map(({ universe, Icon, label, description, route }) => (
                            <motion.button
                                key={universe}
                                className="relative cursor-pointer flex justify-center"
                                onClick={() => handleUniverseSelection(route)}
                                variants={gridItemVariant}
                                whileHover={{ scale: 1.05, y: -8 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                style={{ opacity: isNavigating ? 0.7 : 1 }}
                                disabled={isNavigating}
                            >
                                <GlassCard title={label} description={description} Icon={Icon} />
                            </motion.button>
                        ))}
                    </motion.div>
                </motion.div>
                </div>
            </Suspense>
        </TransitionWrapper>
    );
}
