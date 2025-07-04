"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Send, Bot } from "lucide-react";

import { Weather } from "@/components/generative/Weather";
import { Stock } from "@/components/generative/Stock";
import { Portfolio } from "@/components/generative/Portfolio";
import { Skills } from "@/components/generative/Skills";
import { Contact } from "@/components/generative/Contact";
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
    const { messages, input, handleInputChange, handleSubmit, status } = useChat();
    const [chatStarted, setChatStarted] = useState(false);

    // Custom submit handler to track when chat starts
    const handleChatSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        handleSubmit(e);
        if (!chatStarted && input.trim()) {
            setChatStarted(true);
        }
    };

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

                    <div className="relative z-10 mx-auto md:w-5xl px-4 md:px-8 py-16 md:py-24 flex flex-col justify-between bg-black/80 rounded-[20px] h-[90%]">
                        {/* Header - show only when chat hasn't started */}
                        {!chatStarted && (
                            <motion.div
                                className="text-center mb-16"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
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
                                <motion.h3 className="text-2xl md:text-4xl font-bold mb-6 text-black dark:text-white">
                                    Let's build something great together
                                </motion.h3>
                            </motion.div>
                        )}

                        {/* Chat Messages - show when chat has started */}
                        {chatStarted && (
                            <motion.div
                                className="flex-1 overflow-y-auto mb-6 space-y-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[80%] p-4 rounded-lg ${
                                                message.role === "user"
                                                    ? "bg-white text-black"
                                                    : "bg-white/10 text-white border border-white/20"
                                            }`}
                                        >
                                            {message.role === "assistant" && (
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Bot className="w-4 h-4" />
                                                    <span className="text-sm font-medium">Simone</span>
                                                </div>
                                            )}
                                            <p className="text-sm">{message.content}</p>
                                            
                                            {/* Render Generative UI Components */}
                                            {message.toolInvocations?.map((toolInvocation) => {
                                                const { toolName, toolCallId, state } = toolInvocation;

                                                if (state === 'result') {
                                                    if (toolName === 'displayWeather') {
                                                        const { result } = toolInvocation;
                                                        return (
                                                            <div key={toolCallId} className="mt-3">
                                                                <Weather {...result} />
                                                            </div>
                                                        );
                                                    } else if (toolName === 'getStockPrice') {
                                                        const { result } = toolInvocation;
                                                        return (
                                                            <div key={toolCallId} className="mt-3">
                                                                <Stock {...result} />
                                                            </div>
                                                        );
                                                    } else if (toolName === 'showProjects') {
                                                        const { result } = toolInvocation;
                                                        return (
                                                            <div key={toolCallId} className="mt-3">
                                                                <Portfolio {...result} />
                                                            </div>
                                                        );
                                                    } else if (toolName === 'showSkills') {
                                                        const { result } = toolInvocation;
                                                        return (
                                                            <div key={toolCallId} className="mt-3">
                                                                <Skills {...result} />
                                                            </div>
                                                        );
                                                    } else if (toolName === 'getContact') {
                                                        const { result } = toolInvocation;
                                                        return (
                                                            <div key={toolCallId} className="mt-3">
                                                                <Contact {...result} />
                                                            </div>
                                                        );
                                                    }
                                                } else {
                                                    // Show loading states for different tools
                                                    return (
                                                        <div key={toolCallId} className="mt-3">
                                                            <div className="bg-white/5 border border-white/10 rounded-lg p-3 animate-pulse">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce"></div>
                                                                    <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:0.1s]"></div>
                                                                    <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                                                    <span className="text-xs text-white/60 ml-2">
                                                                        {toolName === 'displayWeather' && 'Getting weather...'}
                                                                        {toolName === 'getStockPrice' && 'Fetching stock data...'}
                                                                        {toolName === 'showProjects' && 'Loading projects...'}
                                                                        {toolName === 'showSkills' && 'Loading skills...'}
                                                                        {toolName === 'getContact' && 'Getting contact info...'}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {/* AI Input Form */}
                        <motion.form
                            onSubmit={handleChatSubmit}
                            className="max-w-4xl mx-auto w-full"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 2.2, duration: 0.6 }}
                        >
                            <div className="flex gap-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-3">
                                <input
                                    className="flex-1 bg-transparent text-white placeholder-white/60 border-none outline-none text-base"
                                    value={input}
                                    placeholder="Ask about my skills, projects, experience..."
                                    onChange={handleInputChange}
                                    disabled={status === "submitted"}
                                />
                                <motion.button
                                    type="submit"
                                    disabled={status === "submitted" || !input.trim()}
                                    className="px-4 py-2 bg-white text-black rounded-lg hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Send className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </motion.form>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
