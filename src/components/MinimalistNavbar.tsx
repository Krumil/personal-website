"use client";

import Link from "next/link";
import * as React from "react";
import { Github, Mail, Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { ThemeToggle } from "./theme-toggle";

const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Experience", href: "/experience" },
    { name: "Contact", href: "/contact" },
];

const socialLinks = [
    { name: "GitHub", href: "https://github.com", icon: Github },
    { name: "Email", href: "mailto:hello@example.com", icon: Mail },
];

export default function MinimalistNavbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${
                scrolled ? "bg-background/80 backdrop-blur-md border-b shadow-sm" : "bg-transparent"
            }`}
        >
            <div className="container flex h-16 items-center justify-between px-4 mx-auto">
                {/* Logo/Name with animation */}
                <Link href="/" className="group flex items-center space-x-3">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <Image
                            src="/pfp.png"
                            alt="Simone Saletti"
                            className="w-full h-full object-cover rounded-xl"
                            width={40}
                            height={40}
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                    <div className="hidden sm:block">
                        <span className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Simone Saletti
                        </span>
                        <div className="text-xs text-muted-foreground">aka Krumil</div>
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

                    <ThemeToggle />

                    <Button
                        asChild
                        size="sm"
                        className="ml-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                        <Link href="/contact">Get In Touch</Link>
                    </Button>
                </div>

                {/* Mobile Navigation */}
                <div className="flex items-center space-x-2 md:hidden">
                    <ThemeToggle />
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative">
                                <Menu
                                    className={`h-5 w-5 transition-all duration-300 ${
                                        isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                                    }`}
                                />
                                <X
                                    className={`absolute h-5 w-5 transition-all duration-300 ${
                                        isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                                    }`}
                                />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background/95 backdrop-blur-md">
                            <div className="flex flex-col space-y-6 mt-8">
                                {/* Mobile Header */}
                                <div className="flex items-center space-x-3 pb-6 border-b">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                                        <span className="font-bold">SIMO</span>
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg">Simone Saletti</div>
                                        <div className="text-sm text-muted-foreground">Full Stack Developer</div>
                                    </div>
                                </div>

                                {/* Mobile Navigation Links */}
                                <div className="space-y-2">
                                    {navigation.map((item, index) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="block px-4 py-3 text-lg font-medium transition-all duration-300 hover:text-primary hover:bg-accent/50 rounded-lg"
                                            onClick={() => setIsOpen(false)}
                                            style={{
                                                animationDelay: `${index * 100}ms`,
                                                animation: isOpen ? "slideInRight 0.3s ease-out forwards" : "none",
                                            }}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>

                                {/* Social Links */}
                                <div className="pt-4 border-t">
                                    <div className="text-sm font-medium text-muted-foreground mb-3">Connect</div>
                                    <div className="flex space-x-3">
                                        {socialLinks.map((social) => {
                                            const Icon = social.icon;
                                            return (
                                                <Button
                                                    key={social.name}
                                                    variant="ghost"
                                                    size="icon"
                                                    asChild
                                                    className="hover:scale-110 transition-transform duration-300"
                                                >
                                                    <Link href={social.href} target="_blank" rel="noopener noreferrer">
                                                        <Icon className="h-5 w-5" />
                                                        <span className="sr-only">{social.name}</span>
                                                    </Link>
                                                </Button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Mobile CTA */}
                                <div className="pt-4">
                                    <Button
                                        asChild
                                        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
                                    >
                                        <Link href="/contact" onClick={() => setIsOpen(false)}>
                                            Get In Touch
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            <style jsx>{`
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </nav>
    );
}
