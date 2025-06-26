"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useCallback } from "react";

interface ViewTransitionProps {
    children: ReactNode;
}

// Check if View Transitions API is supported
const supportsViewTransitions = () => {
    return typeof window !== "undefined" && "startViewTransition" in document;
};

export function ViewTransition({ children }: ViewTransitionProps) {
    const router = useRouter();

    const handleNavigation = useCallback((href: string) => {
        if (!supportsViewTransitions()) {
            router.push(href);
            return;
        }

        // Use View Transitions API for smooth native transitions
        (document as any).startViewTransition(() => {
            router.push(href);
        });
    }, [router]);

    return (
        <div data-view-transition-name="main-content">
            {children}
        </div>
    );
}

// Enhanced Link component with View Transitions
export function TransitionLink({ 
    href, 
    children, 
    className,
    ...props 
}: {
    href: string;
    children: ReactNode;
    className?: string;
    [key: string]: any;
}) {
    const router = useRouter();

    const handleClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();

        if (!supportsViewTransitions()) {
            router.push(href);
            return;
        }

        (document as any).startViewTransition(() => {
            router.push(href);
        });
    }, [href, router]);

    return (
        <a 
            href={href} 
            onClick={handleClick}
            className={className}
            {...props}
        >
            {children}
        </a>
    );
}