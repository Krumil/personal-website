"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { HyperText } from "@/components/ui/hyper-text";
import HeroCards from "@/components/HeroCards";

const Spotlight = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    return (
        <div className={`relative ${className}`}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[200px] max-h-[200px] bg-primary/20 rounded-full blur-[80px] opacity-70" />
            {children}
        </div>
    );
};

export default function HeroSection() {
    const [animateCreating, setAnimateCreating] = useState(false);
    const [animateThoughtful, setAnimateThoughtful] = useState(false);
    const [animateExperiences, setAnimateExperiences] = useState(false);

    useEffect(() => {
        setAnimateCreating(true);
        const timer2 = setTimeout(() => setAnimateThoughtful(true), 700);
        const timer3 = setTimeout(() => setAnimateExperiences(true), 1400);

        return () => {
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    return (
        <section className="pt-16 md:pt-32 pb-20 px-2 md:px-8 relative overflow-hidden h-screen flex-col flex justify-center items-center">
            <div className="max-w-7xl w-full">
                <div className="relative border border-border/20 rounded-3xl p-8 overflow-hidden bg-card/90 backdrop-blur-sm w-full flex flex-col items-start h-[calc(100vh-10rem)]">
                    <div className="mb-48 md:mb-32">
                        <Spotlight>
                            <HyperText
                                text="CREATING"
                                duration={500}
                                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-none"
                                animateOnLoad={animateCreating}
                            />
                            <HyperText
                                text="THOUGHTFUL"
                                duration={500}
                                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-none text-secondary/60"
                                animateOnLoad={animateThoughtful}
                            />
                            <HyperText
                                text="EXPERIENCES"
                                duration={500}
                                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-none"
                                animateOnLoad={animateExperiences}
                            />
                        </Spotlight>

                        <div className="max-w-2xl">
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="text-base md:text-xl text-muted-foreground leading-relaxed mb-8 font-light"
                            >
                                I build AI systems that feel human and blockchain applications that make sense. My work
                                sits at the intersection of technology and empathy - creating tools that understand
                                people, not just data.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="flex flex-wrap gap-4"
                            >
                                <Button
                                    size="lg"
                                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                >
                                    See my work
                                    <ArrowUpRight className="w-5 h-5 ml-2" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-all"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                >
                                    Let's talk
                                </Button>
                            </motion.div>
                        </div>
                    </div>

                    <HeroCards />
                </div>
            </div>
        </section>
    );
}
