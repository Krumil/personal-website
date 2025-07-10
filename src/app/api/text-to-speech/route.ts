import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
        }

        const { text, voice = "alloy", model = "tts-1", speed = 1.0 } = await request.json();

        if (!text?.trim()) {
            return NextResponse.json({ error: "Text is required for text-to-speech conversion" }, { status: 400 });
        }

        const response = await fetch("https://api.openai.com/v1/audio/speech", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model,
                input: text,
                voice,
                speed,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("OpenAI TTS API error:", errorText);

            let errorMessage = `TTS API request failed: ${response.status}`;
            try {
                const errorData = JSON.parse(errorText);
                errorMessage = errorData.error?.message || errorMessage;
            } catch {
                // Use default error message if parsing fails
            }

            return NextResponse.json({ error: errorMessage }, { status: response.status });
        }

        const audioBuffer = await response.arrayBuffer();

        if (audioBuffer.byteLength === 0) {
            return NextResponse.json({ error: "Received empty audio response from TTS API" }, { status: 500 });
        }

        // Return the audio as a blob
        return new NextResponse(audioBuffer, {
            headers: {
                "Content-Type": "audio/mpeg",
                "Content-Length": audioBuffer.byteLength.toString(),
            },
        });
    } catch (error) {
        console.error("Text-to-speech error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
