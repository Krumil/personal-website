import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import QuantumLoading from "../components/QuantumLoading";
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
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Suspense fallback={<QuantumLoading />}>{children}</Suspense>
            </body>
        </html>
    );
}
