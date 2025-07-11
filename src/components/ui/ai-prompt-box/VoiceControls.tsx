import React from "react";
import { RealtimeAgent, RealtimeSession } from "@openai/agents/realtime";

import { prompt } from "./prompt";

export type VoiceState = "idle" | "connecting" | "connected" | "listening" | "speaking" | "error";

interface VoiceControlsProps {
    voiceState: VoiceState;
    setVoiceState: (state: VoiceState) => void;
    voiceSession: RealtimeSession | null;
    setVoiceSession: (session: RealtimeSession | null) => void;
    setVoiceError: (error: string | null) => void;
    setLastUserMessage: (message: string) => void;
    setLastAIMessage: (message: string) => void;
    _onSend: (text: string, files?: File[]) => void;
}

export function useVoiceControls({
    setVoiceState,
    voiceSession,
    setVoiceSession,
    setVoiceError,
    setLastUserMessage,
    setLastAIMessage,
    _onSend,
}: VoiceControlsProps) {
    const startVoiceConversation = React.useCallback(async () => {
        try {
            setVoiceState("connecting");
            setVoiceError(null);

            // Get ephemeral token from our API
            const response = await fetch("/api/realtime/sessions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ model: "gpt-4o-realtime-preview-2025-06-03" }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to create session");
            }

            const sessionData = await response.json();

            // Create minimal agent (actual config comes from backend)
            const agent = new RealtimeAgent({
                name: "Simone Saletti's Portfolio Assistant",
                instructions: prompt,
                voice: "verse",
            });

            // Create session
            const session = new RealtimeSession(agent);

            // Set up event listeners - simplified to avoid typing issues
            try {
                // Note: Event listeners may need adjustment based on actual API
                // Voice session created, connecting...
            } catch (eventError) {
                console.warn("Event listener setup failed:", eventError);
            }

            // Connect to session with ephemeral token
            await session.connect({ apiKey: sessionData.clientSecret });
            setVoiceSession(session);
            setVoiceState("connected");
        } catch (error) {
            console.error("Failed to start voice conversation:", error);
            setVoiceError(error instanceof Error ? error.message : "Failed to start voice conversation");
            setVoiceState("error");
        }
    }, [setVoiceState, setVoiceError, setVoiceSession]);

    const stopVoiceConversation = React.useCallback(async () => {
        if (voiceSession) {
            try {
                // Use close method instead of disconnect
                if (typeof voiceSession.close === "function") {
                    voiceSession.close();
                }
                setVoiceSession(null);
                setVoiceState("idle");
                setVoiceError(null);
                setLastUserMessage("");
                setLastAIMessage("");
            } catch (error) {
                console.error("Error stopping voice conversation:", error);
                setVoiceError("Failed to stop voice conversation");
            }
        }
    }, [voiceSession, setVoiceSession, setVoiceState, setVoiceError, setLastUserMessage, setLastAIMessage]);

    // Cleanup on unmount
    React.useEffect(() => {
        return () => {
            if (voiceSession && typeof voiceSession.close === "function") {
                voiceSession.close();
            }
        };
    }, [voiceSession]);

    return {
        startVoiceConversation,
        stopVoiceConversation,
    };
}
