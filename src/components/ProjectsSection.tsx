"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { TransitionLink } from "./TransitionLink";

const projects = [
    {
        number: "01",
        title: "MetaFlags",
        description: "Decentralized feature flag management on-chain",
        impact: "100% decentralized",
        year: "2024",
        href: "/projects",
    },
    {
        number: "02",
        title: "FactFinder AI",
        description: "Enterprise fact-checking with 99.2% accuracy rate",
        impact: "Verified 1M+ claims",
        year: "2024",
        href: "/ai",
    },
    {
        number: "03",
        title: "Wayfinder Dashboard",
        description: "DeFi analytics platform managing $2M+ in assets",
        impact: "$2M+ tracked",
        year: "2023",
        href: "/blockchain",
    },
    {
        number: "04",
        title: "Prompt Optimizer",
        description: "AI cost reduction system saving 60% on LLM expenses",
        impact: "60% cost savings",
        year: "2023",
        href: "/fullstack",
    },
];

export default function ProjectsSection() {
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);

    return (
        <section id="work" className="py-20 px-8 bg-muted/80 text-foreground">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-4">SELECTED WORK</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl">
                            Real-world applications combining AI intelligence with Web3 technology
                        </p>
                    </div>
                    <div className="mt-6 md:mt-0">
                        <TransitionLink 
                            href="/projects" 
                            className="inline-flex items-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors font-medium"
                        >
                            View All Projects
                            <ArrowUpRight className="w-4 h-4 ml-2" />
                        </TransitionLink>
                    </div>
                </div>

                <div className="space-y-0">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="group border-t border-border/20 last:border-b"
                            onMouseEnter={() => setHoveredProject(index)}
                            onMouseLeave={() => setHoveredProject(null)}
                        >
                            <TransitionLink href={project.href} className="block py-8 cursor-pointer">
                                <div className="grid grid-cols-12 gap-8 items-center">
                                    <div className="col-span-1">
                                        <div className="text-sm text-muted-foreground font-mono">{project.number}</div>
                                    </div>
                                    <div className="col-span-6 md:col-span-5">
                                        <h3 className="text-2xl md:text-3xl font-bold group-hover:text-secondary transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-muted-foreground mt-2">{project.description}</p>
                                    </div>
                                    <div className="hidden md:block col-span-3 md:col-span-2">
                                        <div className="text-sm text-muted-foreground mb-1">IMPACT</div>
                                        <div className="font-bold">{project.impact}</div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="text-sm text-muted-foreground font-mono">{project.year}</div>
                                    </div>
                                    <div className="col-span-1">
                                        <ArrowUpRight
                                            className={`w-6 h-6 transition-transform ${
                                                hoveredProject === index ? "translate-x-1 -translate-y-1" : ""
                                            }`}
                                        />
                                    </div>
                                </div>
                            </TransitionLink>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
