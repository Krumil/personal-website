"use client";

import PageLayout from "@/components/layout/PageLayout";
import ProjectCard from "@/components/common/ProjectCard";
import TransitionWrapper from "@/components/layout/TransitionWrapper";

export default function AIProjects() {
  const aiProjects = [
    {
      number: "01",
      title: "Blockchain Agent",
      description:
        "Autonomous agent that interprets user goals and performs on-chain queries/transactions via LLM reasoning.",
      tech: ["LangChain", "Python", "Node.js", "OpenAI API", "web3.py", "ethers.js"],
      year: "2024",
      impact: "80% complexity reduction",
    },
    {
      number: "02",
      title: "FactFinder AI",
      description: "Chat app & server that deliver evidence-backed answers to combat misinformation.",
      tech: ["Next.js", "Node.js", "TypeScript", "OpenAI GPT-4", "Vector Search"],
      year: "2024",
      impact: "Verified 1M+ claims",
    },
    {
      number: "03",
      title: "Prompt Caching Dashboard",
      description: "Internal tool caching LLM prompts/responses with a searchable dashboard to reduce costs.",
      tech: ["FastAPI", "Node.js", "Redis", "PostgreSQL", "React", "Tailwind"],
      year: "2023",
      impact: "60% cost savings",
    },
    {
      number: "04",
      title: "Sentient Satoshis",
      description:
        "Simulation of GPT-powered 'satoshi' agents analyzing crypto markets and interacting socially.",
      tech: ["Python", "OpenAI GPT-3.5/4", "Web3 APIs"],
      year: "2023",
    },
    {
      number: "05",
      title: "Synapse – StarkNet DeFi Dashboard",
      description:
        "AI-powered StarkNet dashboard with conversational assistant, yield farming, swaps, and token launchpad.",
      tech: ["Next.js", "LangChain", "StarkNet SDK", "AVNU", "DeFiLlama APIs"],
      year: "2023",
    },
  ];

  const skills = [
    "OpenAI GPT-4 integration",
    "LangChain framework",
    "Prompt engineering",
    "PyTorch & scikit-learn",
    "Data analysis with Pandas & NumPy",
    "Vector databases & embeddings",
    "AI agent orchestration",
    "Natural language processing",
  ];

  return (
    <TransitionWrapper>
      <PageLayout
        title="AI PROJECTS"
        subtitle="ARTIFICIAL INTELLIGENCE — MACHINE LEARNING"
        description="Building intelligent systems that understand context, make decisions, and deliver measurable results. From autonomous agents to fact-checking tools, I create AI that actually works in the real world."
        tags={["LangChain", "OpenAI GPT-4", "Vector Search", "AI Agents", "Machine Learning"]}
      >
        {/* Projects Section */}
        <section className="py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">FEATURED WORK</h2>
              <p className="text-xl text-white/60 max-w-2xl">
                AI applications that solve real problems and deliver measurable business value
              </p>
            </div>

            <div className="space-y-0">
              {aiProjects.map((project, index) => (
                <ProjectCard
                  key={index}
                  number={project.number}
                  title={project.title}
                  description={project.description}
                  tech={project.tech}
                  year={project.year}
                  impact={project.impact}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 px-8 bg-white text-black">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">AI TOOLKIT</h2>
              <p className="text-xl text-black/60 max-w-2xl">
                Technologies and frameworks I use to build intelligent systems
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-6 bg-black/5 rounded-lg border border-black/10"
                >
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <span className="text-black/80 font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </PageLayout>
    </TransitionWrapper>
  );
}
