import localFont from "next/font/local";
import { Suspense } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import { PerformanceMonitor } from "@/components/performance/performance-monitor";
import { PerformanceProvider } from "@/components/performance/performance-provider";
import { ThemeProvider } from "@/components/theme/theme-provider";
import TransitionWrapper from "@/components/layout/TransitionWrapper";
import Navbar from "@/components/navigation/Navbar";
import "../globals.css";

const supreme = localFont({
    variable: "--font-supreme",
    display: "swap",
    src: [
        { path: "../../../public/fonts/Supreme-Thin.woff2", weight: "100", style: "normal" },
        { path: "../../../public/fonts/Supreme-Light.woff2", weight: "300", style: "normal" },
        { path: "../../../public/fonts/Supreme-Regular.woff2", weight: "400", style: "normal" },
        { path: "../../../public/fonts/Supreme-Medium.woff2", weight: "500", style: "normal" },
        { path: "../../../public/fonts/Supreme-Bold.woff2", weight: "700", style: "normal" },
    ],
});

const technor = localFont({
    variable: "--font-technor",
    display: "swap",
    src: [
        { path: "../../../public/fonts/Technor-Extralight.woff2", weight: "200", style: "normal" },
        { path: "../../../public/fonts/Technor-Light.woff2", weight: "300", style: "normal" },
        { path: "../../../public/fonts/Technor-Regular.woff2", weight: "400", style: "normal" },
        { path: "../../../public/fonts/Technor-Medium.woff2", weight: "500", style: "normal" },
        { path: "../../../public/fonts/Technor-Semibold.woff2", weight: "600", style: "normal" },
        { path: "../../../public/fonts/Technor-Bold.woff2", weight: "700", style: "normal" },
        { path: "../../../public/fonts/Technor-Black.woff2", weight: "900", style: "normal" },
    ],
});

export default async function LocaleLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    // Enable static rendering
    setRequestLocale(locale);

    // Providing all messages to the client side is the easiest way to get started
    const messages = await getMessages();

    return (
        <div className={`${supreme.variable} ${technor.variable} antialiased`}>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                    <PerformanceProvider>
                        <Navbar />
                        <PerformanceMonitor />
                        <Suspense
                            fallback={<div className="flex items-center justify-center w-full h-full">Loading...</div>}
                        >
                            <TransitionWrapper>{children}</TransitionWrapper>
                        </Suspense>
                    </PerformanceProvider>
                </ThemeProvider>
            </NextIntlClientProvider>
        </div>
    );
}
