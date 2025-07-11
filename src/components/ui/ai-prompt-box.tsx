import React from "react";
import { RealtimeSession } from "@openai/agents/realtime";

import { processImageFile, getImageFilesFromItems } from "@/utils/fileUtils";
import { cn } from "@/lib/utils";

import { Suggestions, type Suggestion } from "./suggestions";
import { TooltipProvider } from "./tooltip";
import { ImageViewDialog } from "./image-view-dialog";
import { ErrorDisplay } from "./ai-prompt-box/ErrorDisplay";
import { FilePreview } from "./ai-prompt-box/FilePreview";
import { PromptTextarea } from "./ai-prompt-box/PromptTextarea";
import { PromptInputContext } from "./ai-prompt-box/PromptInputContext";
import { SubmitButton } from "./ai-prompt-box/SubmitButton";
import { useVoiceControls, type VoiceState } from "./ai-prompt-box/VoiceControls";

// PromptInput Component
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
                            "rounded-xl border border-border/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm shadow-lg transition-all duration-300",
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

    // Input and file state
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

    // Use the voice controls hook
    const { startVoiceConversation, stopVoiceConversation } = useVoiceControls({
        voiceState,
        setVoiceState,
        voiceSession,
        setVoiceSession,
        setVoiceError,
        setLastUserMessage,
        setLastAIMessage,
        _onSend: onSend,
    });

    // File handling
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

    // Paste handling
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

    // Handlers
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

    const handleVoiceClick = () => {
        if (isVoiceMode) {
            stopVoiceConversation();
            setIsVoiceMode(false);
        } else {
            startVoiceConversation();
            setIsVoiceMode(true);
        }
    };

    const handleStopClick = () => {
        // Handle stop generation
    };

    const hasContent = input.trim() !== "" || files.length > 0;

    return (
        <>
            <ErrorDisplay error={voiceError} />

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
                <FilePreview
                    files={files}
                    filePreviews={filePreviews}
                    onRemoveFile={handleRemoveFile}
                    onOpenImage={openImageModal}
                    isVoiceMode={isVoiceMode}
                />

                <PromptTextarea
                    placeholder={placeholder}
                    isVoiceMode={isVoiceMode}
                    voiceState={voiceState}
                    lastUserMessage={lastUserMessage}
                    lastAIMessage={lastAIMessage}
                />

                <SubmitButton
                    isLoading={isLoading}
                    hasContent={hasContent}
                    isVoiceMode={isVoiceMode}
                    voiceState={voiceState}
                    onVoiceClick={handleVoiceClick}
                    onStopClick={handleStopClick}
                    onSubmitClick={handleSubmit}
                />
            </PromptInput>

            {selectedImage && <ImageViewDialog imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />}
        </>
    );
});

PromptInputBox.displayName = "PromptInputBox";
