'use client';

import React, { useState, useEffect, useRef } from 'react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  citations?: string[];
}

const PRESET_PILLS = [
  'Scoring Formula & Caps?',
  'Hotels in Osijek & Đakovo?',
  'Slavonian Food & Wine?',
  'Youth Teams (U25)?',
];

export function WrtcAiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'greeting',
      sender: 'assistant',
      text: 'Pozdrav! I am the WRTC 2030 Croatia AI Assistant. Ask me anything about Selection Rules v1.0 scoring, the 24 qualifying contests, youth team qualification, or visiting Osijek, Đakovo, and Slavonia.',
      citations: ['Selection Rules v1.0 & Slavonia Host Guide'],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Focus input and escape key listener
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'No response available.',
        citations: data.citations || [],
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: 'Unable to reach the assistant service. Please check your connection and try again.',
          citations: [],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputMessage);
  };

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <button
        id="ai-fab"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="ai-drawer"
        aria-label="Open WRTC 2030 AI Assistant"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 px-4 h-[52px] rounded-full bg-linear-to-r from-[#273B8F] to-slate-900 text-white shadow-2xl hover:brightness-110 active:scale-95 transition-all border border-white/20 cursor-pointer"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
        </span>
        <span className="font-mono font-bold text-xs tracking-tight">
          Ask WRTC 2030 Assistant
        </span>
        <svg
          className="w-4 h-4 text-red-400 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>

      {/* Slide-Up Drawer */}
      {isOpen && (
        <div
          id="ai-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="WRTC 2030 AI Concierge"
          className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[460px] h-[520px] max-h-[80vh] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
              <div>
                <h3 className="font-mono font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  WRTC 2030 Croatia Assistant
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  Grounded · Selection Rules v1.0 & Slavonia Guide
                </p>
              </div>
            </div>

            <button
              id="ai-close-btn"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close assistant drawer"
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Quick Preset Pills */}
          <div className="p-2 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
            {PRESET_PILLS.map((pill) => (
              <button
                key={pill}
                type="button"
                onClick={() => handleSendMessage(pill)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium whitespace-nowrap bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-red-500 hover:text-red-600 transition-colors cursor-pointer disabled:opacity-50"
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Message Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-xl leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'chat-msg-user bg-slate-900 text-white dark:bg-red-600 dark:text-white rounded-tr-xs'
                      : 'chat-msg-assistant bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-xs border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.citations && msg.citations.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1 pl-1">
                    {msg.citations.map((cite, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/50"
                      >
                        Source: {cite}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-1.5 p-2 text-slate-400 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 text-[11px]">Searching knowledge base...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleSubmit}
            className="p-2.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center gap-2"
          >
            <input
              id="ai-input"
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about rules, scoring, hotels, food..."
              disabled={isLoading}
              className="flex-1 py-2 px-3 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-red-500"
            />
            <button
              id="ai-send-btn"
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              aria-label="Send message"
              className="p-2 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-40 transition-colors cursor-pointer shrink-0"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
