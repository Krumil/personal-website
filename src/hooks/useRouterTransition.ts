"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useCallback, useTransition } from "react";

interface UseRouterTransitionReturn {
    navigate: (href: string) => Promise<void>;
    isNavigating: boolean;
    currentPath: string;
}

export function useRouterTransition(): UseRouterTransitionReturn {
    const router = useRouter();
    const pathname = usePathname();
    const [isNavigating, setIsNavigating] = useState(false);
    const [isPending, startTransition] = useTransition();

    const navigate = useCallback(
        async (href: string) => {
            if (href === pathname) return;

            setIsNavigating(true);

            // Add a small delay to allow exit animations to play
            await new Promise((resolve) => setTimeout(resolve, 150));

            startTransition(() => {
                router.push(href);
            });

            // Reset navigating state after transition
            setTimeout(() => {
                setIsNavigating(false);
            }, 300);
        },
        [router, pathname]
    );

    return {
        navigate,
        isNavigating: isNavigating || isPending,
        currentPath: pathname,
    };
}
