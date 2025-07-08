import { motion } from "motion/react";
import { Code, Users, Zap, Sparkles } from "lucide-react";

type Project = {
    title: string;
    description: string;
    techStack: string[];
    metrics: Record<string, string | number>;
};

type PortfolioProps = {
    category: string;
    projects: Project[];
    totalProjects: number;
};

export const Portfolio = ({ category, projects, totalProjects }: PortfolioProps) => {
    const getCategoryIcon = () => {
        switch (category) {
            case "ai":
                return <Sparkles className="w-5 h-5 text-secondary" />;
            case "blockchain":
                return <Code className="w-5 h-5 text-secondary" />;
            case "fullstack":
                return <Zap className="w-5 h-5 text-secondary" />;
            default:
                return <Code className="w-5 h-5 text-secondary" />;
        }
    };

    const getCategoryColor = () => {
        return "from-card to-accent border-border";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className={`bg-gradient-to-br ${getCategoryColor()} p-6 rounded-xl border max-w-2xl`}
        >
            <div className="flex items-center gap-3 mb-6">
                {getCategoryIcon()}
                <div>
                    <h3 className="text-xl font-bold text-foreground capitalize">
                        {category === "all" ? "All Projects" : `${category} Projects`}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {totalProjects} project{totalProjects !== 1 ? "s" : ""} available
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50"
                    >
                        <h4 className="font-semibold text-foreground mb-2">{project.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{project.description}</p>

                        <div className="flex flex-wrap gap-2 mb-3">
                            {project.techStack.slice(0, 4).map((tech, techIndex) => (
                                <span
                                    key={techIndex}
                                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                                >
                                    {tech}
                                </span>
                            ))}
                            {project.techStack.length > 4 && (
                                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                                    +{project.techStack.length - 4} more
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            {Object.entries(project.metrics).map(([key, value], metricIndex) => (
                                <div key={metricIndex} className="flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    <span>
                                        {typeof value === "number" ? value.toLocaleString() : value} {key}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};
