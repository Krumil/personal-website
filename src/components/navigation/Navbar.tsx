"use client";
import Image from "next/image";
import * as React from "react";
import { Github, Mail, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

type RouteHref = "/" | "/about" | "/contact" | "/ai" | "/blockchain" | "/fullstack";

interface NavigationItem {
    name: string;
    href: RouteHref;
}

const getNavigationItems = (t: (key: string) => string): NavigationItem[] => [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
    { name: t("ai"), href: "/ai" },
    { name: t("blockchain"), href: "/blockchain" },
    { name: t("fullstack"), href: "/fullstack" },
];

const socialLinks = [
    { name: "GitHub", href: "https://github.com/Krumil", icon: Github },
    { name: "Email", href: "mailto:krumil018@gmail.com", icon: Mail },
];

export default function Navbar() {
    const t = useTranslations("navigation");
    const [isOpen, setIsOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);
    const navigation = getNavigationItems(t);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && !(event.target as Element).closest(".mobile-nav-container")) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("click", handleClickOutside);
            document.body.style.overflow = "hidden"; // Prevent background scroll
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <>
            <nav
                className={`fixed top-0 z-50 w-full transition-all duration-300 ${
                    scrolled ? "bg-background/80 border-b shadow-sm" : "bg-transparent"
                }`}
            >
                <div className="flex h-16 font-mono items-center justify-between px-4 container mx-auto">
                    {/* Logo/Name with improved mobile display */}
                    <Link href="/" className="group flex items-center space-x-3" onClick={() => setIsOpen(false)}>
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-110">
                            <Image
                                src="/pfp.png"
                                alt="Simone Saletti"
                                className="w-full h-full object-cover rounded-xl"
                                width={40}
                                height={40}
                            />
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </div>
                        <div className="flex flex-col">
                            {/* Full name on desktop */}
                            <span className="hidden sm:block text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                Simone Saletti
                            </span>
                            <div className="hidden sm:block text-xs text-muted-foreground">@Krumil</div>

                            {/* Compact name on mobile */}
                            <span className="sm:hidden text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                Simone
                            </span>
                            <div className="sm:hidden text-xs text-muted-foreground">@Krumil</div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-primary group"
                            >
                                {item.name}
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                            </Link>
                        ))}

                        <div className="mx-4 h-6 w-px bg-border" />

                        <LanguageSwitcher variant="minimal" className="mr-3" />

                        <Button
                            asChild
                            size="sm"
                            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 hover:shadow-lg"
                        >
                            <Link href="/contact">{t("getInTouch")}</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden mobile-nav-container">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(!isOpen)}
                            className="relative h-11 w-11 hover:bg-accent/50 transition-all duration-200"
                        >
                            <div className="relative h-6 w-6">
                                <Menu
                                    className={`absolute h-6 w-6 transition-all duration-300 ease-in-out ${
                                        isOpen ? "rotate-90 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"
                                    }`}
                                />
                                <X
                                    className={`absolute h-6 w-6 transition-all duration-300 ease-in-out ${
                                        isOpen ? "rotate-0 opacity-100 scale-100" : "-rotate-90 opacity-0 scale-50"
                                    }`}
                                />
                            </div>
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Dropdown */}
            <div
                className={`fixed top-16 left-0 right-0 z-40 md:hidden transition-all duration-300 ease-in-out mobile-nav-container ${
                    isOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-4 pointer-events-none"
                }`}
            >
                <div className="bg-transparent">
                    <div className="container mx-auto px-4 py-6 font-mono">
                        {/* Navigation Links */}
                        <div className="space-y-1 mb-6">
                            {navigation.map((item, index) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center px-4 py-4 text-base font-medium transition-all duration-300 hover:text-primary hover:bg-accent/50 rounded-lg transform ${
                                        isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                                    }`}
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        transitionDelay: `${index * 50}ms`,
                                    }}
                                >
                                    <span className="relative group">
                                        {item.name}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full" />
                                    </span>
                                </Link>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-border mb-6" />

                        {/* Social Links and CTA */}
                        <div className="space-y-6">
                            {/* Language Switcher */}
                            <div className="flex justify-center">
                                <LanguageSwitcher variant="default" />
                            </div>

                            {/* Social Links */}
                            <div>
                                <div className="flex justify-center space-x-4">
                                    {socialLinks.map((social) => {
                                        const Icon = social.icon;
                                        return (
                                            <Button
                                                key={social.name}
                                                variant="ghost"
                                                size="icon"
                                                asChild
                                                className="h-12 w-12 hover:scale-105 hover:bg-accent/50 transition-all duration-200"
                                            >
                                                <a href={social.href} target="_blank" rel="noopener noreferrer">
                                                    <Icon className="h-6 w-6" />
                                                    <span className="sr-only">{social.name}</span>
                                                </a>
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Mobile CTA */}
                            <div className="px-4">
                                <Button
                                    asChild
                                    className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200 text-base font-medium"
                                >
                                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                                        {t("getInTouch")}
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 z-30 bg-background md:hidden transition-opacity duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setIsOpen(false)}
            />
        </>
    );
}
