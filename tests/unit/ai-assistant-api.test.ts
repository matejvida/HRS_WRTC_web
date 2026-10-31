import { describe, it, expect } from 'vitest';
import { retrieveFromKnowledgeBase } from '@/lib/assistant/kb-retriever';
import { POST } from '@/app/api/chat/route';

describe('WRTC 2030 AI Assistant Knowledge Retrieval & Route Handler (Story 4.3)', () => {
  describe('retrieveFromKnowledgeBase (offline / deterministic mode)', () => {
    it('answers scoring and caps questions citing Selection Rules v1.0 Section 5 & 6', () => {
      const result = retrieveFromKnowledgeBase('What is the scoring formula and what are the event caps?');

      expect(result.reply).toMatch(/10/); // best 10 counted events
      expect(result.reply).toMatch(/Multi-Op/i);
      expect(result.reply).toMatch(/Outside.*QA/i);
      expect(result.citations).toEqual(
        expect.arrayContaining([expect.stringMatching(/Selection Rules.*Section 5|Section 6/i)])
      );
    });

    it('answers Youth Teams questions citing Section 8.B and 6-event limit', () => {
      const result = retrieveFromKnowledgeBase('How do Youth Teams qualify and how many events count?');

      expect(result.reply).toMatch(/Youth/i);
      expect(result.reply).toMatch(/6/); // 6 events max
      expect(result.reply).toMatch(/3.*team/i); // 3 youth teams
      expect(result.citations).toEqual(
        expect.arrayContaining([expect.stringMatching(/Youth|Section 8\.B/i)])
      );
    });

    it('answers Slavonia gastronomy and destination questions', () => {
      const result = retrieveFromKnowledgeBase('What local food and wine should I try in Slavonia?');

      expect(result.reply).toMatch(/kulen/i);
      expect(result.reply).toMatch(/fiš paprikaš|čobanac/i);
      expect(result.reply).toMatch(/Graševina/i);
      expect(result.citations).toEqual(
        expect.arrayContaining([expect.stringMatching(/Gastronomy|Slavonia/i)])
      );
    });

    it('answers accommodation and host city questions for Osijek and Đakovo', () => {
      const result = retrieveFromKnowledgeBase('Where should I stay in Osijek and what is Đakovo?');

      expect(result.reply).toMatch(/Osijek/i);
      expect(result.reply).toMatch(/Tvrđa/i);
      expect(result.reply).toMatch(/Đakovo/i);
    });

    it('politely refuses off-topic questions with guardrail response', () => {
      const result = retrieveFromKnowledgeBase('Write a poem about quantum physics and the French Revolution');

      expect(result.reply).toMatch(/I am the WRTC 2030 Croatia Assistant/i);
      expect(result.reply).toMatch(/only answer questions.*WRTC 2030|Croatia|Slavonia/i);
      expect(result.citations.length).toBe(0);
    });
  });

  describe('POST /api/chat Route Handler', () => {
    it('returns 200 with JSON reply and citations for valid message', async () => {
      const req = new Request('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'When is the 9A DX Contest and does it open qualification?' }),
      });

      const response = await POST(req);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toHaveProperty('reply');
      expect(data).toHaveProperty('citations');
      expect(Array.isArray(data.citations)).toBe(true);
      expect(data.reply).toMatch(/9A DX Contest/i);
    });

    it('returns 400 when message is missing or empty', async () => {
      const req = new Request('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: '' }),
      });

      const response = await POST(req);
      expect(response.status).toBe(400);
    });
  });
});
