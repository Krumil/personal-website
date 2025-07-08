import { tool as createTool } from "ai";
import { z } from "zod";

// Weather Tool
export const weatherTool = createTool({
    description: "Display the weather for a location",
    parameters: z.object({
        location: z.string().describe("The location to get the weather for"),
    }),
    execute: async function ({ location }) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return {
            weather: "Sunny",
            temperature: 22,
            location,
            humidity: 65,
            windSpeed: 12,
            description: "Clear skies with plenty of sunshine",
        };
    },
});

// Stock Tool
export const stockTool = createTool({
    description: "Get price information for a stock symbol",
    parameters: z.object({
        symbol: z.string().describe("The stock symbol to get the price for (e.g., AAPL, GOOGL)"),
    }),
    execute: async function ({ symbol }) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const mockPrices: Record<string, number> = {
            AAPL: 175.25,
            GOOGL: 142.8,
            MSFT: 378.5,
            TSLA: 248.75,
            NVDA: 875.3,
        };
        return {
            symbol: symbol.toUpperCase(),
            price: mockPrices[symbol.toUpperCase()] || 100.0,
            change: Math.random() > 0.5 ? "+2.5%" : "-1.2%",
            marketCap: "2.8T",
        };
    },
});

// Portfolio Project Showcase Tool
export const portfolioTool = createTool({
    description: "Show detailed information about Simone's projects",
    parameters: z.object({
        category: z.enum(["ai", "blockchain", "fullstack", "all"]).describe("The category of projects to show"),
    }),
    execute: async function ({ category }) {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const projects = {
            ai: [
                {
                    title: "AI-Powered Portfolio Assistant",
                    description:
                        "This very chatbot you're talking to! Built with Next.js, OpenAI API, and streaming responses.",
                    techStack: ["Next.js", "OpenAI API", "TypeScript", "Tailwind CSS"],
                    metrics: { performance: "< 100ms response time", users: 500 },
                },
                {
                    title: "Computer Vision App",
                    description: "Real-time image classification using TensorFlow.js",
                    techStack: ["TensorFlow.js", "React", "Python"],
                    metrics: { accuracy: "95%", users: 1200 },
                },
            ],
            blockchain: [
                {
                    title: "Multi-Chain Crypto Wallet",
                    description: "Secure wallet supporting Ethereum, Bitcoin, and Solana networks",
                    techStack: ["React", "Web3.js", "Ethers.js", "Solana SDK"],
                    metrics: { users: 2500, transactions: "50K+" },
                },
            ],
            fullstack: [
                {
                    title: "E-commerce Platform",
                    description: "Full-stack solution with payment processing and analytics",
                    techStack: ["Next.js", "PostgreSQL", "Stripe", "Prisma"],
                    metrics: { users: 5000, uptime: "99.9%" },
                },
            ],
        };

        if (category === "all") {
            return {
                category,
                projects: [...projects.ai, ...projects.blockchain, ...projects.fullstack],
                totalProjects: 5,
            };
        }

        return {
            category,
            projects: projects[category] || [],
            totalProjects: projects[category]?.length || 0,
        };
    },
});

// Skills Assessment Tool
export const skillsTool = createTool({
    description: "Display Simone's technical skills and proficiency levels",
    parameters: z.object({
        skillType: z.enum(["frontend", "backend", "ai", "blockchain", "all"]).describe("The type of skills to show"),
    }),
    execute: async function ({ skillType }) {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const skills = {
            frontend: [
                { name: "React/Next.js", level: 95, years: 4 },
                { name: "TypeScript", level: 90, years: 3 },
                { name: "Tailwind CSS", level: 88, years: 2 },
            ],
            backend: [
                { name: "Node.js", level: 92, years: 4 },
                { name: "PostgreSQL", level: 85, years: 3 },
                { name: "GraphQL", level: 80, years: 2 },
            ],
            ai: [
                { name: "OpenAI API", level: 88, years: 2 },
                { name: "TensorFlow", level: 75, years: 1 },
                { name: "Langchain", level: 82, years: 1 },
            ],
            blockchain: [
                { name: "Ethereum/Solidity", level: 85, years: 2 },
                { name: "Web3.js", level: 90, years: 2 },
                { name: "DeFi Protocols", level: 78, years: 1 },
            ],
        };

        if (skillType === "all") {
            return {
                skillType,
                skills: [...skills.frontend, ...skills.backend, ...skills.ai, ...skills.blockchain],
                totalSkills: 13,
            };
        }

        return {
            skillType,
            skills: skills[skillType] || [],
            totalSkills: skills[skillType]?.length || 0,
        };
    },
});

// Contact Information Tool
export const contactTool = createTool({
    description: "Show Simone's contact information and availability",
    parameters: z.object({
        type: z.enum(["email", "social", "availability", "all"]).describe("The type of contact info to show"),
    }),
    execute: async function ({ type }) {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const contactInfo = {
            email: "simone@example.com",
            social: {
                github: "github.com/simonesaletti",
                linkedin: "linkedin.com/in/simonesaletti",
                twitter: "@simonesaletti",
            },
            availability: {
                status: "Open to opportunities",
                timezone: "CET (GMT+1)",
                preferredContact: "Email or LinkedIn",
            },
        };

        if (type === "all") {
            return contactInfo;
        }

        return {
            type,
            info: contactInfo[type as keyof typeof contactInfo],
        };
    },
});

export const tools = {
    displayWeather: weatherTool,
    getStockPrice: stockTool,
    showProjects: portfolioTool,
    showSkills: skillsTool,
    getContact: contactTool,
};
