import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Suspense } from "react";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
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
            <body className={`${supreme.variable} ${technor.variable} antialiased`}>
                {/* Global Animated Grid Background */}
                <AnimatedGridPattern
                    numSquares={60}
                    maxOpacity={0.15}
                    duration={2}
                    className={cn(
                        "fixed inset-0 -z-10 skew-y-12",
                        "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
                    )}
                />

                <Suspense fallback={<div className="flex items-center justify-center w-full h-full">Loading...</div>}>
                    {children}
                </Suspense>
            </body>
        </html>
    );
}
