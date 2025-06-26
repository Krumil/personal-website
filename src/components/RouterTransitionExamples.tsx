"use client";

import { motion } from "motion/react";
import { TransitionLink } from "./TransitionLink";
import { useRouterTransition } from "@/hooks/useRouterTransition";

export function RouterTransitionExamples() {
    const { navigate, isNavigating } = useRouterTransition();

    return (
        <div className="space-y-8 p-8">
            <h2 className="text-2xl font-bold">Router Transition Examples</h2>
            
            {/* Method 1: TransitionLink Component */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">1. TransitionLink Component</h3>
                <p className="text-muted-foreground">
                    Use this for simple navigation with built-in hover effects and transition handling.
                </p>
                <div className="flex gap-4">
                    <TransitionLink 
                        href="/ai" 
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        Go to AI Projects
                    </TransitionLink>
                    <TransitionLink 
                        href="/blockchain" 
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                        Go to Blockchain
                    </TransitionLink>
                </div>
            </div>

            {/* Method 2: useRouterTransition Hook */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">2. useRouterTransition Hook</h3>
                <p className="text-muted-foreground">
                    Use this when you need more control over the navigation process.
                </p>
                <div className="flex gap-4">
                    <motion.button
                        onClick={() => navigate("/fullstack")}
                        className="px-4 py-2 bg-purple-600 text-white rounded"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ opacity: isNavigating ? 0.7 : 1 }}
                        disabled={isNavigating}
                    >
                        {isNavigating ? "Navigating..." : "Go to Full Stack"}
                    </motion.button>
                </div>
            </div>

            {/* Method 3: Template-based transitions */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">3. Template-based Transitions</h3>
                <p className="text-muted-foreground">
                    Automatic transitions using src/app/template.tsx - works for all navigation.
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                    <code className="text-sm">
                        {`// src/app/template.tsx handles all route transitions automatically`}
                    </code>
                </div>
            </div>

            {/* Method 4: View Transitions API */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">4. View Transitions API (Modern Browsers)</h3>
                <p className="text-muted-foreground">
                    Native browser transitions - automatically enabled when supported.
                </p>
                <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded">
                    <p className="text-sm">
                        ✨ This uses the browser's native View Transitions API when available,
                        falling back to motion-based transitions in older browsers.
                    </p>
                </div>
            </div>
        </div>
    );
}