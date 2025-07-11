import React from "react";
import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "@/i18n/routing";

import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

interface LanguageSwitcherProps {
    className?: string;
    variant?: "default" | "minimal" | "icon";
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className, variant = "default" }) => {
    const t = useTranslations("navigation");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLanguage = () => {
        const newLocale = locale === "en" ? "it" : "en";
        router.replace(pathname, { locale: newLocale });
    };

    const currentLanguage = locale === "en" ? "English" : "Italiano";
    const flagEmoji = locale === "en" ? "🇺🇸" : "🇮🇹";

    if (variant === "icon") {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleLanguage}
                                className={cn(
                                    "h-9 w-9 rounded-xl bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border border-border/50 hover:border-secondary/50 transition-all duration-300 shadow-sm hover:shadow-secondary/10",
                                    className
                                )}
                                aria-label={t("toggleLanguage")}
                            >
                                <span className="text-lg font-medium" role="img" aria-label={currentLanguage}>
                                    {flagEmoji}
                                </span>
                            </Button>
                        </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <span className="font-technor">{t("toggleLanguage")}</span>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    if (variant === "minimal") {
        return (
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleLanguage}
                    className={cn(
                        "h-8 px-3 rounded-lg bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-sm border border-border/30 hover:border-secondary/40 transition-all duration-300 font-technor text-xs",
                        className
                    )}
                >
                    <Globe className="h-3 w-3 mr-1.5 text-secondary" />
                    {locale.toUpperCase()}
                </Button>
            </motion.div>
        );
    }

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={className}
        >
            <Button
                variant="outline"
                onClick={toggleLanguage}
                className="h-10 px-4 rounded-xl bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border border-border/50 hover:border-secondary/50 transition-all duration-300 shadow-sm hover:shadow-secondary/10 font-technor"
            >
                <span className="text-base mr-2" role="img" aria-label={currentLanguage}>
                    {flagEmoji}
                </span>
                <span className="text-sm font-medium">{currentLanguage}</span>
                <Globe className="h-4 w-4 ml-2 text-secondary opacity-70" />
            </Button>
        </motion.div>
    );
};
