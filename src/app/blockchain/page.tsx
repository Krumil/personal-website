"use client";

import PageLayout from "@/components/layout/PageLayout";
import ProjectCard from "@/components/common/ProjectCard";
import TransitionWrapper from "@/components/layout/TransitionWrapper";

export default function BlockchainProjects() {
  const blockchainProjects = [
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
      title: "Farcaster FDV Frame",
      description: "Embeddable widget showing live FDV and stats for Farcaster.",
      tech: ["Next.js", "GraphQL/REST", "d3.js", "Chart.js"],
      year: "2024",
    },
    {
      number: "04",
      title: "Synapse – StarkNet DeFi Dashboard",
      description:
        "AI-powered StarkNet dashboard with conversational assistant, yield farming, swaps, and token launchpad.",
      tech: ["Next.js", "LangChain", "StarkNet SDK", "AVNU", "DeFiLlama APIs"],
      year: "2023",
    },
  ];

  const skills = [
    "Ethereum & EVM chains",
    "Solidity smart contracts",
    "web3.js/ethers.js, web3.py",
    "DeFi protocols & integrations",
    "NFT marketplaces & standards",
    "ENS & Farcaster APIs",
    "Alchemy/Infura infrastructure",
    "Layer 2 solutions (StarkNet, Base)",
  ];

  return (
    <TransitionWrapper>
      <PageLayout
        title="BLOCKCHAIN"
        subtitle="WEB3 — DECENTRALIZED APPLICATIONS"
        description="Building user-friendly Web3 applications that make blockchain technology accessible. From DeFi dashboards to NFT platforms, I create interfaces that don't require a PhD in crypto to use."
        tags={["Smart Contracts", "DeFi", "Web3", "Ethereum", "Solidity"]}
      >
        {/* Projects Section */}
        <section className="py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">FEATURED WORK</h2>
              <p className="text-xl text-white/60 max-w-2xl">
                Web3 applications that prioritize user experience and real-world utility
              </p>
            </div>

            <div className="space-y-0">
              {blockchainProjects.map((project, index) => (
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
              <h2 className="text-4xl md:text-6xl font-bold mb-4">WEB3 STACK</h2>
              <p className="text-xl text-black/60 max-w-2xl">
                Blockchain technologies and tools for building decentralized applications
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
