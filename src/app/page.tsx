"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";

import { HoleBackground } from "@/components/ui/hole";
import { LineShadowText } from "@/components/ui/line-shadow-text";

// Particle system
const ParticleSystem = () => {
    const [particles, setParticles] = useState<
        Array<{
            id: number;
            x: number;
            y: number;
            size: number;
            duration: number;
        }>
    >([]);

    useEffect(() => {
        const generateParticles = () => {
            const newParticles = Array.from({ length: 20 }, (_, i) => ({
                id: i,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 3 + 1,
                duration: Math.random() * 10 + 5,
            }));
            setParticles(newParticles);
        };

        generateParticles();
        const interval = setInterval(generateParticles, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-10">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute bg-orange-400/30 rounded-full"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        left: particle.x,
                        top: particle.y,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        y: [0, -100],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        ease: "easeOut",
                    }}
                />
            ))}
        </div>
    );
};

export default function Homepage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

    return (
        <>
            <ParticleSystem />
            <motion.div
                ref={containerRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors overflow-hidden"
            >
                <div className="relative h-screen flex flex-col justify-center">
                    <HoleBackground
                        strokeColor="#d4d4d4"
                        className="absolute inset-0 flex items-center justify-center rounded-xl"
                    />

                    <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 flex flex-col justify-between bg-black/80 rounded-[20px] min-h-[100%] md:min-h-[80%]">
                        {/* Header - sophisticated entrance */}
                        <motion.div
                            className="text-center mb-16"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                duration: 1,
                                delay: 0.3,
                                type: "spring",
                                stiffness: 100,
                                damping: 20,
                            }}
                        >
                            <motion.h1 className="text-5xl md:text-9xl font-bold mb-6 text-black dark:text-white">
                                <motion.span
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.8 }}
                                    className="inline-block mr-4"
                                >
                                    Hi, I'm
                                </motion.span>
                                <motion.span
                                    className="text-black dark:text-white"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 1.2,
                                        type: "spring",
                                        stiffness: 120,
                                        damping: 15,
                                    }}
                                >
                                    <LineShadowText className="italic" shadowColor="#f2612e">
                                        Simone
                                    </LineShadowText>
                                </motion.span>
                            </motion.h1>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
