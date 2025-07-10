"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Github, Star, GitFork, Sparkles, Code, Play, Wrench } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    // Simulated GitHub metrics
    stars?: number;
    forks?: number;
}

type ProjectShowcaseProps = {
    category?: "ai" | "web3" | "fullstack" | "tools";
    featured?: boolean;
    limit?: number;
};

export function ProjectShowcase({ category, featured, limit }: ProjectShowcaseProps) {
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("/api/projects");
                const data = await response.json();

                if (data.success) {
                    // Add simulated GitHub metrics
                    const projectsWithMetrics = data.data.map((project: Project) => ({
                        ...project,
                        stars: Math.floor(Math.random() * 200) + 10,
                        forks: Math.floor(Math.random() * 50) + 5,
                    }));

                    let filteredProjects = projectsWithMetrics;

                    if (category) {
                        filteredProjects = filteredProjects.filter((p: Project) => p.category === category);
                    }

                    if (featured) {
                        filteredProjects = filteredProjects.filter((p: Project) => p.featured);
                    }

                    if (limit) {
                        filteredProjects = filteredProjects.slice(0, limit);
                    }

                    setProjects(filteredProjects);
                }
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            } finally {
                setLoading(false);
            }
        };

        // Simulate loading time
        const timer = setTimeout(fetchProjects, 1000);
        return () => clearTimeout(timer);
    }, [category, featured, limit]);

    const categoryColors = {
        ai: "from-primary to-secondary",
        web3: "from-secondary to-accent",
        fullstack: "from-accent to-primary",
        tools: "from-primary to-accent",
    };

    const categoryIcons = {
        ai: Sparkles,
        web3: Code,
        fullstack: Play,
        tools: Wrench,
    };

    if (loading) {
        return (
            <Card className="w-full max-w-4xl animate-pulse">
                <CardContent className="p-6">
                    <div className="flex items-center justify-center h-40">
                        <p className="text-muted-foreground">Loading projects...</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Github className="h-5 w-5" />
                    {category ? `${category.toUpperCase()} Projects` : "Featured Projects"}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {projects.map((project) => {
                    const IconComponent = categoryIcons[project.category as keyof typeof categoryIcons];
                    return (
                        <div
                            key={project.id}
                            className="border rounded-lg p-4 space-y-3 hover:shadow-lg transition-all duration-200"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3">
                                    <div
                                        className={`w-10 h-10 rounded-lg bg-gradient-to-r ${
                                            categoryColors[project.category as keyof typeof categoryColors]
                                        } flex items-center justify-center flex-shrink-0`}
                                    >
                                        <IconComponent className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-lg">{project.name}</h3>
                                            <Badge variant="outline" className="text-xs">
                                                {project.category}
                                            </Badge>
                                            {project.status === "in-progress" && (
                                                <Badge variant="secondary" className="text-xs">
                                                    In Progress
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground">{project.description}</p>
                                        {project.impact && (
                                            <p className="text-xs text-primary font-medium">Impact: {project.impact}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4" />
                                        {project.stars}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <GitFork className="h-4 w-4" />
                                        {project.forks}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {project.tags.slice(0, 4).map((tech) => (
                                    <Badge key={tech} variant="secondary" className="text-xs">
                                        {tech}
                                    </Badge>
                                ))}
                                {project.tags.length > 4 && (
                                    <Badge variant="secondary" className="text-xs">
                                        +{project.tags.length - 4} more
                                    </Badge>
                                )}
                            </div>

                            <div className="flex gap-2">
                                {project.github && (
                                    <Button size="sm" variant="outline" asChild>
                                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                                            <Github className="h-4 w-4 mr-1" />
                                            Code
                                        </a>
                                    </Button>
                                )}
                                {project.demo && (
                                    <Button size="sm" asChild>
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4 mr-1" />
                                            Live Demo
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}
