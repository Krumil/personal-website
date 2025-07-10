import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
    // Enable React 19 features
    reactStrictMode: true,

    // Next.js 15+ performance optimizations
    experimental: {
        // Enable React Compiler (React 19 feature)
        reactCompiler: true,
        // Optimize package imports
        optimizePackageImports: ["motion"],
    },


    // Turbopack configuration
    turbopack: {
        // Resolve aliases for better imports
        resolveAlias: {
            "@": "./src",
            "@/components": "./src/components",
            "@/lib": "./src/lib",
            "@/utils": "./src/utils",
        },
        // Custom extensions resolution
        resolveExtensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },

    // Image optimization
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "placehold.co",
                pathname: "/**",
            },
        ],
        // Enable modern image formats
        formats: ["image/avif", "image/webp"],
        // Optimize for performance
        minimumCacheTTL: 31536000, // 1 year
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },

    // Bundle optimization
    webpack: (config, { dev }) => {
        // Tree shake unused code more aggressively
        if (!dev) {
            config.optimization.usedExports = true;
            config.optimization.sideEffects = false;
        }

        return config;
    },

    // Enable compression
    compress: true,
};

export default withNextIntl(nextConfig);
