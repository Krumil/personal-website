"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useCallback, useState } from "react";
import { motion } from "motion/react";

interface TransitionLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    [key: string]: any;
}

export function TransitionLink({ 
    href, 
    children, 
    className,
    onClick,
    ...props 
}: TransitionLinkProps) {
    const router = useRouter();
    const [isNavigating, setIsNavigating] = useState(false);

    const handleClick = useCallback(async (e: React.MouseEvent) => {
        e.preventDefault();
        
        if (isNavigating) return;
        
        setIsNavigating(true);
        
        // Call custom onClick if provided
        if (onClick) {
            onClick();
        }

        // Small delay to allow any exit animations to start
        await new Promise(resolve => setTimeout(resolve, 100));
        
        router.push(href);
        
        // Reset after navigation
        setTimeout(() => {
            setIsNavigating(false);
        }, 500);
    }, [href, router, onClick, isNavigating]);

    return (
        <motion.a 
            href={href} 
            onClick={handleClick}
            className={className}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
                opacity: isNavigating ? 0.7 : 1,
                pointerEvents: isNavigating ? "none" : "auto",
            }}
            {...props}
        >
            {children}
        </motion.a>
    );
}