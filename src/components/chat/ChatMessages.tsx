"use client";

import { motion } from "motion/react";
import { Bot, User } from "lucide-react";
import type { Message } from "@ai-sdk/react";

import { ToolInvocationRenderer } from "./ToolInvocationRenderer";

interface ChatMessagesProps {
    messages: Message[];
}

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
    return (
        <motion.div
            className="flex-1 overflow-y-auto mb-6 space-y-6 p-4 chat-scrollbar"
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
        </motion.div>
    );
};
