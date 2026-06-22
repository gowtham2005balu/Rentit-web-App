import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    try {
      // Call the external AI backend
      const response = await fetch('https://ai-backend-phgm.onrender.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}`);
      }

      const data = await response.json();
      return NextResponse.json(data);
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      console.warn('AI backend failed or timed out, returning fallback response:', fetchError.message);
      
      const userText = (body.message || "").toLowerCase();
      let fallbackReply = "I am currently running in fallback mode because my backend is asleep. I can help you find properties manually or you can try again in a minute once I wake up!";
      
      if (userText.includes("pg") || userText.includes("hostel")) {
        fallbackReply = "I found several PG and hostel options in our listings! You can check the 'PG / Hostel' section from the top menu or tell me specific areas like 'Adyar' or 'OMR'.";
      } else if (userText.includes("commercial") || userText.includes("office")) {
        fallbackReply = "We have great commercial spaces available! Try visiting our Commercial section, or let me know if you need parking and metro connectivity.";
      } else if (userText.includes("bhk") || userText.includes("apartment") || userText.includes("flat")) {
        fallbackReply = "I can definitely help with apartments! Check out the 'Apartments' section or specify if you want 1 BHK, 2 BHK, or a specific budget.";
      } else if (userText.includes("hi") || userText.includes("hello")) {
        fallbackReply = "Hi there! I'm your Rentit AI Assistant. The backend might take a moment to wake up, but in the meantime, I'm here in fallback mode! What kind of property are you looking for?";
      }

      return NextResponse.json({ reply: fallbackReply });
    }
  } catch (error: any) {
    console.error('AI Proxy Error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to AI backend', details: error.message },
      { status: 500 }
    );
  }
}
