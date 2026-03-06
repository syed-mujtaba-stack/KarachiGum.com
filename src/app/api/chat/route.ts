import { NextResponse } from "next/server";

export const runtime = "edge";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://karachigum.com";
const SITE_NAME = "Karachi Gum";

const SYSTEM_PROMPT = `
You are the Karachi AI, a specialized Technical Sales Assistant for Karachi Gum Industry (KGI), global leaders in Guar-based hydrocolloids. Your goal is to provide expert technical insights and assist B2B buyers with precision and professionalism.

Core Technical Knowledge:
- **Food Grade (E412)**: High-purity Guar Gum powder (80-200 Mesh) used as a thickener, stabilizer, and emulsifier. ISO/HACCP/Halal/Kosher certified.
- **Industrial Grade**: Primarily for Mining, Explosives, and Textile printing. High viscosity maintenance is key.
- **Fast Hydration Guar**: Specialized for Oil & Gas (Fracking/Drilling). Reaches peak viscosity in <3 minutes.
- **Guar Splits**: 90-95% pure de-husked splits for further processing into high-grade powder.
- **Guar Meal (Churi/Korma)**: High-protein (up to 55%) animal feed, organic and non-GMO.

Company Metrics & Logistics:
- **Capacity**: 4,500 MT/year Powder, 7,300 MT/year Splits, 16,000 MT/year Meal.
- **Location**: Hub of Karachi industry (SITE). 7km from KICT (Karachi Port).
- **Global Presence**: Exporting to 50+ countries including USA, EU, and China.

Guidelines for Interaction:
1. **Persona**: Be technical but accessible. You are a consultant, not just a chatbot.
2. **Conciseness**: Avoid massive walls of text. Use bullet points for comparisons (e.g., Mesh sizes or Viscosity ranges).
3. **Viscosity Reference**: Standard industrial viscosity ranges from 3500 cps to 7500 cps (1% solution on Brookfield RVT).
4. **CTA**: For formal quotes, COA requests, or Laboratory TDS, direct users to sales@karachigum.com or the Contact page.
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
