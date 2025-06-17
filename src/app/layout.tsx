import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";
import { AnimatedGridPatternOptimized } from "@/components/ui/animated-grid-pattern-optimized";
import { PerformanceMonitor } from "@/components/performance-monitor";
import { PerformanceProvider } from "@/components/performance-provider";
import { cn } from "@/lib/utils";
import "./globals.css";

const supreme = localFont({
    variable: "--font-supreme",
    display: "swap",
    src: [
        { path: "../../public/fonts/Supreme-Thin.woff2", weight: "100", style: "normal" },
        { path: "../../public/fonts/Supreme-Light.woff2", weight: "300", style: "normal" },
        { path: "../../public/fonts/Supreme-Regular.woff2", weight: "400", style: "normal" },
        { path: "../../public/fonts/Supreme-Medium.woff2", weight: "500", style: "normal" },
        { path: "../../public/fonts/Supreme-Bold.woff2", weight: "700", style: "normal" },
    ],
});

const technor = localFont({
    variable: "--font-technor",
    display: "swap",
    src: [
        { path: "../../public/fonts/Technor-Extralight.woff2", weight: "200", style: "normal" },
        { path: "../../public/fonts/Technor-Light.woff2", weight: "300", style: "normal" },
        { path: "../../public/fonts/Technor-Regular.woff2", weight: "400", style: "normal" },
        { path: "../../public/fonts/Technor-Medium.woff2", weight: "500", style: "normal" },
        { path: "../../public/fonts/Technor-Semibold.woff2", weight: "600", style: "normal" },
        { path: "../../public/fonts/Technor-Bold.woff2", weight: "700", style: "normal" },
        { path: "../../public/fonts/Technor-Black.woff2", weight: "900", style: "normal" },
    ],
});

export const metadata: Metadata = {
    title: "Simone Saletti | AI & Blockchain Developer",
    description: "Simone Saletti is a developer specializing in artificial intelligence and blockchain technologies.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <head>
                {/* Preload critical fonts for better performance */}
                <link rel="preload" href="/fonts/Supreme-Regular.woff2" as="font" type="font/woff2" crossOrigin="" />
                <link rel="preload" href="/fonts/Technor-Regular.woff2" as="font" type="font/woff2" crossOrigin="" />
                {/* DNS prefetch for better performance */}
                <link rel="dns-prefetch" href="//fonts.googleapis.com" />
                <link rel="preconnect" href="//fonts.googleapis.com" crossOrigin="" />
            </head>
            <body className={`${supreme.variable} ${technor.variable} antialiased`}>
                <PerformanceProvider>
                    {/* Global Animated Grid Background - Optimized */}
                    <AnimatedGridPatternOptimized
                        numSquares={40}
                        maxOpacity={0.15}
                        duration={3}
                        className={cn(
                            "fixed inset-0 -z-10 skew-y-12",
                            "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
                        )}
                    />

                    <PerformanceMonitor />
                    <Suspense
                        fallback={<div className="flex items-center justify-center w-full h-full">Loading...</div>}
                    >
                        {children}
                    </Suspense>
                </PerformanceProvider>
            </body>
        </html>
    );
}
