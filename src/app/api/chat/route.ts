import { NextResponse } from 'next/server';
import { retrieveFromKnowledgeBase } from '@/lib/assistant/kb-retriever';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    let body: { message?: string } | null = null;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    const message = body?.message?.trim();
    if (!message) {
      return NextResponse.json(
        { error: 'Message field is required and cannot be empty' },
        { status: 400 }
      );
    }

    // Deterministic grounded retrieval (supports offline / CI / zero API key overhead)
    const assistantResponse = retrieveFromKnowledgeBase(message);

    return NextResponse.json({
      reply: assistantResponse.reply,
      citations: assistantResponse.citations,
    });
  } catch (error) {
    console.error('[/api/chat] Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error while processing chat request' },
      { status: 500 }
    );
  }
}
