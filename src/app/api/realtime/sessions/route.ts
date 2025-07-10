import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
        }

        const { model = "gpt-4o-realtime-preview-2025-06-03" } = await request.json();

        // Create ephemeral token following OpenAI's guide
        const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model,
                voice: "alloy", // Default voice
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("OpenAI Realtime Sessions API error:", errorText);

            let errorMessage = `Failed to create realtime session: ${response.status}`;
            try {
                const errorData = JSON.parse(errorText);
                errorMessage = errorData.error?.message || errorMessage;
            } catch {
                // Use default error message if parsing fails
            }

            return NextResponse.json({ error: errorMessage }, { status: response.status });
        }

        const sessionData = await response.json();

        // Return the ephemeral token and session info
        return NextResponse.json({
            clientSecret: sessionData.client_secret.value,
            sessionId: sessionData.id,
            model: sessionData.model,
            voice: sessionData.voice,
            expiresAt: sessionData.expires_at,
        });
    } catch (error) {
        console.error("Ephemeral token creation error:", error);
        return NextResponse.json({ error: "Failed to create ephemeral token" }, { status: 500 });
    }
}
