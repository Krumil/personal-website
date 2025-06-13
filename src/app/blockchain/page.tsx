"use client";

import React from "react";
import { motion } from "motion/react";
import { Blocks, ArrowLeft } from "lucide-react";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import Image from "next/image";

// Bento-grid layout classes for up to five cards
const bentoClasses = [
    "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
];

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
                            <Blocks className="w-5 h-5 text-foreground" />
                            <span className="text-foreground text-sm font-medium">Blockchain Projects</span>
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
                        <Blocks className="w-16 h-16 text-foreground mx-auto mb-6" />

                        <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                            Blockchain Projects
                        </h1>

                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                            Building decentralized applications with modern Web3 technologies. From DeFi dashboards to
                            smart contract integration and blockchain data visualization.
                        </p>

                        <div className="flex flex-wrap justify-center gap-3 mt-8">
                            {["Smart Contracts", "DeFi", "Web3", "Ethereum"].map((tag) => (
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
                                Web3 applications leveraging blockchain technology and smart contract integration.
                            </p>
                        </motion.div>

                        <BentoGrid className="lg:grid-rows-3">
                            {blockchainProjects.map((project, index) => (
                                <BentoCard
                                    key={project.title}
                                    Icon={Blocks}
                                    name={project.title}
                                    description={project.description}
                                    href="#"
                                    cta="Learn more"
                                    background={
                                        <Image
                                            src="/test.avif"
                                            alt="Next.js Logo"
                                            className="absolute -right-20 -top-20 opacity-60"
                                        />
                                    }
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
                            <h2 className="text-3xl font-bold text-foreground mb-4">Blockchain Skills</h2>
                            <p className="text-muted-foreground">
                                Technologies and frameworks for building decentralized applications.
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
