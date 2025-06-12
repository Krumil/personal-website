"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Eye, Brain, Blocks, Code, Home } from "lucide-react";
import Link from "next/link";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { href: "/", label: "Home", icon: Home },
        { href: "/ai", label: "AI", icon: Brain },
        { href: "/blockchain", label: "Blockchain", icon: Blocks },
        { href: "/full-stack", label: "Full Stack", icon: Code },
    ];

    return (
        <motion.header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                scrolled ? "bg-black/80 backdrop-blur-md border-b border-zinc-800/50" : "bg-transparent"
            }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Brand */}
                    <motion.div
                        className="flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-white to-gray-400 rounded-lg flex items-center justify-center">
                                <Eye className="w-4 h-4 text-black" />
                            </div>
                            <span className="text-white font-bold text-lg">Simone Saletti</span>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <motion.div key={item.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href={item.href}
                                        className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-zinc-800/50 transition-all duration-200 group"
                                    >
                                        <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                        <span className="font-medium">{item.label}</span>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <motion.button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-zinc-800/50 transition-colors"
                            whileTap={{ scale: 0.95 }}
                        >
                            <AnimatePresence mode="wait">
                                {isMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: 0 }}
                                        animate={{ rotate: 90 }}
                                        exit={{ rotate: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X className="w-6 h-6" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90 }}
                                        animate={{ rotate: 0 }}
                                        exit={{ rotate: 90 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu className="w-6 h-6" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden bg-black/95 backdrop-blur-md border-t border-zinc-800/50"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {navItems.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-zinc-800/50 transition-all duration-200 group"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                            <span className="font-medium">{item.label}</span>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
