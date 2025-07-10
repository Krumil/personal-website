import React from "react";
import { motion } from "motion/react";
import { ArrowUp, Square, X, Mic, Globe, BrainCog, MessageSquare, Volume2, StopCircle } from "lucide-react";
import { RealtimeAgent, RealtimeSession } from "@openai/agents/realtime";

import { processImageFile, getImageFilesFromItems } from "@/utils/fileUtils";
import { cn } from "@/lib/utils";

import { Suggestions, type Suggestion } from "./suggestions";
import { Button } from "./button";
import { Textarea } from "./textarea";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./tooltip";
import { ImageViewDialog } from "./image-view-dialog";

// PromptInput Context and Components
interface PromptInputContextType {
    isLoading: boolean;
    value: string;
    setValue: (value: string) => void;
    maxHeight: number | string;
    onSubmit?: () => void;
    disabled?: boolean;
}

const PromptInputContext = React.createContext<PromptInputContextType>({
    isLoading: false,
    value: "",
    setValue: () => {},
    maxHeight: 240,
    onSubmit: undefined,
    disabled: false,
});

function usePromptInput() {
    const context = React.useContext(PromptInputContext);
    if (!context) throw new Error("usePromptInput must be used within a PromptInput");
    return context;
}

interface PromptInputProps {
    isLoading?: boolean;
    value?: string;
    onValueChange?: (value: string) => void;
    maxHeight?: number | string;
    onSubmit?: () => void;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    onDragOver?: (e: React.DragEvent) => void;
    onDragLeave?: (e: React.DragEvent) => void;
    onDrop?: (e: React.DragEvent) => void;
}

const PromptInput = React.forwardRef<HTMLDivElement, PromptInputProps>(
    (
        {
            className,
            isLoading = false,
            maxHeight = 240,
            value,
            onValueChange,
            onSubmit,
            children,
            disabled = false,
            onDragOver,
            onDragLeave,
            onDrop,
        },
        ref
    ) => {
        const [internalValue, setInternalValue] = React.useState(value || "");
        const handleChange = (newValue: string) => {
            setInternalValue(newValue);
            onValueChange?.(newValue);
        };
        return (
            <TooltipProvider>
                <PromptInputContext.Provider
                    value={{
                        isLoading,
                        value: value ?? internalValue,
                        setValue: onValueChange ?? handleChange,
                        maxHeight,
                        onSubmit,
                        disabled,
                    }}
                >
                    <div
                        ref={ref}
                        className={cn(
                            "rounded-xl border border-border/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm px-3 py-2 shadow-lg transition-all duration-300",
                            isLoading && "border-red-500/50 shadow-red-500/20",
                            className
                        )}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                    >
                        {children}
                    </div>
                </PromptInputContext.Provider>
            </TooltipProvider>
        );
    }
);
PromptInput.displayName = "PromptInput";

interface PromptInputTextareaProps {
    disableAutosize?: boolean;
    placeholder?: string;
}

const PromptInputTextarea: React.FC<PromptInputTextareaProps & React.ComponentProps<typeof Textarea>> = ({
    className,
    onKeyDown,
    disableAutosize = false,
    placeholder,
    ...props
}) => {
    const { value, setValue, maxHeight, onSubmit, disabled } = usePromptInput();
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {
        if (disableAutosize || !textareaRef.current) return;
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height =
            typeof maxHeight === "number"
                ? `${Math.min(textareaRef.current.scrollHeight, maxHeight)}px`
                : `min(${textareaRef.current.scrollHeight}px, ${maxHeight})`;
    }, [value, maxHeight, disableAutosize]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit?.();
        }
        onKeyDown?.(e);
    };

    return (
        <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={cn(
                "text-base font-mono bg-transparent border-0 resize-none focus:ring-0 focus:outline-none",
                className
            )}
            disabled={disabled}
            placeholder={placeholder}
            {...props}
        />
    );
};

interface PromptInputActionProps extends React.ComponentProps<typeof Tooltip> {
    tooltip: React.ReactNode;
    children: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    className?: string;
}

const PromptInputAction: React.FC<PromptInputActionProps> = ({
    tooltip,
    children,
    className,
    side = "top",
    ...props
}) => {
    const { disabled } = usePromptInput();
    return (
        <Tooltip {...props}>
            <TooltipTrigger asChild disabled={disabled}>
                {children}
            </TooltipTrigger>
            <TooltipContent side={side} className={className}>
                {tooltip}
            </TooltipContent>
        </Tooltip>
    );
};

// Voice chat state type
type VoiceState = "idle" | "connecting" | "connected" | "speaking" | "listening" | "error";

// Main PromptInputBox Component
interface PromptInputBoxProps {
    onSend?: (message: string, files?: File[]) => void;
    isLoading?: boolean;
    placeholder?: string;
    className?: string;
    suggestions?: Suggestion[];
    onSelectSuggestion?: (suggestion: Suggestion) => void;
    showDefaultSuggestions?: boolean;
}

export const PromptInputBox = React.forwardRef<HTMLDivElement, PromptInputBoxProps>((props, ref) => {
    const {
        onSend = () => {},
        isLoading = false,
        placeholder = "Type your message here...",
        className,
        suggestions = [],
        onSelectSuggestion = () => {},
        showDefaultSuggestions = true,
    } = props;

    const [input, setInput] = React.useState("");
    const [files, setFiles] = React.useState<File[]>([]);
    const [filePreviews, setFilePreviews] = React.useState<{ [key: string]: string }>({});
    const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

    // Voice conversation state
    const [voiceState, setVoiceState] = React.useState<VoiceState>("idle");
    const [voiceSession, setVoiceSession] = React.useState<RealtimeSession | null>(null);
    const [voiceError, setVoiceError] = React.useState<string | null>(null);
    const [lastUserMessage, setLastUserMessage] = React.useState("");
    const [lastAIMessage, setLastAIMessage] = React.useState("");
    const [isVoiceMode, setIsVoiceMode] = React.useState(false);

    const promptBoxRef = React.useRef<HTMLDivElement>(null);

    const processFile = React.useCallback(async (file: File) => {
        try {
            const preview = await processImageFile(file);
            setFiles([file]);
            setFilePreviews({ [file.name]: preview });
        } catch (error) {
            console.warn(error instanceof Error ? error.message : "File processing failed");
        }
    }, []);

    const handleDragOver = React.useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragLeave = React.useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = React.useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            const imageFiles = getImageFilesFromItems(e.dataTransfer.items);
            if (imageFiles.length > 0) processFile(imageFiles[0]);
        },
        [processFile]
    );

    const handleRemoveFile = (index: number) => {
        const fileToRemove = files[index];
        if (fileToRemove && filePreviews[fileToRemove.name]) setFilePreviews({});
        setFiles([]);
    };

    const openImageModal = (imageUrl: string) => setSelectedImage(imageUrl);

    const handlePaste = React.useCallback(
        (e: ClipboardEvent) => {
            const items = e.clipboardData?.items;
            if (!items) return;
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf("image") !== -1) {
                    const file = items[i].getAsFile();
                    if (file) {
                        e.preventDefault();
                        processFile(file);
                        break;
                    }
                }
            }
        },
        [processFile]
    );

    React.useEffect(() => {
        document.addEventListener("paste", handlePaste);
        return () => document.removeEventListener("paste", handlePaste);
    }, [handlePaste]);

    const handleSubmit = () => {
        if (input.trim() || files.length > 0) {
            onSend(input, files);
            setInput("");
            setFiles([]);
            setFilePreviews({});
        }
    };

    const handleSelectSuggestion = (suggestion: Suggestion) => {
        setInput(suggestion.text);
        onSelectSuggestion(suggestion);
    };

    // Voice conversation functions
    const startVoiceConversation = async () => {
        if (voiceState === "connecting" || voiceState === "connected") return;

        setVoiceState("connecting");
        setVoiceError(null);
        setIsVoiceMode(true);

        try {
            // Get ephemeral token
            const response = await fetch("/api/realtime/sessions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "gpt-4o-realtime-preview-2025-06-03",
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to get token");
            }

            const { clientSecret } = await response.json();

            // Create agent
            const agent = new RealtimeAgent({
                name: "Portfolio Assistant",
                instructions:
                    "You are a helpful AI assistant representing Simone Saletti's portfolio. Keep responses brief and engaging for voice conversations. You can help visitors learn about Simone's skills, projects, and experience.",
                voice: "alloy",
            });

            // Create session
            const session = new RealtimeSession(agent);

            // Note: Event listeners will be set up after connection is established
            console.log("Voice session created, connecting...");

            // Connect with ephemeral token
            await session.connect({ apiKey: clientSecret });

            setVoiceSession(session);
            setVoiceState("connected");
        } catch (err) {
            console.error("Voice connection failed:", err);
            setVoiceError(err instanceof Error ? err.message : "Failed to connect");
            setVoiceState("error");
            setIsVoiceMode(false);
        }
    };

    const stopVoiceConversation = () => {
        if (voiceSession) {
            voiceSession.close?.();
            setVoiceSession(null);
        }
        setVoiceState("idle");
        setIsVoiceMode(false);
        setLastUserMessage("");
        setLastAIMessage("");
        setVoiceError(null);
    };

    const handleVoiceButtonClick = () => {
        if (isVoiceMode) {
            stopVoiceConversation();
        } else if (input.trim() || files.length > 0) {
            handleSubmit();
        } else {
            startVoiceConversation();
        }
    };

    // Cleanup on unmount
    React.useEffect(() => {
        return () => {
            if (voiceSession) {
                voiceSession.close?.();
            }
        };
    }, [voiceSession]);

    const hasContent = input.trim() !== "" || files.length > 0;

    const getVoiceStateText = () => {
        switch (voiceState) {
            case "connecting":
                return "Connecting...";
            case "connected":
                return "Connected - Ready to talk";
            case "listening":
                return "Listening...";
            case "speaking":
                return "AI is speaking...";
            case "error":
                return `Error: ${voiceError}`;
            default:
                return "Ready to start";
        }
    };

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
                    return <StopCircle className="h-5 w-5" />;
                case "error":
                    return <Square className="h-4 w-4 text-destructive" />;
                default:
                    return <Mic className="h-4 w-4" />;
            }
        } else if (isLoading) {
            return <Square className="h-4 w-4 fill-current animate-pulse" />;
        } else if (hasContent) {
            return <ArrowUp className="h-4 w-4" />;
        } else {
            return <Mic className="h-4 w-4" />;
        }
    };

    const getButtonTooltip = () => {
        if (isVoiceMode) {
            return voiceState === "connected" ? "Stop voice conversation" : getVoiceStateText();
        } else if (isLoading) {
            return "Stop generation";
        } else if (hasContent) {
            return "Send message";
        } else {
            return "Start voice conversation";
        }
    };

    return (
        <>
            {/* Voice mode status */}
            {isVoiceMode && (
                <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, type: "spring" }}
                    className="mb-2 p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 rounded-xl"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <Volume2 className="h-5 w-5 text-secondary" />
                            <span className="text-sm font-medium text-foreground font-technor">
                                Voice Chat: <span className="text-secondary">{getVoiceStateText()}</span>
                            </span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={stopVoiceConversation}
                            className="h-7 px-3 text-xs text-secondary hover:text-secondary-foreground hover:bg-secondary/20 border border-secondary/20 rounded-lg font-technor transition-all duration-200"
                        >
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Switch to typing
                        </Button>
                    </div>
                    {lastUserMessage && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xs text-muted-foreground mb-2 font-mono"
                        >
                            <strong className="text-foreground">You:</strong> {lastUserMessage}
                        </motion.div>
                    )}
                    {lastAIMessage && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xs text-muted-foreground font-mono"
                        >
                            <strong className="text-secondary">AI:</strong> {lastAIMessage}
                        </motion.div>
                    )}
                </motion.div>
            )}

            {/* Error display */}
            {voiceError && (
                <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, type: "spring" }}
                    className="mb-2 p-3 bg-gradient-to-br from-destructive/10 to-destructive/5 border border-destructive/20 rounded-xl text-destructive text-sm font-technor"
                >
                    {voiceError}
                </motion.div>
            )}

            {/* Suggestions displayed above the input */}
            {!isVoiceMode && (
                <Suggestions
                    suggestions={suggestions}
                    onSelectSuggestion={handleSelectSuggestion}
                    className="w-full"
                    showDefault={showDefaultSuggestions}
                />
            )}

            <PromptInput
                value={input}
                onValueChange={setInput}
                isLoading={isLoading}
                onSubmit={handleSubmit}
                className={cn(
                    "w-full bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border border-border/50 shadow-lg transition-all duration-300 ease-in-out rounded-xl",
                    isVoiceMode && voiceState === "connected" && "border-secondary/50 shadow-secondary/20",
                    className
                )}
                disabled={isLoading || isVoiceMode}
                ref={ref || promptBoxRef}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {files.length > 0 && !isVoiceMode && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-wrap gap-3 p-2 pb-3 transition-all duration-300"
                    >
                        {files.map((file, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative group"
                            >
                                {file.type.startsWith("image/") && filePreviews[file.name] && (
                                    <div
                                        className="w-16 h-16 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 border border-secondary/20 shadow-sm"
                                        onClick={() => openImageModal(filePreviews[file.name])}
                                    >
                                        <img
                                            src={filePreviews[file.name]}
                                            alt={file.name}
                                            className="h-full w-full object-cover"
                                        />
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveFile(index);
                                            }}
                                            className="absolute -top-1 -right-1 rounded-full bg-gradient-to-br from-background/90 to-background/70 p-1 opacity-100 transition-all duration-200 hover:scale-110 border border-border shadow-sm"
                                        >
                                            <X className="h-3 w-3 text-foreground" />
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                <div
                    className={cn(
                        "transition-all duration-300",
                        isVoiceMode ? "h-0 overflow-hidden opacity-0" : "opacity-100"
                    )}
                >
                    <div className="flex items-center gap-2">
                        <div className="flex-1">
                            <PromptInputTextarea
                                placeholder={isVoiceMode ? "Voice mode active..." : placeholder}
                                className="text-base"
                            />
                        </div>
                        <PromptInputAction tooltip={getButtonTooltip()}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <Button
                                    variant="default"
                                    size="icon"
                                    className={cn(
                                        "h-9 w-9 rounded-xl transition-all duration-300 flex-shrink-0 flex items-center justify-center shadow-lg border border-transparent font-technor",
                                        isVoiceMode
                                            ? "bg-gradient-to-br from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-secondary-foreground border-secondary/30 shadow-secondary/25"
                                            : hasContent
                                            ? "bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground border-primary/30 shadow-primary/25"
                                            : "bg-gradient-to-br from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-secondary-foreground border-secondary/30 shadow-secondary/25"
                                    )}
                                    onClick={handleVoiceButtonClick}
                                    disabled={isLoading || voiceState === "connecting"}
                                >
                                    {getButtonIcon()}
                                </Button>
                            </motion.div>
                        </PromptInputAction>
                    </div>
                </div>
            </PromptInput>

            <ImageViewDialog imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
        </>
    );
});
PromptInputBox.displayName = "PromptInputBox";
