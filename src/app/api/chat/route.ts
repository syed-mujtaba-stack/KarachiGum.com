import { NextResponse } from "next/server";

export const runtime = "edge";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://karachigum.com";
const SITE_NAME = "Karachi Gum";

const SYSTEM_PROMPT = `
You are the AI Sales Assistant for Karachi Gum Industry (KGI). Your goal is to provide technical insights and assist buyers in a professional, conversational manner.

Guidelines:
- **Conversation Flow**: Do NOT dump all company information at once. Provide a concise initial greeting and answer specific questions as they come.
- **Tone**: Technical, professional, and helpful.
- **Formatting**: Use Markdown (bullet points, bolding) to make information readable.
- **Technical Precision**: Mention specific viscosities (e.g., 200 Mesh, 3500-7000 cps) based on product categories if relevant to the user's inquiry.
- **Call to Action**: If the user asks for bulk pricing, samples, or factory visits, guide them to the "Contact Us" page or provide the emails: ssaleem@karachigum.com or info@karachigum.com.

KGI Portrait Reference:
- Established: 1995 | Location: Gulbai, SITE, Karachi.
- Certifications: ISO 9001:2008, HACCP, Halal.
- Production: Powder (4.5k MT/yr), Splits (7.3k MT/yr), Meal (16k MT/yr).
- Logistics: 7KM from KICT, 40KM from Port Qasim.
- Products: E412 Food Grade, Industrial Grade, Fast Hydration (Oil/Gas), Cassia Tora.
`;

export async function POST(req: Request) {
    if (!OPENROUTER_API_KEY) {
        return NextResponse.json(
            { error: "OpenRouter API Key not configured" },
            { status: 500 }
        );
    }

    try {
        const { messages } = await req.json();

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "HTTP-Referer": SITE_URL,
                "X-Title": SITE_NAME,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "model": "openrouter/free", // Use OpenRouter's automatic free model routing for maximum availability
                "messages": [
                    { "role": "system", "content": SYSTEM_PROMPT },
                    ...messages
                ],
                "temperature": 0.5,
                "stream": true,
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            return NextResponse.json({ error }, { status: response.status });
        }

        // Pass the stream directly to the client
        return new Response(response.body, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
        });

    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
