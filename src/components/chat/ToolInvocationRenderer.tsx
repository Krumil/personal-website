"use client";

import { Weather } from "@/components/generative/Weather";
import { Stock } from "@/components/generative/Stock";
import { Portfolio } from "@/components/generative/Portfolio";
import { Skills } from "@/components/generative/Skills";
import { Contact } from "@/components/generative/Contact";

type WeatherResult = {
    temperature: number;
    weather: string;
    location: string;
    humidity: number;
    windSpeed: number;
    description: string;
};

type StockResult = {
    price: number;
    symbol: string;
    change: string;
    marketCap: string;
};

type PortfolioResult = {
    category: string;
    projects: Array<{
        title: string;
        description: string;
        techStack: string[];
        metrics: Record<string, string | number>;
    }>;
    totalProjects: number;
};

type SkillsResult = {
    skillType: string;
    skills: Array<{
        name: string;
        level: number;
        years: number;
    }>;
    totalSkills: number;
};

type SocialInfo = {
    github: string;
    linkedin: string;
    twitter: string;
};

type AvailabilityInfo = {
    status: string;
    timezone: string;
    preferredContact: string;
};

type ContactResult = {
    type?: string;
    info?: string | SocialInfo | AvailabilityInfo;
    email?: string;
    social?: SocialInfo;
    availability?: AvailabilityInfo;
};

interface ToolInvocationRendererProps {
    toolInvocations: Array<{
        toolName: string;
        toolCallId: string;
        state: string;
        result?: WeatherResult | StockResult | PortfolioResult | SkillsResult | ContactResult;
    }>;
}

export const ToolInvocationRenderer = ({ toolInvocations }: ToolInvocationRendererProps) => {
    return (
        <>
            {toolInvocations?.map((toolInvocation) => {
                const { toolName, toolCallId, state } = toolInvocation;

                if (state === "result") {
                    if (toolName === "displayWeather") {
                        const { result } = toolInvocation;
                        return (
                            <div key={toolCallId} className="mt-3">
                                <Weather {...(result as WeatherResult)} />
                            </div>
                        );
                    } else if (toolName === "getStockPrice") {
                        const { result } = toolInvocation;
                        return (
                            <div key={toolCallId} className="mt-3">
                                <Stock {...(result as StockResult)} />
                            </div>
                        );
                    } else if (toolName === "showProjects") {
                        const { result } = toolInvocation;
                        return (
                            <div key={toolCallId} className="mt-3">
                                <Portfolio {...(result as PortfolioResult)} />
                            </div>
                        );
                    } else if (toolName === "showSkills") {
                        const { result } = toolInvocation;
                        return (
                            <div key={toolCallId} className="mt-3">
                                <Skills {...(result as SkillsResult)} />
                            </div>
                        );
                    } else if (toolName === "getContact") {
                        const { result } = toolInvocation;
                        return (
                            <div key={toolCallId} className="mt-3">
                                <Contact {...(result as ContactResult)} />
                            </div>
                        );
                    }
                } else {
                    // Show loading states for different tools
                    return (
                        <div key={toolCallId} className="mt-3">
                            <div className="bg-white/5 border border-white/10 rounded-lg p-3 animate-pulse">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:0.1s]"></div>
                                    <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                    <span className="text-xs text-white/60 ml-2">
                                        {toolName === "displayWeather" && "Getting weather..."}
                                        {toolName === "getStockPrice" && "Fetching stock data..."}
                                        {toolName === "showProjects" && "Loading projects..."}
                                        {toolName === "showSkills" && "Loading skills..."}
                                        {toolName === "getContact" && "Getting contact info..."}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                }
            })}
        </>
    );
};
