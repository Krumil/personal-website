"use client";

import { Globe, Server } from "lucide-react";

import MinimalistPageLayout from "@/components/MinimalistPageLayout";
import MinimalistProjectCard from "@/components/MinimalistProjectCard";
import TransitionWrapper from "@/components/TransitionWrapper";

export default function FullStackProjects() {
  const fullStackProjects = [
    {
      number: "01",
      title: "Wayfinder Staking Dashboard",
      description:
        "Modern dashboard to monitor Wayfinder Protocol staking data, with ENS resolution, leaderboards, and wallet insights.",
      tech: ["Next.js 13", "TypeScript", "Tailwind CSS", "Node.js", "ethers.js", "Vercel"],
      year: "2023",
      impact: "$2M+ tracked",
    },
    {
      number: "02",
      title: "Henlo Kart Dashboard & DataSync",
      description:
        "Web dashboard + data pipeline visualizing AI-powered racing game stats and blockchain assets.",
      tech: ["React/Next.js", "Tailwind", "Node.js/Express", "Ethereum", "Base chain"],
      year: "2024",
      impact: "10K+ users",
    },
    {
      number: "03",
      title: "FactFinder AI",
      description: "Chat app & server that deliver evidence-backed answers to combat misinformation.",
      tech: ["Next.js", "Node.js", "TypeScript", "OpenAI GPT-4", "Vector Search"],
      year: "2024",
      impact: "Verified 1M+ claims",
    },
    {
      number: "04",
      title: "Prompt Caching Dashboard",
      description: "Internal tool caching LLM prompts/responses with a searchable dashboard to reduce costs.",
      tech: ["FastAPI", "Node.js", "Redis", "PostgreSQL", "React", "Tailwind"],
      year: "2023",
      impact: "60% cost savings",
    },
    {
      number: "05",
      title: "Xpensify – Expense Tracker",
      description: "Personal finance web app for tracking expenses, budgets, and goals.",
      tech: ["React", "Tailwind", "Node.js/Express", "PostgreSQL"],
      year: "2023",
    },
    {
      number: "06",
      title: "Farcaster FDV Frame",
      description: "Embeddable widget showing live FDV and stats for Farcaster.",
      tech: ["Next.js", "GraphQL/REST", "d3.js", "Chart.js"],
      year: "2024",
    },
  ];

  const frontendSkills = [
    "HTML5, CSS3, JavaScript (ES6+) & TypeScript",
    "React / Next.js (13+)",
    "Tailwind CSS & Chakra UI",
    "Redux & Zustand",
    "Responsive & a11y best practices",
    "Performance optimization",
  ];

  const backendSkills = [
    "Node.js (Express, NestJS)",
    "Python (Flask, FastAPI)",
    "REST & GraphQL APIs",
    "JWT/OAuth authentication",
    "PostgreSQL & MongoDB",
    "WebSockets & real-time features",
  ];

  return (
    <TransitionWrapper>
      <MinimalistPageLayout
        title="FULL STACK"
        subtitle="END-TO-END — WEB DEVELOPMENT"
        description="Building complete web experiences from frontend to backend. I create applications where everything works together seamlessly - fast frontends, solid backends, and all the complex bits in between."
        tags={["React/Next.js", "Node.js", "TypeScript", "PostgreSQL", "REST APIs"]}
      >
        {/* Projects Section */}
        <section className="py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">FEATURED WORK</h2>
              <p className="text-xl text-white/60 max-w-2xl">
                Complete web applications built with modern technologies and best practices
              </p>
            </div>

            <div className="space-y-0">
              {fullStackProjects.map((project, index) => (
                <MinimalistProjectCard
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
              <h2 className="text-4xl md:text-6xl font-bold mb-4">TECH STACK</h2>
              <p className="text-xl text-black/60 max-w-2xl">
                Frontend and backend technologies for building complete web applications
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Frontend Skills */}
              <div>
                <div className="flex items-center space-x-3 mb-8">
                  <Globe className="w-8 h-8 text-black" />
                  <h3 className="text-2xl font-bold text-black">Frontend</h3>
                </div>
                <div className="space-y-4">
                  {frontendSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-4 bg-black/5 rounded-lg border border-black/10"
                    >
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                      <span className="text-black/80 font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Backend Skills */}
              <div>
                <div className="flex items-center space-x-3 mb-8">
                  <Server className="w-8 h-8 text-black" />
                  <h3 className="text-2xl font-bold text-black">Backend</h3>
                </div>
                <div className="space-y-4">
                  {backendSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-4 bg-black/5 rounded-lg border border-black/10"
                    >
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                      <span className="text-black/80 font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </MinimalistPageLayout>
    </TransitionWrapper>
  );
}
