import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";

export interface Suggestion {
    id: string;
    text: string;
    icon?: React.ReactNode;
    category?: "general" | "code" | "creative" | "analysis";
}

interface SuggestionsProps {
    suggestions: Suggestion[];
    onSelectSuggestion: (suggestion: Suggestion) => void;
    className?: string;
    showDefault?: boolean;
}

// Default suggestions for portfolio chatbot
export const defaultSuggestions: Suggestion[] = [
    {
        id: "about-me",
        text: "Tell me about yourself",
        category: "general",
    },
    {
        id: "experience",
        text: "What's your experience?",
        category: "general",
    },
    {
        id: "projects",
        text: "Show me your projects",
        category: "code",
    },
    {
        id: "contact",
        text: "How can I contact you?",
        category: "general",
    },
];

export const Suggestions: React.FC<SuggestionsProps> = ({
    suggestions,
    onSelectSuggestion,
    className,
    showDefault = true,
}) => {
    const suggestionsToShow = suggestions.length > 0 ? suggestions : showDefault ? defaultSuggestions : [];

    if (suggestionsToShow.length === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    "grid gap-2 mb-4 transition-all duration-300",
                    "grid-cols-2 sm:grid-cols-4", // 2 columns on mobile, 4 on desktop
                    className
                )}
            >
                {suggestionsToShow.slice(0, 4).map((suggestion, index) => (
                    <motion.button
                        key={suggestion.id}
                        initial={{ opacity: 0, scale: 0.96, y: 4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                            delay: index * 0.03,
                            duration: 0.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => onSelectSuggestion(suggestion)}
                        className={cn(
                            "group relative p-2 bg-card rounded-md border border-border hover:border-accent-foreground/20 transition-all duration-200",
                            "text-center text-sm text-muted-foreground hover:text-foreground",
                            "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-background",
                            "shadow-sm hover:shadow-md hover:shadow-primary/5",
                            "font-sans leading-relaxed text-sm",
                            index < 2 ? "flex" : "hidden sm:flex" // Show first 2 on mobile, all 4 on desktop
                        )}
                    >
                        {suggestion.icon && (
                            <span className="flex-shrink-0 text-muted-foreground/70 group-hover:text-primary/80 transition-colors duration-200">
                                {suggestion.icon}
                            </span>
                        )}
                        <span className="truncate font-medium group-hover:text-foreground transition-colors duration-200 w-full">
                            {suggestion.text}
                        </span>

                        {/* Subtle gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

                        {/* Bottom border accent */}
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </motion.button>
                ))}
            </motion.div>
        </AnimatePresence>
    );
};
