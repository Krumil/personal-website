"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

import { BoxReveal } from "@/components/ui/box-reveal";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center py-20 px-8">
            <div className="max-w-2xl mx-auto text-center">
                <div className="mb-8">
                    <BoxReveal>
                        <h1 className="text-8xl md:text-9xl font-technor font-bold text-foreground">404</h1>
                    </BoxReveal>
                </div>

                <div className="mb-8">
                    <BoxReveal>
                        <h2 className="text-2xl md:text-4xl font-technor font-bold mb-4 text-foreground">
                            Page Not Found
                        </h2>
                    </BoxReveal>
                </div>

                <div className="mb-12">
                    <BoxReveal>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            The page you're looking for doesn't exist.
                        </p>
                    </BoxReveal>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                    <BoxReveal>
                        <Link href="/">
                            <Button size="lg" className="flex items-center gap-2">
                                <Home className="w-4 h-4" />
                                Go Home
                            </Button>
                        </Link>
                    </BoxReveal>

                    <BoxReveal>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => window.history.back()}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Go Back
                        </Button>
                    </BoxReveal>
                </div>
            </div>
        </div>
    );
}
