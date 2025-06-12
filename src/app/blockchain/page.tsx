"use client";

import React from "react";
import { motion } from "motion/react";
import { Blocks, ArrowLeft, TrendingUp, Wallet, BarChart3, Globe } from "lucide-react";

// Project card component
const ProjectCard = ({ title, description, tech }: { title: string; description: string; tech: string[] }) => (
    <motion.div
        className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-orange-500/50 transition-colors"
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
                    className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded border border-orange-500/30"
                >
                    {item}
                </span>
            ))}
        </div>
    </motion.div>
);

export default function BlockchainProjects() {
    const blockchainProjects = [
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
            title: "Farcaster FDV Frame",
            description: "Embeddable widget showing live FDV and stats for Farcaster.",
            tech: ["Next.js", "GraphQL/REST", "d3.js", "Chart.js"],
        },
        {
            title: "Synapse – StarkNet DeFi Dashboard",
            description:
                "AI-powered StarkNet dashboard with conversational assistant, yield farming, swaps, and token launchpad.",
            tech: ["Next.js", "LangChain", "StarkNet SDK", "AVNU", "DeFiLlama APIs"],
        },
    ];

    const skills = [
        "Ethereum & EVM chains",
        "Solidity smart contracts",
        "web3.js/ethers.js, web3.py",
        "DeFi, NFTs, ENS/Farcaster",
        "Alchemy/Infura APIs",
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
                            <Blocks className="w-5 h-5 text-white" />
                            <span className="text-white text-sm font-medium">Blockchain Projects</span>
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
                        <Blocks className="w-16 h-16 text-white mx-auto mb-6" />

                        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">Blockchain Projects</h1>

                        <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
                            Building decentralized applications with modern Web3 technologies. From DeFi dashboards to
                            smart contract integration and blockchain data visualization.
                        </p>

                        <div className="flex flex-wrap justify-center gap-3 mt-8">
                            {["Smart Contracts", "DeFi", "Web3", "Ethereum"].map((tag, index) => (
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
                                Web3 applications leveraging blockchain technology and smart contract integration.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {blockchainProjects.map((project, index) => (
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
                            <h2 className="text-3xl font-bold text-white mb-4">Blockchain Skills</h2>
                            <p className="text-gray-400">
                                Technologies and frameworks for building decentralized applications.
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
                                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
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
