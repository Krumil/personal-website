"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X, Home, User, Briefcase, Mail, Code, Award } from "lucide-react";

export interface NavItem {
    id: string;
    name: string;
    href: string;
    icon: React.ReactElement;
}

export const navItems: NavItem[] = [
    {
        id: "home",
        name: "Home",
        href: "#home",
        icon: <Home className="h-4 w-4" />,
    },
    {
        id: "about",
        name: "About",
        href: "#about",
        icon: <User className="h-4 w-4" />,
    },
    {
        id: "projects",
        name: "Projects",
        href: "#projects",
        icon: <Code className="h-4 w-4" />,
    },
    {
        id: "experience",
        name: "Experience",
        href: "#experience",
        icon: <Briefcase className="h-4 w-4" />,
    },
    {
        id: "skills",
        name: "Skills",
        href: "#skills",
        icon: <Award className="h-4 w-4" />,
    },
    {
        id: "contact",
        name: "Contact",
        href: "#contact",
        icon: <Mail className="h-4 w-4" />,
    },
];

interface PortfolioNavbarProps {
    navItemsProp?: NavItem[];
    className?: string;
}

const PortfolioNavbar: React.FC<PortfolioNavbarProps> = ({ navItemsProp, className = "" }) => {
    const items = navItemsProp ?? navItems;

    const { scrollYProgress } = useScroll();
    const [visible, setVisible] = useState(true);
    const [activeSection, setActiveSection] = useState("home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    // Handle navbar visibility on scroll
    useMotionValueEvent(scrollYProgress, "change", (current) => {
        if (typeof current === "number") {
            const direction = current - (scrollYProgress.getPrevious() || 0);

            if (scrollYProgress.get() < 0.05) {
                setVisible(true);
            } else {
                setVisible(direction < 0);
            }
        }
    });

    // Handle active section highlighting
    useEffect(() => {
        const handleScroll = () => {
            const sections = items.map((item) => item.id);
            const scrollPosition = window.scrollY + 100;

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [items]);

    // Smooth scroll to section
    const scrollToSection = (href: string) => {
        const sectionId = href.replace("#", "");
        const element = document.getElementById(sectionId);

        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }

        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <AnimatePresence mode="wait">
                <motion.nav
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`fixed top-0 left-0 right-0 z-50 ${className}`}
                >
                    <div className="bg-background/80 backdrop-blur-md border-b border-border shadow-lg">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">
                                {/* Logo */}
                                <motion.div
                                    className="flex-shrink-0"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <a
                                        href="#home"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection("#home");
                                        }}
                                        className="text-xl font-bold text-foreground hover:text-primary transition-colors"
                                    >
                                        Portfolio
                                    </a>
                                </motion.div>

                                {/* Desktop Navigation */}
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-1">
                                        {items.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                className="relative"
                                                onMouseEnter={() => setHoveredItem(item.id)}
                                                onMouseLeave={() => setHoveredItem(null)}
                                            >
                                                <a
                                                    href={item.href}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        scrollToSection(item.href);
                                                    }}
                                                    className={`
                            relative flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                            ${
                                activeSection === item.id
                                    ? "text-primary bg-primary/10"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            }
                          `}
                                                >
                                                    <span className="hidden lg:block">{item.icon}</span>
                                                    <span>{item.name}</span>
                                                </a>

                                                {/* Hover indicator */}
                                                {hoveredItem === item.id && activeSection !== item.id && (
                                                    <motion.div
                                                        layoutId="navbar-hover"
                                                        className="absolute inset-0 bg-muted rounded-md -z-10"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.15 }}
                                                    />
                                                )}

                                                {/* Active indicator */}
                                                {activeSection === item.id && (
                                                    <motion.div
                                                        layoutId="navbar-active"
                                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.2 }}
                                                    />
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Mobile menu button */}
                                <div className="md:hidden">
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                        className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                                    >
                                        <span className="sr-only">Open main menu</span>
                                        {isMobileMenuOpen ? (
                                            <X className="block h-6 w-6" />
                                        ) : (
                                            <Menu className="block h-6 w-6" />
                                        )}
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Navigation Menu */}
                        <AnimatePresence>
                            {isMobileMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="md:hidden bg-background/95 backdrop-blur-md border-t border-border"
                                >
                                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                        {items.map((item, index) => (
                                            <motion.a
                                                key={item.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                href={item.href}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    scrollToSection(item.href);
                                                }}
                                                className={`
                          flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-all duration-200
                          ${
                              activeSection === item.id
                                  ? "text-primary bg-primary/10 border-l-4 border-primary"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          }
                        `}
                                            >
                                                {item.icon}
                                                <span>{item.name}</span>
                                            </motion.a>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.nav>
            </AnimatePresence>
        </>
    );
};

export default PortfolioNavbar;
