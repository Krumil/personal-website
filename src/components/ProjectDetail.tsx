"use client";

import { motion } from "motion/react";
import { X, Github, ExternalLink, Calendar, Users, Award } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

interface Project {
    id: string;
    name: string;
    description: string;
    category: "all" | "ai" | "web3" | "fullstack" | "tools";
    tags: string[];
    github?: string;
    demo?: string;
    image: string;
    className: string;
    featured?: boolean;
    status: "completed" | "in-progress" | "planned";
    impact?: string;
    year: string;
    longDescription?: string;
    technologies?: string[];
    features?: string[];
    challenges?: string[];
    outcomes?: string[];
    teamSize?: number;
}

interface ProjectDetailProps {
    project: Project;
    onClose: () => void;
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
    return (
        <>
            {/* Overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/80 z-40"
                onClick={onClose}
            />

            {/* Expanded Card */}
            <motion.div
                className="fixed z-50 p-4 md:p-8"
                style={{
                    left: "50%",
                    top: "5%",
                    transform: "translate(-50%, 0%)",
                }}
                onClick={onClose}
            >
                <motion.div
                    layoutId={`card-container-${project.id}`}
                    className="relative bg-card rounded-xl overflow-hidden w-full max-w-4xl h-full max-h-[90vh] overflow-y-auto shadow-2xl"
                    transition={{
                        type: "spring",
                        damping: 30,
                        stiffness: 300,
                        mass: 0.8,
                    }}
                    style={{
                        transformOrigin: "center center",
                        width: "90vw",
                        height: "90vh",
                        maxWidth: "1024px",
                        maxHeight: "800px",
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ delay: 0.5, duration: 0.2 }}
                        onClick={onClose}
                        className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
                    >
                        <X className="w-5 h-5" />
                    </motion.button>

                    {/* Hero Image Container */}
                    <motion.div
                        layoutId={`card-image-container-${project.id}`}
                        className="relative h-80 md:h-96 overflow-hidden"
                        transition={{
                            type: "spring",
                            damping: 30,
                            stiffness: 300,
                            mass: 0.8,
                        }}
                    >
                        <Image
                            src={project.image}
                            alt={project.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 1024px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Title Container */}
                        <motion.div
                            layoutId={`title-container-${project.id}`}
                            className="absolute bottom-6 left-6 text-white"
                            transition={{
                                type: "spring",
                                damping: 30,
                                stiffness: 300,
                                mass: 0.8,
                            }}
                        >
                            <span className="text-sm uppercase tracking-wide text-white/80 block">
                                {project.category}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-bold mt-2">{project.name}</h1>
                        </motion.div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.6,
                            duration: 0.5,
                            ease: "easeOut",
                        }}
                        className="p-6 md:p-8"
                    >
                        {/* Project Meta */}
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                <span>{project.year}</span>
                            </div>
                            {project.teamSize && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Users className="w-4 h-4" />
                                    <span>{project.teamSize} team members</span>
                                </div>
                            )}
                            {project.impact && (
                                <div className="flex items-center gap-2 text-secondary">
                                    <Award className="w-4 h-4" />
                                    <span>{project.impact}</span>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mb-8">
                            {project.demo && (
                                <Button asChild className="flex items-center gap-2">
                                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="w-4 h-4" />
                                        View Live Demo
                                    </a>
                                </Button>
                            )}
                            {project.github && (
                                <Button variant="outline" asChild className="flex items-center gap-2">
                                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                                        <Github className="w-4 h-4" />
                                        View Source
                                    </a>
                                </Button>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">About this project</h2>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                {project.longDescription || project.description}
                            </p>
                        </div>

                        {/* Technologies */}
                        {project.technologies && (
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Features */}
                        {project.features && (
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                                <ul className="space-y-2">
                                    {project.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0" />
                                            <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Challenges & Outcomes */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {project.challenges && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Challenges</h3>
                                    <ul className="space-y-2">
                                        {project.challenges.map((challenge, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0" />
                                                <span className="text-muted-foreground">{challenge}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {project.outcomes && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Outcomes</h3>
                                    <ul className="space-y-2">
                                        {project.outcomes.map((outcome, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                                <span className="text-muted-foreground">{outcome}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </>
    );
}
