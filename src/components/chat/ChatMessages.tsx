"use client";

import { motion } from "motion/react";
import type { Message } from "@ai-sdk/react";
import { useEffect, useRef } from "react";

import { ToolInvocationRenderer } from "./ToolInvocationRenderer";

interface ChatMessagesProps {
    messages: Message[];
}

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        const scrollToBottom = () => {
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                });
            }
        };

        // Scroll immediately for new messages
        scrollToBottom();

        // Also scroll after a short delay to handle streaming content updates
        const timeoutId = setTimeout(scrollToBottom, 100);

        return () => clearTimeout(timeoutId);
    }, [messages]);

    // Additional effect to handle streaming content changes
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new MutationObserver(() => {
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                });
            }
        });

        observer.observe(container, {
            childList: true,
            subtree: true,
            characterData: true,
        });

        return () => observer.disconnect();
    }, []);

    return (
        <motion.div
            ref={containerRef}
            className="flex-1 overflow-y-auto mb-6 space-y-6 p-4 chat-scrollba font-sans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {messages.map((message) => (
                <motion.div
                    key={message.id}
                    className={`flex gap-3 items-end ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Message content */}
                    <div className={`max-w-[90%] md:max-w-[70%] ${message.role === "user" ? "order-first" : ""}`}>
                        {/* Role label */}
                        <div
                            className={`text-xs text-muted-foreground mb-1 ${
                                message.role === "user" ? "text-right" : "text-left"
                            }`}
                        >
                            {message.role === "user" ? "You" : "Simone"}
                        </div>

                        {/* Message bubble */}
                        <div
                            className={`p-3 rounded-2xl text-sm leading-relaxed backdrop-blur-sm ${
                                message.role === "user"
                                    ? "bg-gradient-to-br from-secondary/90 to-secondary/70 text-secondary-foreground ml-auto shadow-lg border border-secondary/20"
                                    : "bg-gradient-to-br from-card/95 to-muted/80 text-card-foreground border border-border/60 shadow-md backdrop-blur-md"
                            }`}
                        >
                            <p className="whitespace-pre-wrap">{message.content}</p>

                            {/* Render Generative UI Components */}
                            {"toolInvocations" in message && message.toolInvocations && (
                                <div className="mt-3">
                                    <ToolInvocationRenderer toolInvocations={message.toolInvocations} />
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            ))}
            {/* Invisible element to scroll to */}
            <div ref={messagesEndRef} />
        </motion.div>
    );
};
