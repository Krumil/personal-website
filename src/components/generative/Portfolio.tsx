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
      case 'ai':
        return <Sparkles className="w-5 h-5 text-purple-500" />;
      case 'blockchain':
        return <Code className="w-5 h-5 text-orange-500" />;
      case 'fullstack':
        return <Zap className="w-5 h-5 text-blue-500" />;
      default:
        return <Code className="w-5 h-5 text-gray-500" />;
    }
  };

  const getCategoryColor = () => {
    switch (category) {
      case 'ai':
        return 'from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-800/20 border-purple-200 dark:border-purple-700';
      case 'blockchain':
        return 'from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-800/20 border-orange-200 dark:border-orange-700';
      case 'fullstack':
        return 'from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-800/20 border-blue-200 dark:border-blue-700';
      default:
        return 'from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border-gray-200 dark:border-gray-700';
    }
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
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 capitalize">
            {category === 'all' ? 'All Projects' : `${category} Projects`}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {totalProjects} project{totalProjects !== 1 ? 's' : ''} available
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
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-white/20 dark:border-gray-700/20"
          >
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {project.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {project.techStack.slice(0, 4).map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md">
                  +{project.techStack.length - 4} more
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              {Object.entries(project.metrics).map(([key, value], metricIndex) => (
                <div key={metricIndex} className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{typeof value === 'number' ? value.toLocaleString() : value} {key}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};