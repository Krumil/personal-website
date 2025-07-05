import React from "react";

import { Timeline } from "@/components/ui/timeline";

export function TimelineDemo() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Leading full-stack development with cutting-edge AI and blockchain technologies. 
            Built advanced portfolio website with generative UI components and integrated OpenAI APIs.
          </p>
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
              Key Achievements
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                ✅ AI-Powered Portfolio Assistant with streaming responses
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                ✅ Multi-Chain Crypto Wallet (2,500+ users, 50K+ transactions)
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                ✅ Next.js 15 with React 19 & TypeScript integration
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                ✅ Advanced animations with Framer Motion & GSAP
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-20 md:h-44 lg:h-60 w-full rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]">
              <span className="text-white font-semibold">AI Portfolio</span>
            </div>
            <div className="h-20 md:h-44 lg:h-60 w-full rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]">
              <span className="text-white font-semibold">Crypto Wallet</span>
            </div>
            <div className="h-20 md:h-44 lg:h-60 w-full rounded-lg bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]">
              <span className="text-white font-semibold">E-commerce</span>
            </div>
            <div className="h-20 md:h-44 lg:h-60 w-full rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]">
              <span className="text-white font-semibold">ML Vision</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2022-2023",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Specialized in blockchain development and DeFi protocols. Built smart contracts 
            and decentralized applications with focus on Web3 integration and user experience.
          </p>
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
              Blockchain Expertise
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                ⚡ Ethereum smart contracts development
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                ⚡ Solana program architecture
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                ⚡ DeFi protocol integrations
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                ⚡ Web3.js and Ethers.js implementations
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-20 md:h-44 lg:h-60 w-full rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]">
              <span className="text-white font-semibold">Smart Contracts</span>
            </div>
            <div className="h-20 md:h-44 lg:h-60 w-full rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]">
              <span className="text-white font-semibold">DeFi Protocols</span>
            </div>
            <div className="h-20 md:h-44 lg:h-60 w-full rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]">
              <span className="text-white font-semibold">Web3 Integration</span>
            </div>
            <div className="h-20 md:h-44 lg:h-60 w-full rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]">
              <span className="text-white font-semibold">Solana Programs</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2020-2022",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Started my journey in full-stack development, mastering modern web technologies 
            and building responsive, performant applications.
          </p>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              🚀 React & Next.js mastery
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              🚀 TypeScript adoption and expertise
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              🚀 Node.js backend development
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              🚀 PostgreSQL database optimization
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              🚀 AWS and serverless architecture
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-20 md:h-44 lg:h-60 w-full rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]">
              <span className="text-white font-semibold">React Apps</span>
            </div>
            <div className="h-20 md:h-44 lg:h-60 w-full rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]">
              <span className="text-white font-semibold">Node.js APIs</span>
            </div>
            <div className="h-20 md:h-44 lg:h-60 w-full rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]">
              <span className="text-white font-semibold">TypeScript</span>
            </div>
            <div className="h-20 md:h-44 lg:h-60 w-full rounded-lg bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]">
              <span className="text-white font-semibold">AWS Cloud</span>
            </div>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}