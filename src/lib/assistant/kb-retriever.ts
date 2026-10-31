import kbData from '@/../data/knowledge/wrtc2030-and-slavonia-kb.json';

export interface KbTopic {
  id: string;
  category: string;
  title: string;
  citation: string;
  keywords: string[];
  content: string;
}

export interface AssistantResponse {
  reply: string;
  citations: string[];
}

const OFF_TOPIC_PATTERNS = [
  /quantum physics/i,
  /french revolution/i,
  /write a poem/i,
  /tell me a joke/i,
  /write python code/i,
  /javascript tutorial/i,
  /who won the super bowl/i,
  /recipe for pizza/i,
  /crypto trading/i,
  /bitcoin/i,
  /stock market/i,
];

const ON_TOPIC_KEYWORDS = [
  'wrtc',
  'contest',
  'qualification',
  'qualify',
  'score',
  'scoring',
  'formula',
  'caps',
  'multi-op',
  'outside-qa',
  'outside qa',
  'youth',
  'u25',
  '9a',
  'hrs',
  'croatia',
  'slavonia',
  'osijek',
  'cepin',
  'čepin',
  'dakovo',
  'đakovo',
  'baranja',
  'kopacki',
  'kopački',
  'kulen',
  'fis',
  'fiš',
  'cobanac',
  'čobanac',
  'grasevina',
  'graševina',
  'airport',
  'zag',
  'osi',
  'bud',
  'beg',
  'hotel',
  'travel',
  'rules',
  'selection',
  'referee',
  'radio',
  'amateur radio',
  'ham',
  'station',
  'antennas',
  'propagation',
  'sponsor',
  'teams',
];

export function retrieveFromKnowledgeBase(query: string): AssistantResponse {
  const normalizedQuery = query.toLowerCase().trim();

  // Guardrail 1: Explicit off-topic check
  const isExplicitOffTopic = OFF_TOPIC_PATTERNS.some((pattern) => pattern.test(normalizedQuery));

  // Guardrail 2: Query must have at least one on-topic keyword or reference
  const hasOnTopicKeyword = ON_TOPIC_KEYWORDS.some((kw) => normalizedQuery.includes(kw));

  if (isExplicitOffTopic || (!hasOnTopicKeyword && normalizedQuery.length > 20)) {
    return {
      reply:
        'I am the WRTC 2030 Croatia Assistant. I can only answer questions regarding WRTC 2030 rules, qualification, and visiting Croatia/Slavonia. Please ask about selection scoring, qualifying contests, youth teams, or travel in Osijek and Slavonia.',
      citations: [],
    };
  }

  // Tokenize query words
  const words = normalizedQuery.split(/\W+/).filter((w) => w.length > 2);

  // Score topics based on keyword matches
  const topics: KbTopic[] = kbData.topics;
  const scoredTopics = topics.map((topic) => {
    let score = 0;

    // Check keyword exact matches
    for (const kw of topic.keywords) {
      if (normalizedQuery.includes(kw.toLowerCase())) {
        score += 5;
      }
    }

    // Check query word overlaps in title and content
    for (const w of words) {
      if (topic.title.toLowerCase().includes(w)) score += 3;
      if (topic.content.toLowerCase().includes(w)) score += 1;
    }

    return { topic, score };
  });

  scoredTopics.sort((a, b) => b.score - a.score);

  const topMatch = scoredTopics[0];

  if (!topMatch || topMatch.score === 0) {
    return {
      reply:
        'WRTC 2030 in Slavonia, Croatia features 60 identical stations in the flat Pannonian Basin. You can explore the official Selection Rules v1.0, current qualification standings, the 24-contest calendar, and our travel guide for Osijek, Đakovo, and Čepin.',
      citations: ['Selection Rules v1.0 & Slavonia Venue Guide'],
    };
  }

  // If top 2 matches have high relevance, include citations for both
  const relevantTopics = scoredTopics.filter((st) => st.score >= topMatch.score * 0.6 && st.score > 4).slice(0, 2);

  const citations = Array.from(new Set(relevantTopics.map((rt) => rt.topic.citation)));
  const reply = relevantTopics.map((rt) => rt.topic.content).join('\n\n');

  return {
    reply,
    citations,
  };
}
