"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const AnimatedNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const defaultTextColor = "text-gray-300";
    const hoverTextColor = "text-white";
    const textSizeClass = "text-sm";
    const textFontClass = "font-technor";

    return (
        <a href={href} className={cn("group relative overflow-hidden h-5 flex", textSizeClass)}>
            <div className="flex flex-col transition-transform duration-400 ease-out transform group-hover:-translate-y-full">
                <span className={cn(defaultTextColor, textFontClass)}>{children}</span>
                <span className={cn(hoverTextColor, textFontClass)}>{children}</span>
            </div>
        </a>
    );
};

const MiniNavbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [headerShapeClass, setHeaderShapeClass] = useState("rounded-full");
    const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    useEffect(() => {
        if (shapeTimeoutRef.current) {
            clearTimeout(shapeTimeoutRef.current);
        }

        if (isOpen) {
            setHeaderShapeClass("rounded-xl");
        } else {
            shapeTimeoutRef.current = setTimeout(() => setHeaderShapeClass("rounded-full"), 300);
        }

        return () => {
            if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current);
        };
    }, [isOpen]);

    const navLinksData = [
        { label: "Home", href: "/" },
        { label: "AI", href: "/ai" },
        { label: "Blockchain", href: "/blockchain" },
        { label: "Full Stack", href: "/fullstack" },
    ];

    return (
        <header
            className={cn(
                `fixed top-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center
         pl-6 pr-6 py-3 backdrop-blur-sm border border-[#333] bg-[#1f1f1f57]
         w-[calc(100%-2rem)] sm:w-auto`,
                headerShapeClass
            )}
        >
            <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-8">
                {/* Desktop nav */}
                <nav className="hidden sm:flex items-center space-x-4 sm:space-x-6 text-sm">
                    {navLinksData.map((link) => (
                        <AnimatedNavLink key={link.href} href={link.href}>
                            {link.label}
                        </AnimatedNavLink>
                    ))}
                </nav>

                {/* Burger icon for mobile */}
                <button
                    className="sm:hidden flex items-center justify-center w-8 h-8 text-gray-300 focus:outline-none"
                    onClick={toggleMenu}
                    aria-label={isOpen ? "Close Menu" : "Open Menu"}
                >
                    {isOpen ? (
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile dropdown */}
            <div
                className={cn(
                    "sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden",
                    isOpen ? "max-h-[1000px] opacity-100 pt-4" : "max-h-0 opacity-0 pt-0 pointer-events-none"
                )}
            >
                <nav className="flex flex-col items-center space-y-4 text-base w-full">
                    {navLinksData.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-gray-300 hover:text-white transition-colors w-full text-center"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default MiniNavbar;
