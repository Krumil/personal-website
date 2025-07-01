"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface MinimalistProjectCardProps {
    number: string;
    title: string;
    description: string;
    tech: string[];
    year: string;
    impact?: string;
}

export default function MinimalistProjectCard({
    number,
    title,
    description,
    tech,
    year,
    impact,
}: MinimalistProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="group border-t border-white/10 last:border-b"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="py-8 cursor-pointer">
                <div className="grid grid-cols-12 gap-8 items-start">
                    <div className="col-span-1">
                        <div className="text-sm text-white/40 font-mono">{number}</div>
                    </div>
                    <div className="col-span-7 md:col-span-6">
                        <h3 className="text-2xl md:text-3xl font-bold group-hover:text-white/60 transition-colors mb-3">
                            {title}
                        </h3>
                        <p className="text-white/60 mb-4 leading-relaxed">{description}</p>
                        <div className="flex flex-wrap gap-2">
                            {tech.map((item, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-white/5 text-white/50 rounded text-xs border border-white/10"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                    {impact && (
                        <div className="col-span-2 md:col-span-2">
                            <div className="text-sm text-white/40 mb-1">IMPACT</div>
                            <div className="font-bold text-white/80">{impact}</div>
                        </div>
                    )}
                    <div className="col-span-1">
                        <div className="text-sm text-white/40 font-mono">{year}</div>
                    </div>
                    <div className="col-span-1">
                        <ArrowUpRight
                            className={`w-6 h-6 transition-transform ${
                                isHovered ? "translate-x-1 -translate-y-1" : ""
                            }`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
