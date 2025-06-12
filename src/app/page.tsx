"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Brain, Blocks, Eye, Zap, Code } from "lucide-react";
import GlassCard from "@/components/ui/glass-card";

export default function QuantumPortfolio() {
    const [selectedUniverse, setSelectedUniverse] = useState<string | null>(null);
    const [isCollapsing, setIsCollapsing] = useState(false);

    // Check localStorage for previous universe selection
    useEffect(() => {
        const savedUniverse = localStorage.getItem("quantum-portfolio-universe");
        if (savedUniverse) {
            setSelectedUniverse(savedUniverse);
        }
    }, []);

    const handleUniverseSelection = (universe: string) => {
        setIsCollapsing(true);
        setSelectedUniverse(universe);
        localStorage.setItem("quantum-portfolio-universe", universe);

        // Simulate quantum collapse animation then navigate
        setTimeout(() => {
            window.location.href = `/${universe.toLowerCase()}`;
        }, 2000);
    };

    const resetQuantumState = () => {
        setSelectedUniverse(null);
        setIsCollapsing(false);
        localStorage.removeItem("quantum-portfolio-universe");
    };

    if (isCollapsing) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <motion.div
                        animate={{ scale: [1, 1.5, 0], opacity: [1, 1, 0] }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    >
                        <div className="w-32 h-32 border-2 border-white rounded-full animate-spin mx-auto mb-8"></div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 space-y-4"
                    >
                        <h2 className="text-2xl font-bold text-white">Loading...</h2>
                        <p className="text-gray-400">Taking you to {selectedUniverse} projects</p>
                    </motion.div>
                </div>
            </div>
        );
    }

    if (selectedUniverse) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center space-y-8 p-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-4"
                    >
                        <h1 className="text-4xl font-bold text-white">{selectedUniverse} Projects</h1>
                        <p className="text-xl text-gray-400">
                            Explore my work in {selectedUniverse.toLowerCase()} development.
                        </p>
                    </motion.div>

                    <motion.button
                        onClick={resetQuantumState}
                        className="px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-lg font-medium transition-colors border border-gray-600"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Zap className="w-5 h-5 inline mr-2" />
                        Back to Main Page
                    </motion.button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-12 max-w-4xl"
                >
                    {/* Header */}
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">Simone Saletti</h1>

                        <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
                            Full-stack developer building innovative applications at the intersection of{" "}
                            <span className="text-white font-medium">artificial intelligence</span> and{" "}
                            <span className="text-white font-medium">blockchain technology</span>. Choose your area of
                            interest to explore my work.
                        </p>
                    </div>

                    {/* Universe Selection */}
                    <div className="grid md:grid-cols-3 gap-8 mt-16">
                        {[
                            {
                                universe: "AI",
                                Icon: Brain,
                                label: "AI Projects",
                                description: "AI/ML integrations, LangChain, and intelligent applications.",
                            },
                            {
                                universe: "Blockchain",
                                Icon: Blocks,
                                label: "Blockchain Projects",
                                description: "DeFi dashboards, smart contracts, and Web3 applications.",
                            },
                            {
                                universe: "Full Stack",
                                Icon: Code,
                                label: "Full Stack Projects",
                                description: "React/Next.js, Node.js, and end-to-end development.",
                            },
                        ].map(({ universe, Icon, label, description }) => (
                            <motion.div
                                key={universe}
                                className="relative cursor-pointer"
                                onClick={() => handleUniverseSelection(universe)}
                                whileHover={{ scale: 1.03, y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <GlassCard title={label} description={description} Icon={Icon} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
