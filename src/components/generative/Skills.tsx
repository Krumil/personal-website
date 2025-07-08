import { motion } from "motion/react";
import { Code, Database, Brain, Blocks } from "lucide-react";

type Skill = {
    name: string;
    level: number;
    years: number;
};

type SkillsProps = {
    skillType: string;
    skills: Skill[];
    totalSkills: number;
};

export const Skills = ({ skillType, skills, totalSkills }: SkillsProps) => {
    const getSkillIcon = () => {
        switch (skillType) {
            case "frontend":
                return <Code className="w-5 h-5 text-secondary" />;
            case "backend":
                return <Database className="w-5 h-5 text-secondary" />;
            case "ai":
                return <Brain className="w-5 h-5 text-secondary" />;
            case "blockchain":
                return <Blocks className="w-5 h-5 text-secondary" />;
            default:
                return <Code className="w-5 h-5 text-secondary" />;
        }
    };

    const getSkillColor = () => {
        return "from-card to-accent border-border";
    };

    const getProgressColor = (level: number) => {
        if (level >= 90) return "bg-secondary";
        if (level >= 80) return "bg-secondary/80";
        if (level >= 70) return "bg-secondary/60";
        return "bg-muted-foreground";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className={`bg-gradient-to-br ${getSkillColor()} p-6 rounded-xl border max-w-2xl`}
        >
            <div className="flex items-center gap-3 mb-6">
                {getSkillIcon()}
                <div>
                    <h3 className="text-xl font-bold text-foreground capitalize">
                        {skillType === "all" ? "All Skills" : `${skillType} Skills`}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {totalSkills} skill{totalSkills !== 1 ? "s" : ""} in this category
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-foreground">{skill.name}</h4>
                            <div className="text-sm text-muted-foreground">
                                {skill.years} year{skill.years !== 1 ? "s" : ""} experience
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex-1 bg-muted rounded-full h-2">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${skill.level}%` }}
                                    transition={{ duration: 1, delay: index * 0.1 }}
                                    className={`h-2 rounded-full ${getProgressColor(skill.level)}`}
                                />
                            </div>
                            <span className="text-sm font-medium text-muted-foreground min-w-[3rem]">
                                {skill.level}%
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};
