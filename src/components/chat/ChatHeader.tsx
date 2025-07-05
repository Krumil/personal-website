"use client";

import { motion } from "motion/react";

import { LineShadowText } from "@/components/ui/line-shadow-text";

export const ChatHeader = () => {
    return (
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
    );
};
