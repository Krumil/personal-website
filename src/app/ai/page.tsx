"use client";

import React from "react";
import { motion } from "motion/react";
import { Brain, ArrowLeft } from "lucide-react";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";

// Bento-grid layout classes for up to five cards
const bentoClasses = [
    "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
];

export default function AIProjects() {
    const aiProjects = [
        {
            title: "Blockchain Agent",
            description:
                "Autonomous agent that interprets user goals and performs on-chain queries/transactions via LLM reasoning.",
            tech: ["LangChain", "Python", "Node.js", "OpenAI API", "web3.py", "ethers.js"],
        },
        {
            title: "FactFinder (AI Fact-Checking Assistant)",
            description: "Chat app & server that deliver evidence-backed answers to combat misinformation.",
            tech: ["Next.js", "Node.js", "TypeScript", "OpenAI GPT-4", "Vector Search"],
        },
        {
            title: "Prompt Caching Dashboard",
            description: "Internal tool caching LLM prompts/responses with a searchable dashboard to reduce costs.",
            tech: ["FastAPI", "Node.js", "Redis", "PostgreSQL", "React", "Tailwind"],
        },
        {
            title: "Sentient Satoshis",
            description:
                "Simulation of GPT-powered 'satoshi' agents analyzing crypto markets and interacting socially.",
            tech: ["Python", "OpenAI GPT-3.5/4", "Web3 APIs"],
        },
        {
            title: "Synapse – StarkNet DeFi Dashboard",
            description:
                "AI-powered StarkNet dashboard with conversational assistant, yield farming, swaps, and token launchpad.",
            tech: ["Next.js", "LangChain", "StarkNet SDK", "AVNU", "DeFiLlama APIs"],
        },
    ];

    const skills = [
        "OpenAI GPT-4 integration",
        "LangChain",
        "Prompt engineering",
        "PyTorch & scikit-learn",
        "Data analysis with Pandas & NumPy",
    ];

    return (
        <div className="min-h-screen bg-transparent">
            <div className="relative z-10">
                {/* Header */}
                <header className="px-8 py-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between"
                    >
                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back</span>
                        </button>

                        <div className="flex items-center space-x-2 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-full border border-border">
                            <Brain className="w-5 h-5 text-foreground" />
                            <span className="text-foreground text-sm font-medium">AI Projects</span>
                        </div>
                    </motion.div>
                </header>

                {/* Hero Section */}
                <section className="px-8 py-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto space-y-6"
                    >
                        <Brain className="w-16 h-16 text-foreground mx-auto mb-6" />

                        <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">AI Projects</h1>

                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                            Building intelligent systems with AI/ML integrations, LangChain, and modern frameworks. From
                            autonomous agents to conversational assistants.
                        </p>

                        <div className="flex flex-wrap justify-center gap-3 mt-8">
                            {["LangChain", "OpenAI GPT-4", "Vector Search", "AI Agents"].map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-card/50 text-muted-foreground rounded-full border border-border text-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Projects Section */}
                <section className="px-8 py-16">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Projects</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                AI-powered applications leveraging modern machine learning and natural language
                                processing.
                            </p>
                        </motion.div>

                        <BentoGrid className="lg:grid-rows-3">
                            {aiProjects.map((project, index) => (
                                <BentoCard
                                    key={project.title}
                                    Icon={Brain}
                                    name={project.title}
                                    description={project.description}
                                    href="#"
                                    cta="Learn more"
                                    background={<img className="absolute -right-20 -top-20 opacity-60" />}
                                    className={bentoClasses[index] ?? ""}
                                />
                            ))}
                        </BentoGrid>
                    </div>
                </section>

                {/* Skills Section */}
                <section className="px-8 py-16">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl font-bold text-foreground mb-4">AI/ML Skills</h2>
                            <p className="text-muted-foreground">
                                Technologies and frameworks for building intelligent applications.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-center space-x-3 p-4 bg-card/30 rounded-lg border border-border"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                    <span className="text-muted-foreground">{skill}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
