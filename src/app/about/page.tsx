"use client";

import { motion } from "motion/react";

export default function AboutPage() {
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
                                ease: "easeOut"
                            }}
                        >
                            ABOUT ME
                        </motion.h1>
                        <motion.p 
                            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                                duration: 0.6,
                                delay: 0.4,
                                ease: "easeOut"
                            }}
                        >
                            Building the future with AI and Web3 technologies.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="pb-20 px-4 md:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="prose prose-lg max-w-none text-foreground"
                    >
                        <p className="text-xl leading-relaxed mb-8">
                            I'm a passionate developer focused on creating meaningful technology that solves real-world problems. 
                            My work spans across artificial intelligence, Web3 applications, and modern development tools.
                        </p>
                        
                        <p className="text-lg leading-relaxed mb-8 text-muted-foreground">
                            With expertise in both cutting-edge AI systems and decentralized technologies, I bridge the gap 
                            between complex technical concepts and practical applications that users can understand and benefit from.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 mt-12">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">What I Do</h3>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li>• AI & Machine Learning Systems</li>
                                    <li>• Web3 & Blockchain Applications</li>
                                    <li>• Full-Stack Development</li>
                                    <li>• Developer Tools & Automation</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Technologies</h3>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li>• TypeScript, React, Next.js</li>
                                    <li>• Python, Node.js</li>
                                    <li>• Solidity, Web3.js</li>
                                    <li>• TensorFlow, OpenAI APIs</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}