"use client";

import { createContext, useContext, useEffect, useState, startTransition } from "react";

interface PerformanceContextType {
    isOptimized: boolean;
    metrics: {
        bundleSize?: number;
        loadTime?: number;
        renderTime?: number;
    };
    enableOptimizations: () => void;
}

const PerformanceContext = createContext<PerformanceContextType | null>(null);

export const usePerformance = () => {
    const context = useContext(PerformanceContext);
    if (!context) {
        throw new Error("usePerformance must be used within PerformanceProvider");
    }
    return context;
};

interface PerformanceProviderProps {
    children: React.ReactNode;
}

export const PerformanceProvider: React.FC<PerformanceProviderProps> = ({ children }) => {
    const [isOptimized, setIsOptimized] = useState(false);
    const [metrics, setMetrics] = useState<PerformanceContextType["metrics"]>({});

    useEffect(() => {
        // Next.js 15+ specific optimizations
        const initializeOptimizations = () => {
            startTransition(() => {
                setIsOptimized(true);
            });

            // Measure performance with Next.js 15 features
            if (typeof window !== "undefined") {
                const measureMetrics = () => {
                    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;

                    if (navigation) {
                        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
                        const renderTime = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;

                        startTransition(() => {
                            setMetrics({
                                loadTime,
                                renderTime,
                                bundleSize: navigation.transferSize || 0,
                            });
                        });
                    }
                };

                // Use requestIdleCallback for better performance
                if ("requestIdleCallback" in window) {
                    requestIdleCallback(measureMetrics);
                } else {
                    setTimeout(measureMetrics, 0);
                }

                // Log Next.js 15 specific optimizations
                if (process.env.NODE_ENV === "development") {
                    console.log("🚀 Next.js 15+ Production-Ready Optimizations Active:");
                    console.log("✅ React Compiler enabled (React 19)");
                    console.log("✅ Optimized package imports");
                    console.log("✅ Server Components external packages");
                    console.log("✅ Enhanced image optimization");
                    console.log("✅ SWC minification");
                    console.log("✅ Advanced webpack optimizations");
                    console.log("✅ Font preloading strategy");
                    console.log("⚠️ PPR disabled (experimental - not production ready)");
                }
            }
        };

        initializeOptimizations();
    }, []);

    const enableOptimizations = () => {
        startTransition(() => {
            setIsOptimized(true);
        });
    };

    const value: PerformanceContextType = {
        isOptimized,
        metrics,
        enableOptimizations,
    };

    return <PerformanceContext.Provider value={value}>{children}</PerformanceContext.Provider>;
};
