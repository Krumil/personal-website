"use client";

import { motion } from "motion/react";

const experiences = [
    {
        role: "Senior Full-Stack Developer",
        company: "Tech Startup",
        period: "2023 - Present",
        description: "Leading development of AI-powered applications and Web3 integrations.",
        technologies: ["TypeScript", "React", "Node.js", "Solidity", "OpenAI"],
    },
    {
        role: "Blockchain Developer",
        company: "DeFi Protocol",
        period: "2022 - 2023",
        description: "Built smart contracts and frontend interfaces for decentralized finance applications.",
        technologies: ["Solidity", "Web3.js", "React", "Hardhat"],
    },
    {
        role: "Frontend Developer",
        company: "Digital Agency",
        period: "2021 - 2022",
        description: "Developed responsive web applications and optimized user experiences.",
        technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    },
];

export default function ExperiencePage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header Section */}
            <section className="pt-20 pb-12 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.21, 1.11, 0.81, 0.99],
                        }}
                        className="text-center mb-12"
                    >
                        <motion.h1
                            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.2,
                                ease: "easeOut",
                            }}
                        >
                            EXPERIENCE
                        </motion.h1>
                        <motion.p
                            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.4,
                                ease: "easeOut",
                            }}
                        >
                            My professional journey in technology and development.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Experience Timeline */}
            <section className="pb-20 px-4 md:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-8">
                        {experiences.map((experience, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.6 + index * 0.2,
                                    ease: "easeOut",
                                }}
                                className="relative pl-8 border-l-2 border-border"
                            >
                                <div className="absolute -left-2 top-2 w-4 h-4 bg-secondary rounded-full"></div>

                                <div className="bg-card p-6 rounded-lg shadow-lg">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                        <div>
                                            <h3 className="text-2xl font-bold text-foreground">{experience.role}</h3>
                                            <p className="text-lg text-secondary font-medium">{experience.company}</p>
                                        </div>
                                        <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full mt-2 md:mt-0">
                                            {experience.period}
                                        </span>
                                    </div>

                                    <p className="text-muted-foreground mb-4 leading-relaxed">
                                        {experience.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {experience.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 bg-secondary/20 text-secondary text-sm rounded-full"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
