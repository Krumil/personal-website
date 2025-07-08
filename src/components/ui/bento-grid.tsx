import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const BentoGrid = ({ children, className }: { children: ReactNode; className?: string }) => {
    return <div className={cn("grid w-full auto-rows-[22rem] grid-cols-3 gap-4", className)}>{children}</div>;
};

const BentoCard = ({
    name,
    className,
    background,
    description,
    href,
    cta,
    backgroundImageUrl = "/test.avif",
    backgroundImageAlt,
    cardUrl = "https://www.google.com",
    projectId,
    onClick,
}: {
    name: string;
    className: string;
    background: ReactNode;
    description: string;
    href: string;
    cta: string;
    backgroundImageUrl?: string;
    backgroundImageAlt?: string;
    cardUrl?: string;
    projectId?: string;
    onClick?: () => void;
}) => {
    const handleClick = (e: React.MouseEvent) => {
        if (onClick) {
            e.preventDefault();
            e.stopPropagation();
            onClick();
            return;
        }
        // Default behavior for external links
        if (cardUrl) {
            window.open(cardUrl, "_blank");
        }
    };

    return (
        <motion.div
            layoutId={projectId ? `card-container-${projectId}` : undefined}
            key={name}
            onClick={handleClick}
            className={cn(
                "group relative flex flex-col justify-end overflow-hidden rounded-xl cursor-pointer h-full w-full",
                "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
                className
            )}
            layout
            transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
                mass: 0.8,
            }}
        >
            {/* Background Image */}
            {backgroundImageUrl && (
                <motion.div
                    layoutId={projectId ? `card-image-container-${projectId}` : undefined}
                    className="absolute inset-0 -z-10"
                    transition={{
                        type: "spring",
                        damping: 30,
                        stiffness: 300,
                        mass: 0.8,
                    }}
                >
                    <Image
                        src={backgroundImageUrl}
                        alt={backgroundImageAlt || name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                </motion.div>
            )}

            {/* Additional background elements if provided */}
            <div className="pointer-events-none absolute inset-0 -z-20">{background}</div>

            <motion.div
                layoutId={projectId ? `title-container-${projectId}` : undefined}
                className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10"
                transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 300,
                    mass: 0.8,
                }}
            >
                <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">{name}</h3>
                <p className="max-w-lg text-neutral-400">{description}</p>
            </motion.div>

            <div
                className={cn(
                    "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                )}
            >
                <Button variant="ghost" size="sm" className="pointer-events-auto">
                    {cardUrl ? (
                        <span className="flex items-center">
                            {cta}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </span>
                    ) : (
                        <a href={href} className="flex items-center">
                            {cta}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                    )}
                </Button>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent z-[1]" />
            <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
        </motion.div>
    );
};

export { BentoCard, BentoGrid };
