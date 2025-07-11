import React from "react";
import { ArrowUp, Square, Mic, Globe, Volume2, StopCircle } from "lucide-react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import { Button } from "../button";
import { Tooltip, TooltipTrigger, TooltipContent } from "../tooltip";

type VoiceState = "idle" | "connecting" | "connected" | "listening" | "speaking" | "error";

interface SubmitButtonProps {
    isLoading: boolean;
    hasContent: boolean;
    isVoiceMode: boolean;
    voiceState: VoiceState;
    onVoiceClick: () => void;
    onStopClick: () => void;
    onSubmitClick: () => void;
}

export function SubmitButton({
    isLoading,
    hasContent,
    isVoiceMode,
    voiceState,
    onVoiceClick,
    onStopClick,
    onSubmitClick,
}: SubmitButtonProps) {
    const getButtonIcon = () => {
        if (isVoiceMode) {
            switch (voiceState) {
                case "connecting":
                    return <Globe className="h-4 w-4 animate-spin" />;
                case "speaking":
                    return <Volume2 className="h-4 w-4 animate-pulse" />;
                case "listening":
                    return <Mic className="h-4 w-4 text-red-500 animate-pulse" />;
                case "connected":
                    return <StopCircle className="h-5 w-5 text-red-500" />;
                case "error":
                    return <Square className="h-4 w-4 text-destructive" />;
                default:
                    return <Mic className="h-5 w-5" />;
            }
        } else if (isLoading) {
            return <Square className="h-4 w-4 fill-current animate-pulse" />;
        } else if (hasContent) {
            return <ArrowUp className="h-4 w-4" />;
        } else {
            return <Mic className="h-5 w-5" />;
        }
    };

    const getButtonTooltip = () => {
        if (isVoiceMode) {
            const stateTexts = {
                idle: "Start voice conversation",
                connecting: "Connecting to voice service...",
                connected: "Stop voice conversation",
                listening: "Listening...",
                speaking: "AI is speaking...",
                error: "Voice conversation error",
            };
            return voiceState === "connected" ? "Stop voice conversation" : stateTexts[voiceState];
        } else if (isLoading) {
            return "Stop generation";
        } else if (hasContent) {
            return "Send message";
        } else {
            return "Start voice conversation";
        }
    };

    const handleClick = () => {
        if (isVoiceMode) {
            if (voiceState === "connected") {
                onVoiceClick();
            } else {
                onVoiceClick();
            }
        } else if (isLoading) {
            onStopClick();
        } else if (hasContent) {
            onSubmitClick();
        } else {
            onVoiceClick();
        }
    };

    const isDisabled = voiceState === "connecting";

    return (
        <div className="absolute bottom-[6px] right-2">
            <Tooltip>
                <TooltipTrigger asChild>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        <Button
                            variant="default"
                            size="icon"
                            onClick={handleClick}
                            disabled={isDisabled}
                            className={cn(
                                "h-8 w-8 rounded-full transition-all duration-200",
                                isVoiceMode && voiceState === "connected"
                                    ? "bg-transparent hover:bg-gray-600/30 text-red-500 hover:text-red-400"
                                    : hasContent
                                    ? "bg-white hover:bg-white/80 text-[#1F2023]"
                                    : "bg-transparent hover:bg-gray-600/30 text-[#9CA3AF] hover:text-[#D1D5DB]"
                            )}
                        >
                            {getButtonIcon()}
                        </Button>
                    </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                    <span className="font-technor text-xs">{getButtonTooltip()}</span>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}
