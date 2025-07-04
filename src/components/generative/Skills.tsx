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
      case 'frontend':
        return <Code className="w-5 h-5 text-blue-500" />;
      case 'backend':
        return <Database className="w-5 h-5 text-green-500" />;
      case 'ai':
        return <Brain className="w-5 h-5 text-purple-500" />;
      case 'blockchain':
        return <Blocks className="w-5 h-5 text-orange-500" />;
      default:
        return <Code className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSkillColor = () => {
    switch (skillType) {
      case 'frontend':
        return 'from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-800/20 border-blue-200 dark:border-blue-700';
      case 'backend':
        return 'from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20 border-green-200 dark:border-green-700';
      case 'ai':
        return 'from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-800/20 border-purple-200 dark:border-purple-700';
      case 'blockchain':
        return 'from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-800/20 border-orange-200 dark:border-orange-700';
      default:
        return 'from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border-gray-200 dark:border-gray-700';
    }
  };

  const getProgressColor = (level: number) => {
    if (level >= 90) return 'bg-green-500';
    if (level >= 80) return 'bg-blue-500';
    if (level >= 70) return 'bg-yellow-500';
    return 'bg-gray-500';
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
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 capitalize">
            {skillType === 'all' ? 'All Skills' : `${skillType} Skills`}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {totalSkills} skill{totalSkills !== 1 ? 's' : ''} in this category
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
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-white/20 dark:border-gray-700/20"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                {skill.name}
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {skill.years} year{skill.years !== 1 ? 's' : ''} experience
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`h-2 rounded-full ${getProgressColor(skill.level)}`}
                />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[3rem]">
                {skill.level}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};