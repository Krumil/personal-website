import { RealtimeAgent, RealtimeSession } from "@openai/agents/realtime";
import type { Tool } from "@openai/agents";

export interface ChatMessage {
    role: "system" | "user" | "assistant";
    content: string;
    timestamp?: number;
}

export interface AIAgentOptions {
    model?: string;
    temperature?: number;
    maxTokens?: number;
    systemPrompt?: string;
    conversationHistory?: ChatMessage[];
}

export interface ConversationContext {
    messages: ChatMessage[];
    totalTokens: number;
    lastResponseTime: number;
}

export interface RealtimeAgentOptions {
    instructions?: string;
    voice?: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";
    tools?: Tool[];
}

export interface RealtimeSessionOptions {
    apiKey: string;
    model?: string;
    transport?: "webrtc" | "websocket";
}

/**
 * Default system prompt for speech-to-speech conversations
 */
const DEFAULT_SYSTEM_PROMPT = `You are Simone, a helpful AI assistant representing Simone Saletti, a developer specializing in AI and blockchain technologies.

# Personality and Tone
## Identity
You are Simone's AI assistant, knowledgeable about his work in artificial intelligence, blockchain development, and software engineering. You represent him professionally while being approachable and friendly.

## Task
Help visitors learn about Simone's experience, projects, and expertise. Answer questions about his work, provide information about his skills, and assist with general inquiries about AI and blockchain development.

## Demeanor
Professional yet friendly, knowledgeable, and enthusiastic about technology

## Tone
Conversational and warm, with technical expertise when needed

## Level of Formality
Professional but approachable - like a knowledgeable colleague

## Level of Emotion
Engaged and enthusiastic about technology topics, empathetic to user needs

## Filler Words
Occasionally use natural filler words like "um," "well," "you know" to sound more conversational

## Pacing
Natural conversational pace, not rushed

# Instructions
- Keep responses concise and conversational (1-3 sentences typically)
- Speak naturally as if having a real-time conversation
- Avoid overly long explanations unless specifically requested
- Use a friendly, approachable tone
- If asked complex questions, offer to explain in more detail if needed
- Acknowledge when you're uncertain and be honest about limitations
- Remember this is a voice conversation, so structure your responses to sound natural when spoken aloud
- Focus on Simone's expertise in AI and blockchain when relevant
- Be helpful with general programming and technology questions`;

/**
 * Send a message to the AI agent and get a response
 */
export async function sendMessageToAI(
    message: string,
    apiKey: string,
    options: AIAgentOptions = {}
): Promise<{ response: string; context: ConversationContext }> {
    const {
        model = "gpt-4o-mini",
        temperature = 0.7,
        maxTokens = 150, // Shorter responses for voice
        systemPrompt = DEFAULT_SYSTEM_PROMPT,
        conversationHistory = [],
    } = options;

    if (!message?.trim()) {
        throw new Error("Message is required");
    }

    if (!apiKey?.trim()) {
        throw new Error("OpenAI API key is required");
    }

    // Build conversation history
    const messages: ChatMessage[] = [
        { role: "system", content: systemPrompt },
        ...conversationHistory,
        { role: "user", content: message.trim(), timestamp: Date.now() },
    ];

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model,
                messages: messages.map(({ role, content }) => ({ role, content })),
                temperature,
                max_tokens: maxTokens,
                stream: false,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = `AI API request failed: ${response.status}`;

            try {
                const errorData = JSON.parse(errorText);
                errorMessage = errorData.error?.message || errorMessage;
            } catch {
                // Use default error message if parsing fails
            }

            throw new Error(errorMessage);
        }

        const data = await response.json();

        if (!data.choices || data.choices.length === 0) {
            throw new Error("No response received from AI");
        }

        const aiResponse = data.choices[0].message.content;
        if (!aiResponse) {
            throw new Error("Empty response received from AI");
        }

        // Update conversation context
        const assistantMessage: ChatMessage = {
            role: "assistant",
            content: aiResponse,
            timestamp: Date.now(),
        };

        const updatedMessages = [...messages, assistantMessage];
        const context: ConversationContext = {
            messages: updatedMessages,
            totalTokens: data.usage?.total_tokens || 0,
            lastResponseTime: Date.now(),
        };

        return {
            response: aiResponse,
            context,
        };
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("Unknown error occurred while communicating with AI");
    }
}

/**
 * Create a new conversation context
 */
export function createConversationContext(systemPrompt?: string): ConversationContext {
    const messages: ChatMessage[] = [];

    if (systemPrompt) {
        messages.push({
            role: "system",
            content: systemPrompt,
            timestamp: Date.now(),
        });
    }

    return {
        messages,
        totalTokens: 0,
        lastResponseTime: 0,
    };
}

/**
 * Add a message to conversation context
 */
export function addMessageToContext(
    context: ConversationContext,
    role: "user" | "assistant",
    content: string
): ConversationContext {
    const message: ChatMessage = {
        role,
        content,
        timestamp: Date.now(),
    };

    return {
        ...context,
        messages: [...context.messages, message],
    };
}

/**
 * Get conversation history for display purposes
 */
export function getConversationHistory(context: ConversationContext): ChatMessage[] {
    return context.messages.filter((msg) => msg.role !== "system");
}

/**
 * Clear conversation history while keeping system prompt
 */
export function clearConversationHistory(context: ConversationContext): ConversationContext {
    const systemMessages = context.messages.filter((msg) => msg.role === "system");

    return {
        messages: systemMessages,
        totalTokens: 0,
        lastResponseTime: 0,
    };
}

/**
 * Truncate conversation history to stay within token limits
 */
export function truncateConversationHistory(
    context: ConversationContext,
    maxMessages: number = 20
): ConversationContext {
    const systemMessages = context.messages.filter((msg) => msg.role === "system");
    const conversationMessages = context.messages.filter((msg) => msg.role !== "system");

    // Keep the most recent messages
    const recentMessages = conversationMessages.slice(-maxMessages);

    return {
        ...context,
        messages: [...systemMessages, ...recentMessages],
    };
}

/**
 * Create a RealtimeAgent instance
 */
export function createRealtimeAgent(options: RealtimeAgentOptions): RealtimeAgent {
    const { instructions = DEFAULT_SYSTEM_PROMPT, voice = "alloy", tools = [] } = options;

    return new RealtimeAgent({
        name: "Simone's AI Assistant",
        instructions,
        voice,
        tools,
    });
}

/**
 * Create a RealtimeSession instance
 */
export function createRealtimeSession(agent: RealtimeAgent, options: RealtimeSessionOptions): RealtimeSession {
    const { apiKey, model = "gpt-4o-realtime-preview-2025-06-03", transport = "webrtc" } = options;

    return new RealtimeSession(agent, {
        apiKey,
        model,
        transport,
    });
}

/**
 * Portfolio-specific tools for the RealtimeAgent
 */
export function createPortfolioTools() {
    return [
        {
            type: "function",
            name: "getProjectInfo",
            description: "Get information about Simone's projects and expertise",
            parameters: {
                type: "object",
                properties: {
                    category: {
                        type: "string",
                        description: "Project category (ai, blockchain, fullstack, tools)",
                        enum: ["ai", "blockchain", "fullstack", "tools"],
                    },
                    projectName: {
                        type: "string",
                        description: "Specific project name if known",
                    },
                },
            },
            invoke: async (_: unknown, input: string) => {
                const parameters = JSON.parse(input);
                return getProjectInfo(parameters);
            },
        },
        {
            type: "function",
            name: "getContactInfo",
            description: "Provide contact information for Simone",
            parameters: {
                type: "object",
                properties: {
                    requestType: {
                        type: "string",
                        description: "Type of contact request",
                        enum: ["email", "social", "general"],
                    },
                },
            },
            invoke: async (_: unknown, input: string) => {
                const parameters = JSON.parse(input);
                return getContactInfo(parameters);
            },
        },
        {
            type: "function",
            name: "getExperienceInfo",
            description: "Get information about Simone's professional experience and skills",
            parameters: {
                type: "object",
                properties: {
                    area: {
                        type: "string",
                        description: "Area of expertise",
                        enum: ["ai", "blockchain", "fullstack", "skills", "experience"],
                    },
                },
            },
            invoke: async (_: unknown, input: string) => {
                const parameters = JSON.parse(input);
                return getExperienceInfo(parameters);
            },
        },
    ];
}

/**
 * Handle tool calls for the RealtimeAgent
 */
export function handleToolCall(toolName: string, parameters: Record<string, unknown>): string {
    switch (toolName) {
        case "getProjectInfo":
            return getProjectInfo(parameters);
        case "getContactInfo":
            return getContactInfo(parameters);
        case "getExperienceInfo":
            return getExperienceInfo(parameters);
        default:
            return "I'm sorry, I don't have information about that right now.";
    }
}

function getProjectInfo(parameters: { category?: string; projectName?: string }): string {
    const { category, projectName } = parameters;

    if (projectName) {
        return `I'd be happy to tell you about ${projectName}. Simone has worked on various projects across AI, blockchain, and full-stack development. You can find detailed information about his projects on the projects page of his portfolio.`;
    }

    switch (category) {
        case "ai":
            return "Simone has extensive experience in AI development, including machine learning models, natural language processing, and AI-powered applications. His AI projects showcase cutting-edge implementations and practical solutions.";
        case "blockchain":
            return "Simone specializes in blockchain technology, including smart contract development, DeFi applications, and decentralized systems. His blockchain projects demonstrate expertise in various protocols and frameworks.";
        case "fullstack":
            return "Simone is skilled in full-stack development, building complete web applications with modern technologies like React, Node.js, and various databases. His full-stack projects show end-to-end development capabilities.";
        case "tools":
            return "Simone has developed various tools and utilities to improve development workflows and solve specific technical challenges. These tools demonstrate his problem-solving skills and technical expertise.";
        default:
            return "Simone works across multiple domains including AI, blockchain, and full-stack development. Each project showcases his technical skills and innovative approach to solving complex problems.";
    }
}

function getContactInfo(parameters: { requestType?: string }): string {
    const { requestType } = parameters;

    switch (requestType) {
        case "email":
            return "You can reach Simone at simone@example.com for professional inquiries and collaboration opportunities.";
        case "social":
            return "You can connect with Simone on LinkedIn, GitHub, or Twitter. Links to his social profiles are available in the contact section of his portfolio.";
        case "general":
        default:
            return "Simone is available for new projects and collaborations. You can contact him through the contact form on his website, or reach out directly via email or social media.";
    }
}

function getExperienceInfo(parameters: { area?: string }): string {
    const { area } = parameters;

    switch (area) {
        case "ai":
            return "Simone has deep expertise in artificial intelligence, including machine learning, deep learning, NLP, and AI application development. He stays current with the latest AI research and technologies.";
        case "blockchain":
            return "Simone is experienced in blockchain development, including smart contracts, DeFi protocols, Web3 applications, and various blockchain platforms like Ethereum and others.";
        case "fullstack":
            return "Simone has comprehensive full-stack development experience, working with modern frameworks like React, Next.js, Node.js, databases, and cloud technologies.";
        case "skills":
            return "Simone's technical skills span multiple programming languages, frameworks, and tools. He's proficient in JavaScript/TypeScript, Python, Solidity, React, and many other technologies.";
        case "experience":
        default:
            return "Simone has extensive experience as a developer specializing in AI and blockchain technologies. His background includes both independent projects and collaborative work across various domains.";
    }
}

/**
 * Check if AI agent is supported in the current environment
 */
export function isAIAgentSupported(): boolean {
    return typeof window !== "undefined" && typeof fetch !== "undefined";
}
