import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ["en", "it"],

    // Used when no locale matches
    defaultLocale: "en",

    // Hide the default locale from the URL
    localePrefix: {
        mode: "as-needed",
    },

    // When this is used on subpaths (e.g. /en/about)
    pathnames: {
        "/": "/",
        "/about": {
            en: "/about",
            it: "/chi-sono",
        },
        "/contact": {
            en: "/contact",
            it: "/contatti",
        },
        "/projects": {
            en: "/projects",
            it: "/progetti",
        },
        "/blog": {
            en: "/blog",
            it: "/blog",
        },
        "/experience": {
            en: "/experience",
            it: "/esperienza",
        },
    },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
