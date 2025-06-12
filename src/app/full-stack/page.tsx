"use client";

import React from "react";
import { motion } from "motion/react";
import { Code, ArrowLeft, Globe, Server, Database, Zap } from "lucide-react";

// Project card component
const ProjectCard = ({ title, description, tech }: { title: string; description: string; tech: string[] }) => (
    <motion.div
        className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-green-500/50 transition-colors"
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
                    className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded border border-green-500/30"
                >
                    {item}
                </span>
            ))}
        </div>
    </motion.div>
);

export default function FullStackProjects() {
    const fullStackProjects = [
        {
            title: "Wayfinder Staking Dashboard",
            description:
                "Modern dashboard to monitor Wayfinder Protocol staking data, with ENS resolution, leaderboards, and wallet insights.",
            tech: ["Next.js 13", "TypeScript", "Tailwind CSS", "Node.js", "ethers.js", "Vercel"],
        },
        {
            title: "Henlo Kart Dashboard & DataSync",
            description:
                "Web dashboard + data pipeline visualizing AI-powered racing game stats and blockchain assets.",
            tech: ["React/Next.js", "Tailwind", "Node.js/Express", "Ethereum", "Base chain"],
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
            title: "Xpensify – Expense Tracker",
            description: "Personal finance web app for tracking expenses, budgets, and goals.",
            tech: ["React", "Tailwind", "Node.js/Express", "PostgreSQL"],
        },
        {
            title: "Farcaster FDV Frame",
            description: "Embeddable widget showing live FDV and stats for Farcaster.",
            tech: ["Next.js", "GraphQL/REST", "d3.js", "Chart.js"],
        },
    ];

    const frontendSkills = [
        "HTML5, CSS3, JavaScript (ES6+) & TypeScript",
        "React / Next.js (13+)",
        "Tailwind CSS & Chakra UI",
        "Redux & Zustand",
        "Responsive & a11y best practices",
    ];

    const backendSkills = [
        "Node.js (Express, NestJS)",
        "Python (Flask, FastAPI)",
        "REST & GraphQL",
        "JWT/OAuth auth",
        "PostgreSQL & MongoDB",
        "WebSockets",
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
                            <Code className="w-5 h-5 text-white" />
                            <span className="text-white text-sm font-medium">Full Stack Projects</span>
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
                        <Code className="w-16 h-16 text-white mx-auto mb-6" />

                        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">Full Stack Projects</h1>

                        <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
                            End-to-end web applications with modern React/Next.js frontends and robust Node.js backends.
                            Building complete systems from intuitive UIs to scalable server architectures.
                        </p>

                        <div className="flex flex-wrap justify-center gap-3 mt-8">
                            {["React/Next.js", "Node.js", "TypeScript", "PostgreSQL"].map((tag, index) => (
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
                                Complete web applications built with modern full-stack technologies and best practices.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {fullStackProjects.map((project, index) => (
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
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl font-bold text-white mb-4">Full Stack Skills</h2>
                            <p className="text-gray-400">
                                Frontend and backend technologies for building complete web applications.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Frontend Skills */}
                            <div>
                                <div className="flex items-center space-x-3 mb-6">
                                    <Globe className="w-6 h-6 text-green-500" />
                                    <h3 className="text-xl font-semibold text-white">Frontend</h3>
                                </div>
                                <div className="space-y-3">
                                    {frontendSkills.map((skill, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-center space-x-3 p-3 bg-gray-900/30 rounded-lg border border-gray-700"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-gray-300 text-sm">{skill}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Backend Skills */}
                            <div>
                                <div className="flex items-center space-x-3 mb-6">
                                    <Server className="w-6 h-6 text-blue-500" />
                                    <h3 className="text-xl font-semibold text-white">Backend</h3>
                                </div>
                                <div className="space-y-3">
                                    {backendSkills.map((skill, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-center space-x-3 p-3 bg-gray-900/30 rounded-lg border border-gray-700"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <span className="text-gray-300 text-sm">{skill}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
