"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { Github, ExternalLink, Code, Zap, Shield, Blocks } from "lucide-react";

import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ProjectDetail from "@/components/common/ProjectDetail";

type ProjectCategory = "all" | "ai" | "web3" | "fullstack" | "tools";

interface Project {
    id: string;
    name: string;
    description: string;
    category: ProjectCategory;
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

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [apiLoading, setApiLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setApiLoading(true);
                setError(null);
                
                const response = await fetch("/api/projects");
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch projects: ${response.status}`);
                }

                const data = await response.json();
                
                if (data.success && Array.isArray(data.data)) {
                    setProjects(data.data);
                } else {
                    throw new Error("Invalid response format");
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setApiLoading(false);
            }
        };

        fetchProjects();
    }, []);
    
    const categories = [
        { id: "all" as const, name: "All Projects", icon: Blocks, count: projects.length },
        { id: "ai" as const, name: "AI & ML", icon: Zap, count: projects.filter((p) => p.category === "ai").length },
        {
            id: "web3" as const,
            name: "Web3",
            icon: Shield,
            count: projects.filter((p) => p.category === "web3").length,
        },
        {
            id: "fullstack" as const,
            name: "Full Stack",
            icon: Code,
            count: projects.filter((p) => p.category === "fullstack").length,
        },
        {
            id: "tools" as const,
            name: "Dev Tools",
            icon: Code,
            count: projects.filter((p) => p.category === "tools").length,
        },
    ];

    const filteredProjects =
        activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory);

    const handleCategoryChange = async (category: ProjectCategory) => {
        if (category === activeCategory) return;

        setIsLoading(true);
        // Simulate loading for better UX
        await new Promise((resolve) => setTimeout(resolve, 300));
        setActiveCategory(category);
        setIsLoading(false);
    };

    return (
        <LayoutGroup>
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
                                MY PROJECTS
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
                                A collection of AI systems, blockchain applications, and development tools that solve
                                real-world problems and push technological boundaries.
                            </motion.p>
                        </motion.div>

                        {/* Category Filter */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-wrap justify-center gap-3 mb-12"
                        >
                            {categories.map((category, index) => {
                                const Icon = category.icon;
                                const isActive = activeCategory === category.id;

                                return (
                                    <motion.div
                                        key={category.id}
                                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{
                                            duration: 0.4,
                                            delay: 0.8 + index * 0.1,
                                            ease: "easeOut",
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button
                                            variant={isActive ? "default" : "outline"}
                                            size="lg"
                                            onClick={() => handleCategoryChange(category.id)}
                                            className={cn(
                                                "relative flex items-center gap-2 transition-all duration-300",
                                                isActive
                                                    ? "bg-secondary text-secondary-foreground shadow-lg"
                                                    : "hover:bg-accent hover:text-accent-foreground"
                                            )}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span>{category.name}</span>
                                            <span
                                                className={cn(
                                                    "px-2 py-0.5 rounded-full text-xs font-medium",
                                                    isActive
                                                        ? "bg-secondary-foreground/20 text-secondary-foreground"
                                                        : "bg-muted text-muted-foreground"
                                                )}
                                            >
                                                {category.count}
                                            </span>
                                        </Button>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </section>

                {/* Projects Grid */}
                <section className="pb-20 px-4 md:px-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Error State */}
                        {error && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                                <h3 className="text-2xl font-semibold mb-4 text-red-600">Error loading projects</h3>
                                <p className="text-muted-foreground">{error}</p>
                                <Button onClick={() => window.location.reload()} className="mt-4">
                                    Retry
                                </Button>
                            </motion.div>
                        )}

                        {/* Initial API Loading State */}
                        {apiLoading && !error && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex justify-center items-center py-20"
                            >
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
                            </motion.div>
                        )}

                        {!apiLoading && !error && (
                            <>
                                <AnimatePresence mode="wait">
                                    {isLoading ? (
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex justify-center items-center py-20"
                                        >
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key={activeCategory}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <BentoGrid className="auto-rows-[20rem] grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto">
                                                {filteredProjects.map((project, index) => (
                                                    <motion.div
                                                        key={project.id}
                                                        layout
                                                        initial={{
                                                            opacity: 0,
                                                            y: 40,
                                                            scale: 0.9,
                                                            rotateX: 15,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                            scale: 1,
                                                            rotateX: 0,
                                                        }}
                                                        exit={{
                                                            opacity: 0,
                                                            y: -20,
                                                            scale: 0.95,
                                                            transition: { duration: 0.2 },
                                                        }}
                                                        transition={{
                                                            duration: 0.6,
                                                            delay: index * 0.08,
                                                            ease: [0.21, 1.11, 0.81, 0.99],
                                                            type: "spring",
                                                            stiffness: 100,
                                                            damping: 15,
                                                        }}
                                                        whileHover={{
                                                            y: -8,
                                                            scale: 1.02,
                                                            rotateX: -2,
                                                            transition: {
                                                                duration: 0.3,
                                                                ease: "easeOut",
                                                            },
                                                        }}
                                                        className={cn(project.className, "h-full")}
                                                        style={{
                                                            transformStyle: "preserve-3d",
                                                            perspective: "1000px",
                                                        }}
                                                    >
                                                        <BentoCard
                                                            name={project.name}
                                                            className={cn(
                                                                "relative group cursor-pointer",
                                                                "shadow-lg hover:shadow-2xl transition-shadow duration-500"
                                                            )}
                                                            background={
                                                                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/5" />
                                                            }
                                                            description={project.description}
                                                            href={project.demo || project.github || "#"}
                                                            cta="View Project"
                                                            backgroundImageUrl={project.image}
                                                            backgroundImageAlt={project.name}
                                                            cardUrl={project.demo || project.github}
                                                            projectId={project.id}
                                                            onClick={() => setSelectedProject(project)}
                                                        />

                                                        {/* Project Metadata Overlay */}
                                                        <div className="absolute top-4 left-4 right-4 z-20">
                                                            <div className="flex items-center justify-end">
                                                                <span className="text-xs text-white/70 bg-black/30 px-2 py-1 rounded">
                                                                    {project.year}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Action Buttons */}
                                                        <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                            {project.github && (
                                                                <Button
                                                                    size="icon"
                                                                    variant="secondary"
                                                                    className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white border-0"
                                                                    asChild
                                                                >
                                                                    <a
                                                                        href={project.github}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        <Github className="h-4 w-4" />
                                                                    </a>
                                                                </Button>
                                                            )}
                                                            {project.demo && (
                                                                <Button
                                                                    size="icon"
                                                                    variant="secondary"
                                                                    className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white border-0"
                                                                    asChild
                                                                >
                                                                    <a
                                                                        href={project.demo}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        <ExternalLink className="h-4 w-4" />
                                                                    </a>
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </BentoGrid>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Empty State */}
                                {!isLoading && filteredProjects.length === 0 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center py-20"
                                    >
                                        <h3 className="text-2xl font-semibold mb-4">No projects found</h3>
                                        <p className="text-muted-foreground">
                                            No projects match the selected category. Try selecting a different category.
                                        </p>
                                    </motion.div>
                                )}
                            </>
                        )}
                    </div>
                </section>

                {/* Project Detail Modal */}
                <AnimatePresence mode="wait">
                    {selectedProject && (
                        <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
                    )}
                </AnimatePresence>
            </div>
        </LayoutGroup>
    );
}
