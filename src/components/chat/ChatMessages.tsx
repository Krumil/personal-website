"use client";

import { motion } from "motion/react";
import { Bot } from "lucide-react";
import type { Message } from "@ai-sdk/react";

import { ToolInvocationRenderer } from "./ToolInvocationRenderer";

interface ChatMessagesProps {
    messages: Message[];
}

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
    return (
        <motion.div
            className="flex-1 overflow-y-auto mb-6 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
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
                        {message.toolInvocations && (
                            <ToolInvocationRenderer toolInvocations={message.toolInvocations} />
                        )}
                    </div>
                </div>
            ))}
        </motion.div>
    );
};
