'use client';

import { useState, useEffect } from 'react';
import { Code, Brain, Database, Zap, Award, TrendingUp } from 'lucide-react';

type SkillCategory = 'frontend' | 'backend' | 'ai' | 'blockchain' | 'devops' | 'tools';

type Skill = {
  name: string;
  level: number; // 1-10
  years: number;
  category: SkillCategory;
  projects: number;
  description: string;
  codeExample?: string;
};

const skills: Skill[] = [
  {
    name: 'TypeScript',
    level: 9,
    years: 4,
    category: 'frontend',
    projects: 15,
    description: 'Advanced TypeScript with strict mode, generics, and complex type manipulation',
    codeExample: `type AsyncReturnType<T extends (...args: any) => Promise<any>> = 
  T extends (...args: any) => Promise<infer R> ? R : never;`
  },
  {
    name: 'React',
    level: 9,
    years: 5,
    category: 'frontend',
    projects: 20,
    description: 'Expert in React 18, hooks, performance optimization, and state management'
  },
  {
    name: 'Next.js',
    level: 8,
    years: 3,
    category: 'frontend',
    projects: 12,
    description: 'Full-stack Next.js apps with App Router, SSR, and edge functions'
  },
  {
    name: 'Node.js',
    level: 8,
    years: 4,
    category: 'backend',
    projects: 18,
    description: 'Backend APIs, microservices, and serverless functions'
  },
  {
    name: 'OpenAI API',
    level: 9,
    years: 2,
    category: 'ai',
    projects: 8,
    description: 'Advanced AI integrations with GPT-4, embeddings, and fine-tuning',
    codeExample: `const completion = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: prompt }],
  stream: true,
});`
  },
  {
    name: 'Ethereum',
    level: 7,
    years: 3,
    category: 'blockchain',
    projects: 6,
    description: 'Smart contracts, DeFi protocols, and Web3 integrations'
  },
  {
    name: 'PostgreSQL',
    level: 8,
    years: 4,
    category: 'backend',
    projects: 14,
    description: 'Complex queries, performance optimization, and database design'
  },
  {
    name: 'Docker',
    level: 7,
    years: 3,
    category: 'devops',
    projects: 10,
    description: 'Containerization, multi-stage builds, and orchestration'
  }
];

const categoryInfo = {
  frontend: { icon: Code, color: 'from-blue-500 to-cyan-500', label: 'Frontend' },
  backend: { icon: Database, color: 'from-green-500 to-emerald-500', label: 'Backend' },
  ai: { icon: Brain, color: 'from-purple-500 to-pink-500', label: 'AI/ML' },
  blockchain: { icon: Zap, color: 'from-orange-500 to-red-500', label: 'Blockchain' },
  devops: { icon: TrendingUp, color: 'from-indigo-500 to-purple-500', label: 'DevOps' },
  tools: { icon: Award, color: 'from-gray-500 to-slate-500', label: 'Tools' }
};

type SkillVisualizerProps = {
  category?: SkillCategory;
  showRadar?: boolean;
  limit?: number;
};

export function SkillVisualizer({ category, showRadar = true, limit }: SkillVisualizerProps) {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [animatedLevels, setAnimatedLevels] = useState<{ [key: string]: number }>({});

  let filteredSkills = skills;
  
  if (category) {
    filteredSkills = filteredSkills.filter(s => s.category === category);
  }
  
  if (limit) {
    filteredSkills = filteredSkills.slice(0, limit);
  }

  // Animate skill bars on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const levels: { [key: string]: number } = {};
      filteredSkills.forEach(skill => {
        levels[skill.name] = skill.level;
      });
      setAnimatedLevels(levels);
    }, 100);

    return () => clearTimeout(timer);
  }, [filteredSkills]);

  const getSkillColor = (level: number) => {
    if (level >= 8) return 'bg-green-500';
    if (level >= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getSkillLabel = (level: number) => {
    if (level >= 9) return 'Expert';
    if (level >= 7) return 'Advanced';
    if (level >= 5) return 'Intermediate';
    return 'Beginner';
  };

  // Radar Chart Component (simplified)
  const RadarChart = () => {
    const categories = Object.keys(categoryInfo) as SkillCategory[];
    const categoryAverages = categories.map(cat => {
      const categorySkills = skills.filter(s => s.category === cat);
      const average = categorySkills.length > 0 
        ? categorySkills.reduce((sum, s) => sum + s.level, 0) / categorySkills.length 
        : 0;
      return { category: cat, level: average };
    });

    return (
      <div className="relative w-64 h-64 mx-auto">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Grid circles */}
          {[2, 4, 6, 8, 10].map(level => (
            <circle
              key={level}
              cx="100"
              cy="100"
              r={level * 8}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-border opacity-30"
            />
          ))}
          
          {/* Grid lines */}
          {categoryAverages.map((_, index) => {
            const angle = (index * 2 * Math.PI) / categoryAverages.length - Math.PI / 2;
            const x2 = 100 + Math.cos(angle) * 80;
            const y2 = 100 + Math.sin(angle) * 80;
            return (
              <line
                key={index}
                x1="100"
                y1="100"
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="1"
                className="text-border opacity-30"
              />
            );
          })}

          {/* Skill polygon */}
          <polygon
            points={categoryAverages.map((cat, index) => {
              const angle = (index * 2 * Math.PI) / categoryAverages.length - Math.PI / 2;
              const radius = cat.level * 8;
              const x = 100 + Math.cos(angle) * radius;
              const y = 100 + Math.sin(angle) * radius;
              return `${x},${y}`;
            }).join(' ')}
            fill="currentColor"
            className="text-primary opacity-20"
            stroke="currentColor"
            strokeWidth="2"
          />

          {/* Category labels */}
          {categoryAverages.map((cat, index) => {
            const angle = (index * 2 * Math.PI) / categoryAverages.length - Math.PI / 2;
            const x = 100 + Math.cos(angle) * 95;
            const y = 100 + Math.sin(angle) * 95;
            return (
              <text
                key={cat.category}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-xs fill-current text-foreground"
              >
                {categoryInfo[cat.category].label}
              </text>
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">
          {category ? `${categoryInfo[category].label} Skills` : 'Technical Skills'}
        </h3>
        <p className="text-muted-foreground">
          Click on any skill to see detailed information and code examples
        </p>
      </div>

      {/* Radar Chart */}
      {showRadar && !category && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h4 className="text-lg font-semibold text-center mb-4">Skill Overview</h4>
          <RadarChart />
        </div>
      )}

      {/* Skills List */}
      <div className="grid gap-4">
        {filteredSkills.map((skill) => {
          const categoryData = categoryInfo[skill.category];
          const IconComponent = categoryData.icon;
          const animatedLevel = animatedLevels[skill.name] || 0;

          return (
            <div
              key={skill.name}
              onClick={() => setSelectedSkill(skill)}
              className="group cursor-pointer bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${categoryData.color} flex items-center justify-center`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold group-hover:text-primary transition-colors">
                      {skill.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {skill.years} years • {skill.projects} projects
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{skill.level}/10</div>
                  <div className="text-xs text-muted-foreground">{getSkillLabel(skill.level)}</div>
                </div>
              </div>

              {/* Skill Bar */}
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ease-out ${getSkillColor(skill.level)}`}
                  style={{ width: `${(animatedLevel / 10) * 100}%` }}
                />
              </div>

              <p className="text-sm text-muted-foreground">{skill.description}</p>
            </div>
          );
        })}
      </div>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${categoryInfo[selectedSkill.category].color} flex items-center justify-center`}>
                    {(() => {
                      const IconComponent = categoryInfo[selectedSkill.category].icon;
                      return <IconComponent className="w-6 h-6 text-white" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedSkill.name}</h3>
                    <p className="text-muted-foreground">{categoryInfo[selectedSkill.category].label}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="w-8 h-8 rounded-full bg-muted hover:bg-muted/70 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Skill Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{selectedSkill.level}/10</div>
                  <div className="text-sm text-muted-foreground">Proficiency</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">{selectedSkill.years}</div>
                  <div className="text-sm text-muted-foreground">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{selectedSkill.projects}</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-chart-1">{getSkillLabel(selectedSkill.level)}</div>
                  <div className="text-sm text-muted-foreground">Level</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-semibold mb-2">Experience</h4>
                <p className="text-muted-foreground leading-relaxed">{selectedSkill.description}</p>
              </div>

              {/* Code Example */}
              {selectedSkill.codeExample && (
                <div>
                  <h4 className="font-semibold mb-2">Code Example</h4>
                  <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-foreground">
                      <code>{selectedSkill.codeExample}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Skill Progress Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Proficiency Level</span>
                  <span className="text-sm text-muted-foreground">{selectedSkill.level}/10</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-1000 ease-out ${getSkillColor(selectedSkill.level)}`}
                    style={{ width: `${(selectedSkill.level / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}