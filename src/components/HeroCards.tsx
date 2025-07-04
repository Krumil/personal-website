"use client";

import { Code2, Hexagon } from "lucide-react";
import Image from "next/image";

import CardSwap, { Card } from "@/components/ui/card-swap";

export default function HeroCards() {
    return (
        <CardSwap cardDistance={60} verticalDistance={70} delay={5000} pauseOnHover={false}>
            {/* Card 1: Multimodal AI */}
            <Card customClass="flex flex-col w-full h-full bg-card text-card-foreground overflow-hidden">
                {/* Browser-like header */}
                <div className="flex items-center justify-between bg-foreground/5 px-4 py-2">
                    <div className="flex gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full" />
                        <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                    </div>
                    <span className="text-xs text-foreground/70 absolute top-0 left-1/2 -translate-x-1/2">
                        Metaflags.app
                    </span>
                </div>

                {/* Body */}
                <div className="relative flex-1 p-6">
                    <Image
                        src="/images/projects/metaflags.png"
                        alt="Metaflags logo"
                        fill
                        className="object-contain w-full h-full"
                    />
                </div>
            </Card>

            {/* Card 2: Web3 Native */}
            <Card customClass="flex flex-col w-full h-full bg-card text-card-foreground overflow-hidden">
                <div className="flex items-center justify-between bg-foreground/5 px-4 py-2">
                    <div className="flex gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full" />
                        <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                    </div>
                    <span className="text-xs text-foreground/70 absolute top-0 left-1/2 -translate-x-1/2">
                        web3.native
                    </span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 text-center">
                    <Hexagon className="w-10 h-10 text-primary" />
                    <h3 className="text-xl font-semibold">Web3-Native</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Secure interactions &amp; verifiable data on-chain by default.
                    </p>
                </div>
            </Card>

            {/* Card 3: Dev-First API */}
            <Card customClass="flex flex-col w-full h-full bg-card text-card-foreground overflow-hidden">
                <div className="flex items-center justify-between bg-foreground/5 px-4 py-2">
                    <div className="flex gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full" />
                        <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                    </div>
                    <span className="text-xs text-foreground/70 absolute top-0 left-1/2 -translate-x-1/2">api.dev</span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 text-center">
                    <Code2 className="w-10 h-10 text-primary" />
                    <h3 className="text-xl font-semibold">Dev-First API</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Type-safe hooks &amp; composable components that just work.
                    </p>
                </div>
            </Card>
        </CardSwap>
    );
}
