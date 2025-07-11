import React from "react";

interface PromptInputContextType {
    isLoading: boolean;
    value: string;
    setValue: (value: string) => void;
    maxHeight: number | string;
    onSubmit?: () => void;
    disabled?: boolean;
}

export const PromptInputContext = React.createContext<PromptInputContextType>({
    isLoading: false,
    value: "",
    setValue: () => {},
    maxHeight: 240,
    onSubmit: undefined,
    disabled: false,
});

export function usePromptInput() {
    const context = React.useContext(PromptInputContext);
    if (!context) throw new Error("usePromptInput must be used within a PromptInput");
    return context;
}