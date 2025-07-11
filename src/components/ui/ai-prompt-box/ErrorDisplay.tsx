import React from "react";
import { motion } from "motion/react";

interface ErrorDisplayProps {
    error: string | null;
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
    if (!error) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, type: "spring" }}
            className="mb-2 p-3 bg-gradient-to-br from-destructive/10 to-destructive/5 border border-destructive/20 rounded-xl text-destructive text-sm font-technor"
        >
            {error}
        </motion.div>
    );
}