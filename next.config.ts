import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Enable React 19 features
    reactStrictMode: true,

    // Next.js 15+ performance optimizations
    experimental: {
        // Enable React Compiler (React 19 feature)
        reactCompiler: true,
        // Optimize package imports
        optimizePackageImports: ["framer-motion", "motion"],
    },

    // Server external packages (moved from experimental)
    serverExternalPackages: ["three"],

    // Turbopack configuration
    turbopack: {
        // Configure webpack loaders for Turbopack
        rules: {
            // SVG support with SVGR
            "*.svg": {
                loaders: ["@svgr/webpack"],
                as: "*.js",
            },
            // GLSL shader support for Three.js
            "*.glsl": {
                loaders: ["raw-loader"],
                as: "*.js",
            },
            // Fragment shaders
            "*.frag": {
                loaders: ["raw-loader"],
                as: "*.js",
            },
            // Vertex shaders
            "*.vert": {
                loaders: ["raw-loader"],
                as: "*.js",
            },
        },
        // Resolve aliases for better imports
        resolveAlias: {
            // Three.js optimizations
            "three/examples/jsm": "three/examples/jsm",
            // Common aliases
            "@": "./src",
            "@/components": "./src/components",
            "@/lib": "./src/lib",
            "@/utils": "./src/utils",
        },
        // Custom extensions resolution
        resolveExtensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".glsl", ".frag", ".vert"],
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
    webpack: (config, { dev, isServer }) => {
        // Optimize Three.js bundle
        if (!isServer) {
            config.resolve.alias = {
                ...config.resolve.alias,
                "three/examples/jsm": "three/examples/jsm",
            };
        }

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

export default nextConfig;
