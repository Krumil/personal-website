"use client";

import React from "react";
import { motion } from "motion/react";
import { Brain, ArrowLeft } from "lucide-react";

// Project card component
const ProjectCard = ({ title, description, tech }: { title: string; description: string; tech: string[] }) => (
    <motion.div
        className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-blue-500/50 transition-colors"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -2 }}
    >
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">{description}</p>

        <div className="flex flex-wrap gap-2">
            {tech.map((item, index) => (
                <span
                    key={index}
                    className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded border border-blue-500/30"
                >
                    {item}
                </span>
            ))}
        </div>
    </motion.div>
);

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
        <div className="min-h-screen bg-black">
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
                            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back</span>
                        </button>

                        <div className="flex items-center space-x-2 px-4 py-2 bg-zinc-900/50 backdrop-blur-sm rounded-full border border-zinc-800">
                            <Brain className="w-5 h-5 text-white" />
                            <span className="text-white text-sm font-medium">AI Projects</span>
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
                        <Brain className="w-16 h-16 text-white mx-auto mb-6" />

                        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">AI Projects</h1>

                        <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
                            Building intelligent systems with AI/ML integrations, LangChain, and modern frameworks. From
                            autonomous agents to conversational assistants.
                        </p>

                        <div className="flex flex-wrap justify-center gap-3 mt-8">
                            {["LangChain", "OpenAI GPT-4", "Vector Search", "AI Agents"].map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-zinc-900/50 text-gray-300 rounded-full border border-zinc-700 text-sm"
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
                            <h2 className="text-3xl font-bold text-white mb-4">Featured Projects</h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                AI-powered applications leveraging modern machine learning and natural language
                                processing.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {aiProjects.map((project, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <ProjectCard {...project} />
                                </motion.div>
                            ))}
                        </div>
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
                            <h2 className="text-3xl font-bold text-white mb-4">AI/ML Skills</h2>
                            <p className="text-gray-400">
                                Technologies and frameworks for building intelligent applications.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-center space-x-3 p-4 bg-gray-900/30 rounded-lg border border-gray-700"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span className="text-gray-300">{skill}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
