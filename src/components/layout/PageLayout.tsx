"use client";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { TransitionLink } from "../navigation/TransitionLink";

interface PageLayoutProps {
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    children: React.ReactNode;
}

export default function PageLayout({
    title,
    subtitle,
    description,
    tags,
    children,
}: PageLayoutProps) {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
                <div className="max-w-6xl mx-auto px-8 py-6">
                    <div className="flex justify-between items-center">
                        <TransitionLink href="/" className="text-2xl font-bold">
                            SIMO
                        </TransitionLink>
                        <TransitionLink href="/">
                            <Button
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-black bg-transparent"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                BACK TO HOME
                            </Button>
                        </TransitionLink>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16">
                        <div className="text-sm tracking-widest text-white/60 mb-8">{subtitle}</div>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none mb-8">{title}</h1>
                        <div className="max-w-2xl">
                            <p className="text-xl text-white/80 leading-relaxed mb-8">{description}</p>
                            <div className="flex flex-wrap gap-3">
                                {tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-4 py-2 bg-white/10 text-white/80 rounded-full border border-white/20 text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            {children}

            {/* Footer */}
            <footer className="py-8 px-8 border-t border-white/10">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-white/40">© 2024 SIMO — BUILDING THE FUTURE</div>
                        <div className="text-sm text-white/40">AVAILABLE FOR NEW PROJECTS</div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
