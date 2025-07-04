"use client";

import { useState } from "react";
import { ExternalLink, Github, Play, Code, Sparkles } from "lucide-react";

type Project = {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    category: "ai" | "blockchain" | "fullstack";
    demoUrl?: string;
    githubUrl?: string;
    featured: boolean;
    codePreview?: string;
    metrics?: {
        users?: number;
        stars?: number;
        performance?: string;
    };
};

const projects: Project[] = [
    {
        id: "ai-chatbot",
        title: "AI-Powered Portfolio Assistant",
        description: "This very chatbot you're talking to! Built with Next.js, OpenAI API, and streaming responses.",
        techStack: ["Next.js", "OpenAI API", "TypeScript", "Tailwind CSS", "Vercel AI SDK"],
        category: "ai",
        githubUrl: "https://github.com/simonesaletti/portfolio",
        featured: true,
        codePreview: `const { messages, input, handleSubmit } = useChat({
  api: '/api/chat',
  streamMode: 'text',
});`,
        metrics: { performance: "< 100ms response time" },
    },
    {
        id: "blockchain-wallet",
        title: "Multi-Chain Crypto Wallet",
        description: "A secure, multi-blockchain wallet supporting Ethereum, Bitcoin, and Solana networks.",
        techStack: ["React", "Web3.js", "Ethers.js", "Solana SDK", "TypeScript"],
        category: "blockchain",
        featured: true,
        codePreview: `const connectWallet = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return await signer.getAddress();
};`,
        metrics: { users: 1200, stars: 89 },
    },
    {
        id: "ecommerce-platform",
        title: "Next.js E-commerce Platform",
        description: "Full-stack e-commerce solution with payment processing, inventory management, and analytics.",
        techStack: ["Next.js", "PostgreSQL", "Stripe", "Prisma", "Redis"],
        category: "fullstack",
        demoUrl: "https://demo.ecommerce.com",
        featured: true,
        codePreview: `export async function createPayment(amount: number) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'usd',
  });
  return paymentIntent;
}`,
        metrics: { users: 5000, performance: "98% uptime" },
    },
    {
        id: "ml-image-classifier",
        title: "Real-time Image Classification",
        description:
            "Machine learning model deployed with TensorFlow.js for real-time image classification in the browser.",
        techStack: ["TensorFlow.js", "React", "Python", "FastAPI"],
        category: "ai",
        featured: false,
        codePreview: `const model = await tf.loadLayersModel('/model.json');
const prediction = model.predict(imageData);`,
        metrics: { performance: "95% accuracy" },
    },
];

type ProjectShowcaseProps = {
    category?: "ai" | "blockchain" | "fullstack";
    featured?: boolean;
    limit?: number;
};

export function ProjectShowcase({ category, featured, limit }: ProjectShowcaseProps) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [activeTab, setActiveTab] = useState<"overview" | "code" | "metrics">("overview");

    let filteredProjects = projects;

    if (category) {
        filteredProjects = filteredProjects.filter((p) => p.category === category);
    }

    if (featured) {
        filteredProjects = filteredProjects.filter((p) => p.featured);
    }

    if (limit) {
        filteredProjects = filteredProjects.slice(0, limit);
    }

    const categoryColors = {
        ai: "from-primary to-secondary",
        blockchain: "from-secondary to-accent",
        fullstack: "from-accent to-primary",
    };

    const categoryIcons = {
        ai: Sparkles,
        blockchain: Code,
        fullstack: Play,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">
                    {category ? `${category.toUpperCase()} Projects` : "Featured Projects"}
                </h3>
                <p className="text-muted-foreground">
                    Click on any project to explore details, code snippets, and metrics
                </p>
            </div>

            {/* Project Grid */}
            <div className="grid md:grid-cols-2 gap-4">
                {filteredProjects.map((project) => {
                    const IconComponent = categoryIcons[project.category];
                    return (
                        <div
                            key={project.id}
                            onClick={() => setSelectedProject(project)}
                            className="group cursor-pointer bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                        >
                            {/* Project Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div
                                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${
                                        categoryColors[project.category]
                                    } flex items-center justify-center`}
                                >
                                    <IconComponent className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex gap-2">
                                    {project.githubUrl && (
                                        <Github className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                                    )}
                                    {project.demoUrl && (
                                        <ExternalLink className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                                    )}
                                </div>
                            </div>

                            {/* Project Content */}
                            <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                                {project.title}
                            </h4>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.techStack.slice(0, 3).map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                                    >
                                        {tech}
                                    </span>
                                ))}
                                {project.techStack.length > 3 && (
                                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                                        +{project.techStack.length - 3} more
                                    </span>
                                )}
                            </div>

                            {/* Metrics Preview */}
                            {project.metrics && (
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    {project.metrics.users && (
                                        <span>{project.metrics.users.toLocaleString()} users</span>
                                    )}
                                    {project.metrics.stars && <span>⭐ {project.metrics.stars} stars</span>}
                                    {project.metrics.performance && <span>📊 {project.metrics.performance}</span>}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Project Detail Modal */}
            {selectedProject && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-card border border-border rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-border">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`w-12 h-12 rounded-lg bg-gradient-to-r ${
                                            categoryColors[selectedProject.category]
                                        } flex items-center justify-center`}
                                    >
                                        {(() => {
                                            const IconComponent = categoryIcons[selectedProject.category];
                                            return <IconComponent className="w-6 h-6 text-white" />;
                                        })()}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{selectedProject.title}</h3>
                                        <p className="text-muted-foreground capitalize">
                                            {selectedProject.category} Project
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="w-8 h-8 rounded-full bg-muted hover:bg-muted/70 flex items-center justify-center"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Tab Navigation */}
                            <div className="flex gap-4 mt-6">
                                {(["overview", "code", "metrics"] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            activeTab === tab
                                                ? "bg-primary text-primary-foreground"
                                                : "text-muted-foreground hover:text-foreground"
                                        }`}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            {activeTab === "overview" && (
                                <div className="space-y-6">
                                    <p className="text-foreground leading-relaxed">{selectedProject.description}</p>

                                    <div>
                                        <h4 className="font-semibold mb-3">Technology Stack</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.techStack.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-2 bg-muted text-muted-foreground rounded-lg text-sm"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        {selectedProject.githubUrl && (
                                            <a
                                                href={selectedProject.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                                            >
                                                <Github className="w-4 h-4" />
                                                View Source
                                            </a>
                                        )}
                                        {selectedProject.demoUrl && (
                                            <a
                                                href={selectedProject.demoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === "code" && selectedProject.codePreview && (
                                <div className="space-y-4">
                                    <h4 className="font-semibold">Code Preview</h4>
                                    <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                                        <pre className="text-sm text-foreground">
                                            <code>{selectedProject.codePreview}</code>
                                        </pre>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        This is a simplified example. Check the GitHub repository for the complete
                                        implementation.
                                    </p>
                                </div>
                            )}

                            {activeTab === "metrics" && selectedProject.metrics && (
                                <div className="space-y-6">
                                    <h4 className="font-semibold">Project Metrics</h4>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        {selectedProject.metrics.users && (
                                            <div className="bg-muted rounded-lg p-4 text-center">
                                                <div className="text-2xl font-bold text-primary">
                                                    {selectedProject.metrics.users.toLocaleString()}
                                                </div>
                                                <div className="text-sm text-muted-foreground">Active Users</div>
                                            </div>
                                        )}
                                        {selectedProject.metrics.stars && (
                                            <div className="bg-muted rounded-lg p-4 text-center">
                                                <div className="text-2xl font-bold text-secondary">
                                                    {selectedProject.metrics.stars}
                                                </div>
                                                <div className="text-sm text-muted-foreground">GitHub Stars</div>
                                            </div>
                                        )}
                                        {selectedProject.metrics.performance && (
                                            <div className="bg-muted rounded-lg p-4 text-center">
                                                <div className="text-2xl font-bold text-accent">
                                                    {selectedProject.metrics.performance}
                                                </div>
                                                <div className="text-sm text-muted-foreground">Performance</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
