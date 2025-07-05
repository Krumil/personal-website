"use client";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Github, Mail, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Experience", href: "/experience" },
];

const socialLinks = [
    { name: "GitHub", href: "https://github.com", icon: Github },
    { name: "Email", href: "mailto:hello@example.com", icon: Mail },
];

export default function Navbar() {
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
            <div className="container flex h-16 font-mono items-center justify-between px-4 mx-auto">
                {/* Logo/Name with improved mobile display */}
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
                    <div className="flex flex-col">
                        {/* Full name on desktop */}
                        <span className="hidden sm:block text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Simone Saletti
                        </span>
                        <div className="hidden sm:block text-xs text-muted-foreground">aka Krumil</div>

                        {/* Compact name on mobile */}
                        <span className="sm:hidden text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Simone
                        </span>
                        <div className="sm:hidden text-xs text-muted-foreground">Developer</div>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex md:items-center md:space-x-1">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="relative px-4 py-2 text-xl font-medium transition-all duration-300 hover:text-primary group"
                        >
                            {item.name}
                            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                        </Link>
                    ))}

                    <div className="mx-4 h-6 w-px bg-border" />

                    <Button
                        asChild
                        size="sm"
                        className="ml-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                        <Link href="/contact">Get In Touch</Link>
                    </Button>
                </div>

                {/* Mobile Navigation with improved UX */}
                <div className="flex items-center space-x-2 md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative h-11 w-11 hover:bg-accent/50 transition-colors duration-200"
                            >
                                <div className="relative h-6 w-6">
                                    <Menu
                                        className={`absolute h-6 w-6 transition-all duration-200 ease-in-out ${
                                            isOpen ? "rotate-45 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"
                                        }`}
                                    />
                                    <X
                                        className={`absolute h-6 w-6 transition-all duration-200 ease-in-out ${
                                            isOpen ? "rotate-0 opacity-100 scale-100" : "-rotate-45 opacity-0 scale-50"
                                        }`}
                                    />
                                </div>
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="font-mono w-[280px] xs:w-[320px] sm:w-[380px] bg-background/95 backdrop-blur-lg border-l"
                        >
                            <div className="flex flex-col h-full">
                                {/* Mobile Navigation Links with better touch targets */}
                                <div className="flex-1 py-6">
                                    <div className="space-y-1">
                                        {navigation.map((item, index) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={`flex items-center px-4 py-4 text-base font-medium transition-all duration-200 hover:text-primary hover:bg-accent/50 rounded-lg transform ${
                                                    isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                                                }`}
                                                onClick={() => setIsOpen(false)}
                                                style={{
                                                    transitionDelay: `${index * 50}ms`,
                                                }}
                                            >
                                                <span className="relative">
                                                    {item.name}
                                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full" />
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom section with social links and CTA */}
                                <div className="space-y-4 py-4 border-t">
                                    {/* Social Links */}
                                    <div>
                                        <div className="text-sm font-medium text-muted-foreground mb-3 px-4">
                                            Connect
                                        </div>
                                        <div className="flex space-x-2 px-4">
                                            {socialLinks.map((social) => {
                                                const Icon = social.icon;
                                                return (
                                                    <Button
                                                        key={social.name}
                                                        variant="ghost"
                                                        size="icon"
                                                        asChild
                                                        className="h-11 w-11 hover:scale-105 hover:bg-accent/50 transition-all duration-200"
                                                    >
                                                        <Link
                                                            href={social.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <Icon className="h-5 w-5" />
                                                            <span className="sr-only">{social.name}</span>
                                                        </Link>
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
                                                Get In Touch
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
