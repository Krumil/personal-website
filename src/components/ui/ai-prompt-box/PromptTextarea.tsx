import React from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import { Textarea } from "../textarea";

import { usePromptInput } from "./PromptInputContext";

type VoiceState = "idle" | "connecting" | "connected" | "listening" | "speaking" | "error";

interface PromptTextareaProps {
    placeholder: string;
    isVoiceMode: boolean;
    voiceState?: VoiceState;
    lastUserMessage: string;
    lastAIMessage: string;
}

const getVoiceStateText = (voiceState: VoiceState) => {
    switch (voiceState) {
        case "connecting":
            return "Connecting...";
        case "connected":
            return "Connected - Ready to talk";
        case "listening":
            return "Listening...";
        case "speaking":
            return "AI is speaking...";
        case "error":
            return "Error occurred";
        default:
            return "Ready to start";
    }
};

export function PromptTextarea({
    placeholder,
    isVoiceMode,
    voiceState = "idle",
    lastUserMessage,
    lastAIMessage,
}: PromptTextareaProps) {
    const { value, setValue, disabled, maxHeight, onSubmit } = usePromptInput();
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {
        if (!textareaRef.current || isVoiceMode) return;
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height =
            typeof maxHeight === "number"
                ? `${Math.min(textareaRef.current.scrollHeight, maxHeight)}px`
                : `min(${textareaRef.current.scrollHeight}px, ${maxHeight})`;
    }, [value, maxHeight, isVoiceMode]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey && !disabled) {
            e.preventDefault();
            onSubmit?.();
        }
    };

    if (isVoiceMode) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center w-full py-3"
            >
                <div className="flex items-center gap-2 mb-3">
                    <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-mono text-sm text-foreground/80 font-technor">
                        {getVoiceStateText(voiceState)}
                    </span>
                </div>

                {voiceState === "connected" && (
                    <div className="w-full h-10 flex items-center justify-center gap-0.5 px-4">
                        {[...Array(32)].map((_, i) => (
                            <div
                                key={i}
                                className="w-0.5 rounded-full bg-secondary/50 animate-pulse"
                                style={{
                                    height: `${Math.max(15, Math.random() * 100)}%`,
                                    animationDelay: `${i * 0.05}s`,
                                    animationDuration: `${0.5 + Math.random() * 0.5}s`,
                                }}
                            />
                        ))}
                    </div>
                )}

                {lastUserMessage && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xs text-muted-foreground mb-2 font-mono mt-2"
                    >
                        <strong className="text-foreground">You:</strong> {lastUserMessage}
                    </motion.div>
                )}
                {lastAIMessage && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xs text-muted-foreground font-mono"
                    >
                        <strong className="text-secondary">AI:</strong> {lastAIMessage}
                    </motion.div>
                )}
            </motion.div>
        );
    }

    return (
        <div
            className={cn(
                "transition-all duration-300 relative",
                isVoiceMode ? "h-0 overflow-hidden opacity-0" : "opacity-100"
            )}
        >
            <div className="relative">
                <Textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={cn(
                        "text-base font-mono bg-transparent border-0 resize-none focus:ring-0 focus:outline-none pr-12",
                        "text-base"
                    )}
                />
            </div>
        </div>
    );
}
