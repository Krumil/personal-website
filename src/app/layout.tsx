import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";
import { TwentyFirstToolbar } from "@21st-extension/toolbar-next";
import { ReactPlugin } from "@21st-extension/react";

import { PerformanceMonitor } from "@/components/performance/performance-monitor";
import { PerformanceProvider } from "@/components/performance/performance-provider";
import { ThemeProvider } from "@/components/theme/theme-provider";
import TransitionWrapper from "@/components/layout/TransitionWrapper";
import Navbar from "@/components/navigation/Navbar";
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
        <html lang="en" suppressHydrationWarning>
            <body className={`${supreme.variable} ${technor.variable} antialiased`}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                    <PerformanceProvider>
                        <Navbar />
                        <PerformanceMonitor />
                        <TwentyFirstToolbar config={{ plugins: [ReactPlugin] }} />
                        <Suspense
                            fallback={<div className="flex items-center justify-center w-full h-full">Loading...</div>}
                        >
                            <TransitionWrapper>{children}</TransitionWrapper>
                        </Suspense>
                    </PerformanceProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
