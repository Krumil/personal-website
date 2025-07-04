import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";

import { PerformanceMonitor } from "@/components/performance-monitor";
import { PerformanceProvider } from "@/components/performance-provider";
import TransitionWrapper from "@/components/TransitionWrapper";
import MinimalistNavbar from "@/components/MinimalistNavbar";
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
            <body className={`${supreme.variable} ${technor.variable} antialiased`}>
                <PerformanceProvider>
                    {/* Global Animated Grid Background - Optimized */}

                    <MinimalistNavbar />
                    <PerformanceMonitor />
                    <Suspense
                        fallback={<div className="flex items-center justify-center w-full h-full">Loading...</div>}
                    >
                        <TransitionWrapper>{children}</TransitionWrapper>
                    </Suspense>
                </PerformanceProvider>
            </body>
        </html>
    );
}
