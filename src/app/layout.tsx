import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import QuantumLoading from "../components/QuantumLoading";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Quantum Portfolio | AI & Blockchain Developer",
    description:
        "A portfolio in quantum superposition - simultaneously an AI Engineer and Blockchain Developer. Your observation will collapse the wave function.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                {/* Global Animated Grid Background */}
                <AnimatedGridPattern
                    numSquares={60}
                    maxOpacity={0.15}
                    duration={2}
                    repeatDelay={1}
                    className={cn(
                        "fixed inset-0 -z-10 skew-y-12",
                        "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
                    )}
                />

                <Suspense fallback={<QuantumLoading />}>{children}</Suspense>
            </body>
        </html>
    );
}
