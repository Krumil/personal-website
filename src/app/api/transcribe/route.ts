import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
        }

        const formData = await request.formData();
        const audioFile = formData.get("file") as File;
        const model = (formData.get("model") as string) || "gpt-4o-transcribe";
        const prompt = formData.get("prompt") as string;
        const language = formData.get("language") as string;
        const stream = formData.get("stream") === "true";

        if (!audioFile) {
            return NextResponse.json({ error: "Audio file is required" }, { status: 400 });
        }

        // Create form data for OpenAI API
        const openaiFormData = new FormData();
        openaiFormData.append("file", audioFile);
        openaiFormData.append("model", model);

        if (prompt) {
            openaiFormData.append("prompt", prompt);
        }

        if (language) {
            openaiFormData.append("language", language);
        }

        if (stream) {
            openaiFormData.append("stream", "true");
        }

        const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
            body: openaiFormData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("OpenAI API error:", errorText);
            return NextResponse.json({ error: "Transcription failed" }, { status: response.status });
        }

        if (stream) {
            // For streaming responses, we need to forward the stream
            return new NextResponse(response.body, {
                headers: {
                    "Content-Type": "text/plain; charset=utf-8",
                    "Transfer-Encoding": "chunked",
                },
            });
        } else {
            const result = await response.json();
            return NextResponse.json(result);
        }
    } catch (error) {
        console.error("Transcription error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
