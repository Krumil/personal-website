"use client";

import { useEffect, useId, useRef, useState, useCallback, useMemo } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

interface AnimatedGridPatternProps {
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    strokeDasharray?: string | number;
    numSquares?: number;
    className?: string;
    maxOpacity?: number;
    duration?: number;
}

export function AnimatedGridPatternOptimized({
    width = 40,
    height = 40,
    x = -1,
    y = -1,
    strokeDasharray = 0,
    numSquares = 50,
    className,
    maxOpacity = 0.5,
    duration = 4,
    ...props
}: AnimatedGridPatternProps) {
    const id = useId();
    const containerRef = useRef<SVGSVGElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const animationFrameRef = useRef<number>(0);
    const lastUpdateRef = useRef<number>(0);

    // Throttled resize observer to reduce performance impact
    const throttledResizeObserver = useMemo(() => {
        if (typeof window === "undefined" || !window.ResizeObserver) {
            return null;
        }

        let timeoutId: NodeJS.Timeout;

        return new ResizeObserver((entries) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                for (const entry of entries) {
                    setDimensions({
                        width: entry.contentRect.width,
                        height: entry.contentRect.height,
                    });
                }
            }, 100); // Throttle to 100ms
        });
    }, []);

    const getPos = useCallback(() => {
        return [
            Math.floor((Math.random() * dimensions.width) / width),
            Math.floor((Math.random() * dimensions.height) / height),
        ];
    }, [dimensions.width, dimensions.height, width, height]);

    // Memoize squares generation to prevent unnecessary recalculations
    const generateSquares = useCallback(
        (count: number) => {
            return Array.from({ length: count }, (_, i) => ({
                id: i,
                pos: getPos(),
                animationDelay: i * 0.1,
            }));
        },
        [getPos]
    );

    const [squares, setSquares] = useState(() => generateSquares(numSquares));

    // Optimized square position update with animation frame throttling
    const updateSquarePosition = useCallback(
        (id: number) => {
            const now = Date.now();
            if (now - lastUpdateRef.current < 16) return; // Throttle to ~60fps

            lastUpdateRef.current = now;

            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }

            animationFrameRef.current = requestAnimationFrame(() => {
                setSquares((currentSquares) =>
                    currentSquares.map((sq) =>
                        sq.id === id
                            ? {
                                  ...sq,
                                  pos: getPos(),
                              }
                            : sq
                    )
                );
            });
        },
        [getPos]
    );

    // Update squares when dimensions change, but debounce it
    useEffect(() => {
        if (dimensions.width && dimensions.height) {
            const timeoutId = setTimeout(() => {
                setSquares(generateSquares(numSquares));
            }, 200);

            return () => clearTimeout(timeoutId);
        }
    }, [dimensions, numSquares, generateSquares]);

    // Optimized resize observer setup
    useEffect(() => {
        const currentRef = containerRef.current;

        if (currentRef && throttledResizeObserver) {
            throttledResizeObserver.observe(currentRef);
        } else if (currentRef && !throttledResizeObserver) {
            // Fallback for when ResizeObserver is not available
            const updateDimensions = () => {
                const rect = currentRef.getBoundingClientRect();
                setDimensions({
                    width: rect.width,
                    height: rect.height,
                });
            };

            updateDimensions();
            window.addEventListener("resize", updateDimensions);

            return () => {
                window.removeEventListener("resize", updateDimensions);
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }
            };
        }

        return () => {
            if (currentRef && throttledResizeObserver) {
                throttledResizeObserver.unobserve(currentRef);
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [throttledResizeObserver]);

    // Memoize the pattern to prevent unnecessary re-renders
    const pattern = useMemo(
        () => (
            <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
                <path d={`M.5 ${height}V.5H${width}`} fill="none" strokeDasharray={strokeDasharray} />
            </pattern>
        ),
        [id, width, height, x, y, strokeDasharray]
    );

    // Use CSS transforms for better performance
    const squareElements = useMemo(
        () =>
            squares.map(({ pos: [posX, posY], id, animationDelay }, index) => (
                <motion.rect
                    initial={{ opacity: 0 }}
                    animate={{ opacity: maxOpacity }}
                    transition={{
                        duration,
                        repeat: 1,
                        delay: animationDelay,
                        repeatType: "reverse",
                    }}
                    onAnimationComplete={() => updateSquarePosition(id)}
                    key={`${posX}-${posY}-${index}`}
                    width={width - 1}
                    height={height - 1}
                    x={posX * width + 1}
                    y={posY * height + 1}
                    fill="currentColor"
                    strokeWidth="0"
                    style={{
                        // Use transform3d for hardware acceleration
                        transform: "translate3d(0, 0, 0)",
                        willChange: "opacity",
                    }}
                />
            )),
        [squares, maxOpacity, duration, updateSquarePosition, width, height]
    );

    return (
        <svg
            ref={containerRef}
            aria-hidden="true"
            className={cn(
                "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
                className
            )}
            style={{
                // Enable hardware acceleration
                transform: "translate3d(0, 0, 0)",
                willChange: "auto",
            }}
            {...props}
        >
            <defs>{pattern}</defs>
            <rect width="100%" height="100%" fill={`url(#${id})`} />
            <svg x={x} y={y} className="overflow-visible">
                {squareElements}
            </svg>
        </svg>
    );
}
