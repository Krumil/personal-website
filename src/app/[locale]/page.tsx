"use client";

import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { Play, Pause } from "lucide-react";

import { HoleBackground } from "@/components/ui/hole";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import { ParticleSystem } from "@/components/ui/ParticleSystem";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatMessages } from "@/components/chat/ChatMessages";

export default function Homepage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { messages, append } = useChat();
    const [chatStarted, setChatStarted] = useState(false);
    const [animationEnabled, setAnimationEnabled] = useState(true);
    const [animationButtonEnabled, _setAnimationButtonEnabled] = useState(false);
    const [viewportHeight, setViewportHeight] = useState<number>(0);

    // Dynamic viewport height calculation
    useEffect(() => {
        const updateHeight = () => {
            // Use visualViewport API when available (better for virtual keyboard)
            if (window.visualViewport) {
                setViewportHeight(window.visualViewport.height);
            } else {
                // Fallback to window.innerHeight
                setViewportHeight(window.innerHeight);
            }
        };

        // Set initial height
        updateHeight();

        // Listen for viewport changes
        if (window.visualViewport) {
            window.visualViewport.addEventListener("resize", updateHeight);
            window.visualViewport.addEventListener("scroll", updateHeight);
        } else {
            window.addEventListener("resize", updateHeight);
            window.addEventListener("orientationchange", updateHeight);
        }

        return () => {
            if (window.visualViewport) {
                window.visualViewport.removeEventListener("resize", updateHeight);
                window.visualViewport.removeEventListener("scroll", updateHeight);
            } else {
                window.removeEventListener("resize", updateHeight);
                window.removeEventListener("orientationchange", updateHeight);
            }
        };
    }, []);

    // Custom submit handler to track when chat starts
    const handleSendMessage = async (message: string, _files?: File[]) => {
        if (message.trim()) {
            if (!chatStarted) {
                setChatStarted(true);
            }

            // Use append directly instead of manipulating input
            await append({
                role: "user",
                content: message,
            });
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
                className="bg-background text-black dark:text-white transition-colors overflow-hidden fixed inset-0"
                style={{
                    height: viewportHeight ? `${viewportHeight}px` : "100dvh",
                }}
            >
                <div className="relative flex flex-col justify-center h-full overflow-hidden">
                    <HoleBackground
                        strokeColor="#d4d4d4"
                        animationIntensity={animationEnabled ? 0.3 : 0}
                        className="absolute inset-0 flex items-center justify-center rounded-xl"
                    />

                    {/* Animation Toggle Button */}
                    {animationButtonEnabled && (
                        <motion.button
                            onClick={() => setAnimationEnabled(!animationEnabled)}
                            className="fixed bottom-4 right-4 z-20 p-3 bg-background/80 hover:bg-background/90 border border-border rounded-full shadow-lg transition-all duration-200 hover:scale-105"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            title={animationEnabled ? "Pause animation" : "Resume animation"}
                        >
                            {animationEnabled ? (
                                <Pause className="w-4 h-4 text-foreground" />
                            ) : (
                                <Play className="w-4 h-4 text-foreground" />
                            )}
                        </motion.button>
                    )}

                    <motion.div
                        className="relative z-10 mx-auto md:w-5xl px-4 md:px-8 pt-24 pb-8 md:pt-24 flex flex-col justify-between rounded-[20px] h-full flex-1 overflow-hidden"
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        {/* Header - show only when chat hasn't started */}
                        {!chatStarted && <ChatHeader />}

                        {/* Chat Messages - show when chat has started */}
                        {chatStarted && <ChatMessages messages={messages} />}

                        {/* AI Input Form */}
                        <motion.div
                            className="max-w-4xl mx-auto w-full relative z-10"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1, duration: 0.6 }}
                        >
                            <PromptInputBox onSend={handleSendMessage} />
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
}
