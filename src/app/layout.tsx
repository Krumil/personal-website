import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Simone Saletti | AI & Blockchain Developer",
    description: "Simone Saletti is a developer specializing in artificial intelligence and blockchain technologies.",
};

// This is the root layout that handles non-localized routes (like API routes)
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html suppressHydrationWarning>
            <body>{children}</body>
        </html>
    );
}
