"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProjectHeaderProps {
    title: string;
    icon: LucideIcon;
    showIcon?: boolean;
}

export function ProjectHeader({ title, icon: Icon, showIcon = true }: ProjectHeaderProps) {
    const router = useRouter();

    return (
        <header className="px-8 py-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <button
                    onClick={() => router.back()}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back</span>
                </button>

                <div className="flex items-center space-x-2 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-full border border-border">
                    {showIcon && <Icon className="w-5 h-5 text-foreground" />}
                    <span className="text-foreground text-sm font-medium">{title}</span>
                </div>
            </motion.div>
        </header>
    );
}
