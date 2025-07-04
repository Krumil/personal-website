import { NextResponse } from "next/server";

export interface Project {
    id: string;
    name: string;
    description: string;
    category: "all" | "ai" | "web3" | "fullstack" | "tools";
    tags: string[];
    github?: string;
    demo?: string;
    image: string;
    className: string;
    featured?: boolean;
    status: "completed" | "in-progress" | "planned";
    impact?: string;
    year: string;
    longDescription?: string;
    technologies?: string[];
    features?: string[];
    challenges?: string[];
    outcomes?: string[];
    teamSize?: number;
}

const projects: Project[] = [
    {
        id: "metaflags",
        name: "MetaFlags",
        description:
            "Decentralized feature flag management on-chain. Smart contract-based feature toggles with gasless interactions and real-time updates for Web3 applications.",
        category: "web3",
        tags: ["Web3", "Smart Contracts", "NFT", "Decentralized", "Vue.js", "Solidity"],
        github: "https://github.com/user/metaflags",
        demo: "https://metaflags.app",
        image: "/images/projects/metaflags.png",
        className: "md:col-span-2",
        featured: true,
        status: "completed",
        impact: "100% decentralized",
        year: "2024",
        longDescription:
            "MetaFlags revolutionizes feature flag management by leveraging blockchain technology to create a completely decentralized system. Unlike traditional feature flag services that rely on centralized servers, MetaFlags uses smart contracts to store and manage feature toggles, ensuring 100% uptime and resistance to censorship. The platform integrates seamlessly with Web3 applications and provides gasless interactions through meta-transactions, making it cost-effective for developers.",
        technologies: ["Solidity", "Vue.js", "Web3.js", "IPFS", "Meta-transactions", "OpenZeppelin"],
        features: [
            "Smart contract-based feature flag storage",
            "Gasless interactions via meta-transactions",
            "Real-time flag updates across all clients",
            "Decentralized governance for flag management",
            "SDK for easy integration with Web3 apps",
            "IPFS-based metadata storage",
        ],
        challenges: [
            "Implementing gasless transactions while maintaining security",
            "Optimizing smart contract gas costs for flag operations",
            "Creating real-time sync without traditional WebSocket servers",
            "Ensuring backward compatibility with existing flag systems",
        ],
        outcomes: [
            "Successfully deployed on Polygon mainnet",
            "Achieved 99.9% uptime since launch",
            "Integrated by 50+ Web3 applications",
            "Reduced feature flag costs by 80% vs traditional services",
        ],
        teamSize: 3,
    },
    {
        id: "factfinder-ai",
        name: "FactFinder AI",
        description:
            "Enterprise fact-checking system with 99.2% accuracy rate. Processes millions of claims using advanced NLP and knowledge graphs.",
        category: "ai",
        tags: ["AI", "NLP", "Machine Learning", "Enterprise"],
        github: "https://github.com/user/factfinder-ai",
        demo: "https://factfinder.demo.com",
        image: "/images/projects/factfinder-ai.svg",
        className: "md:col-span-1",
        featured: true,
        status: "completed",
        impact: "Verified 1M+ claims",
        year: "2024",
        longDescription:
            "FactFinder AI is an enterprise-grade fact-checking system that leverages advanced natural language processing and knowledge graphs to verify claims with unprecedented accuracy. The system processes millions of claims daily and provides real-time verification results with detailed source attribution.",
        technologies: ["Python", "TensorFlow", "BERT", "Neo4j", "FastAPI", "React"],
        features: [
            "99.2% accuracy rate in claim verification",
            "Real-time processing of text and multimedia content",
            "Integration with major news and academic databases",
            "Explainable AI with source attribution",
            "Multi-language support",
            "API for third-party integrations"
        ],
        challenges: [
            "Handling ambiguous and context-dependent claims",
            "Scaling to process millions of claims per day",
            "Maintaining accuracy across different domains",
            "Building robust knowledge graph representations"
        ],
        outcomes: [
            "Deployed to 3 major media organizations",
            "Processed over 1 million fact-check requests",
            "Achieved 99.2% accuracy rate in production",
            "Reduced manual fact-checking time by 75%"
        ],
        teamSize: 5,
    },
    {
        id: "wayfinder-dashboard",
        name: "Wayfinder Dashboard",
        description:
            "DeFi analytics platform managing $2M+ in assets. Real-time portfolio tracking, yield optimization, and risk management.",
        category: "web3",
        tags: ["DeFi", "Analytics", "Dashboard", "TypeScript"],
        github: "https://github.com/user/wayfinder",
        demo: "https://wayfinder.demo.com",
        image: "/images/projects/wayfinder-dashboard.svg",
        className: "md:col-span-1",
        featured: true,
        status: "completed",
        impact: "$2M+ tracked",
        year: "2023",
        longDescription:
            "Wayfinder Dashboard is a comprehensive DeFi analytics platform that helps users track, analyze, and optimize their decentralized finance portfolios. With real-time data aggregation from multiple protocols, advanced risk assessment, and yield optimization strategies.",
        technologies: ["TypeScript", "React", "Next.js", "Web3.js", "PostgreSQL", "The Graph"],
        features: [
            "Multi-protocol portfolio tracking",
            "Real-time yield optimization",
            "Risk assessment and alerts",
            "Historical performance analytics",
            "Cross-chain asset management",
            "Automated rebalancing strategies"
        ],
        challenges: [
            "Aggregating data from multiple DeFi protocols",
            "Handling complex smart contract interactions",
            "Ensuring real-time data accuracy",
            "Managing gas optimization strategies"
        ],
        outcomes: [
            "Managing over $2M in tracked assets",
            "500+ active users",
            "Average 15% yield improvement",
            "99.95% uptime since launch"
        ],
        teamSize: 4,
    },
    {
        id: "prompt-optimizer",
        name: "Prompt Optimizer",
        description:
            "AI cost reduction system saving 60% on LLM expenses. Intelligent prompt caching, compression, and optimization algorithms.",
        category: "tools",
        tags: ["AI", "Optimization", "Cost Reduction", "LLM"],
        github: "https://github.com/user/prompt-optimizer",
        demo: "https://prompt-optimizer.demo.com",
        image: "/images/projects/prompt-optimizer.svg",
        className: "md:col-span-2",
        status: "completed",
        impact: "60% cost savings",
        year: "2023",
        longDescription:
            "Prompt Optimizer is an intelligent system designed to reduce AI infrastructure costs through advanced prompt optimization, caching, and compression techniques. It automatically analyzes and optimizes prompts for better performance and lower token usage.",
        technologies: ["Python", "FastAPI", "Redis", "OpenAI API", "Transformers", "Docker"],
        features: [
            "Intelligent prompt caching system",
            "Automatic prompt compression",
            "Response quality monitoring",
            "Multi-model optimization",
            "Cost analytics dashboard",
            "API rate limiting and optimization"
        ],
        challenges: [
            "Maintaining response quality while reducing costs",
            "Implementing effective caching strategies",
            "Handling diverse prompt patterns",
            "Optimizing for multiple LLM providers"
        ],
        outcomes: [
            "60% reduction in AI infrastructure costs",
            "Integrated by 25+ companies",
            "Processing 1M+ prompts daily",
            "Maintained 98% response quality score"
        ],
        teamSize: 2,
    },
    {
        id: "nft-marketplace",
        name: "NFT Marketplace",
        description:
            "Decentralized marketplace for digital assets with advanced filtering, batch operations, and royalty management.",
        category: "web3",
        tags: ["NFT", "Marketplace", "Solidity", "React"],
        github: "https://github.com/user/nft-marketplace",
        demo: "https://nft-market.demo.com",
        image: "/images/projects/nft-marketplace.svg",
        className: "md:col-span-1",
        status: "completed",
        year: "2023",
        longDescription:
            "A full-featured NFT marketplace built on Ethereum with advanced features for creators, collectors, and traders. Supports multiple token standards, royalty distribution, and gas-optimized batch operations.",
        technologies: ["Solidity", "React", "Web3.js", "IPFS", "OpenSea API", "Hardhat"],
        features: [
            "Multi-standard NFT support (ERC-721, ERC-1155)",
            "Advanced search and filtering",
            "Batch minting and operations",
            "Royalty management system",
            "Auction and fixed-price listings",
            "Creator verification system"
        ],
        challenges: [
            "Optimizing gas costs for batch operations",
            "Implementing efficient royalty distribution",
            "Handling high-volume transactions",
            "Creating intuitive UX for complex operations"
        ],
        outcomes: [
            "10K+ NFTs traded",
            "$500K+ in total volume",
            "200+ verified creators",
            "Gas costs reduced by 40% vs competitors"
        ],
        teamSize: 3,
    },
    {
        id: "health-ai",
        name: "Health AI Assistant",
        description:
            "Medical diagnosis assistant using computer vision and NLP. HIPAA compliant with 95% diagnostic accuracy.",
        category: "ai",
        tags: ["AI", "Healthcare", "Computer Vision", "HIPAA"],
        github: "https://github.com/user/health-ai",
        image: "/images/projects/health-ai.svg",
        className: "md:col-span-1",
        status: "in-progress",
        year: "2024",
        longDescription:
            "A HIPAA-compliant AI assistant for medical diagnosis support, combining computer vision for medical imaging analysis with NLP for symptom assessment and patient history evaluation.",
        technologies: ["Python", "TensorFlow", "OpenCV", "FHIR", "FastAPI", "PostgreSQL"],
        features: [
            "Medical image analysis (X-rays, MRI, CT scans)",
            "Natural language symptom processing",
            "HIPAA-compliant data handling",
            "Integration with EHR systems",
            "Multi-modal diagnosis support",
            "Confidence scoring and uncertainty quantification"
        ],
        challenges: [
            "Ensuring HIPAA compliance",
            "Handling sensitive medical data",
            "Achieving high diagnostic accuracy",
            "Integrating with existing healthcare systems"
        ],
        outcomes: [
            "95% diagnostic accuracy achieved",
            "HIPAA compliance certification",
            "Pilot program with 2 hospitals",
            "Reduced diagnosis time by 30%"
        ],
        teamSize: 6,
    },
    {
        id: "defi-aggregator",
        name: "DeFi Yield Aggregator",
        description:
            "Automated yield farming across multiple protocols. Smart contract integration with risk assessment and auto-compounding.",
        category: "web3",
        tags: ["DeFi", "Yield Farming", "Smart Contracts", "Automation"],
        github: "https://github.com/user/defi-aggregator",
        image: "/images/projects/defi-aggregator.svg",
        className: "md:col-span-2",
        status: "in-progress",
        year: "2024",
        longDescription:
            "An advanced DeFi yield aggregation platform that automatically optimizes yield farming strategies across multiple protocols, with built-in risk assessment and automated compounding.",
        technologies: ["Solidity", "Hardhat", "React", "Web3.js", "Chainlink", "OpenZeppelin"],
        features: [
            "Multi-protocol yield optimization",
            "Automated strategy rebalancing",
            "Risk-adjusted returns calculation",
            "Gas-optimized smart contracts",
            "Real-time APY monitoring",
            "Impermanent loss protection"
        ],
        challenges: [
            "Managing complex protocol integrations",
            "Optimizing gas costs for automation",
            "Implementing effective risk models",
            "Handling protocol upgrades and changes"
        ],
        outcomes: [
            "15+ protocols integrated",
            "Average 12% APY improvement",
            "Beta testing with $100K TVL",
            "Gas costs optimized by 35%"
        ],
        teamSize: 4,
    },
    {
        id: "code-review-ai",
        name: "Code Review AI",
        description:
            "Intelligent code review system that catches bugs, suggests improvements, and enforces coding standards automatically.",
        category: "tools",
        tags: ["AI", "Code Review", "DevTools", "Static Analysis"],
        github: "https://github.com/user/code-review-ai",
        image: "/images/projects/code-review-ai.svg",
        className: "md:col-span-1",
        status: "planned",
        year: "2024",
        longDescription:
            "An AI-powered code review system that provides intelligent analysis of code changes, automatically detects potential issues, suggests improvements, and enforces coding standards across multiple programming languages.",
        technologies: ["Python", "OpenAI API", "AST Analysis", "GitHub API", "Docker", "FastAPI"],
        features: [
            "Multi-language code analysis",
            "Automated bug detection",
            "Code quality scoring",
            "Style guide enforcement",
            "Security vulnerability scanning",
            "Performance optimization suggestions"
        ],
        challenges: [
            "Understanding complex code contexts",
            "Providing accurate suggestions",
            "Integrating with existing workflows",
            "Handling large codebases efficiently"
        ],
        outcomes: [
            "Planning phase completed",
            "Architecture design finalized",
            "Proof of concept developed",
            "Beta testing planned for Q2 2024"
        ],
        teamSize: 3,
    },
];

export async function GET() {
    try {
        return NextResponse.json({
            success: true,
            data: projects,
            count: projects.length,
        });
    } catch {
        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch projects",
            },
            { status: 500 }
        );
    }
}