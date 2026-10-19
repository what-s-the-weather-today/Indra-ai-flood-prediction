import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, X, Minimize2, AlertCircle } from 'lucide-react';
import {
  CITIES_DATA,
  CHAT_QUICK_REPLIES,
  RISK_COLORS,
  getRainCategory,
  generateAssistantReply,
} from '../data/mock';

function getCurrentTimeString() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ChatAssistant({ selectedCity }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const cityData = CITIES_DATA[selectedCity] || CITIES_DATA.Jaipur;

  const [messages, setMessages] = useState(() => {
    const rainCat = getRainCategory(cityData.currentRainfall.mmPerHour);
    return [
      {
        id: 'welcome-1',
        sender: 'user',
        text: `What is the current rainfall in ${cityData.name}?`,
        time: getCurrentTimeString(),
      },
      {
        id: 'welcome-2',
        sender: 'bot',
        text: `The current rainfall in ${cityData.name} is ${cityData.currentRainfall.mmPerHour} mm/hr (${cityData.currentRainfall.periodLabel.toLowerCase()}), which is considered ${rainCat.label}.`,
        riskBadge: null,
        time: getCurrentTimeString(),
      },
      {
        id: 'welcome-3',
        sender: 'user',
        text: `What is the flood risk level in ${cityData.name} right now?`,
        time: getCurrentTimeString(),
      },
      {
        id: 'welcome-4',
        sender: 'bot',
        text: `The flood risk level in ${cityData.name} is ${cityData.overallRiskLevel}.`,
        riskBadge: cityData.overallRiskLevel,
        time: getCurrentTimeString(),
      },
    ];
  });

  // Update assistant context message when city changes
  useEffect(() => {
    const c = CITIES_DATA[selectedCity] || CITIES_DATA.Jaipur;
    const rainCat = getRainCategory(c.currentRainfall.mmPerHour);
    setMessages((prev) => [
      ...prev,
      {
        id: `city-switch-${Date.now()}`,
        sender: 'bot',
        text: `Switched monitoring context to ${c.name}. Current rainfall: ${c.currentRainfall.mmPerHour} mm/hr (${rainCat.label}). Overall flood risk: ${c.overallRiskLevel}.`,
        riskBadge: c.overallRiskLevel,
        time: getCurrentTimeString(),
      },
    ]);
  }, [selectedCity]);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (textOverride) => {
    const query = (typeof textOverride === 'string' ? textOverride : inputValue).trim();
    if (!query) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      time: getCurrentTimeString(),
    };

    const reply = generateAssistantReply(query, selectedCity);
    const botMsg = {
      id: `bot-${Date.now() + 1}`,
      sender: 'bot',
      text: reply.text,
      riskBadge: reply.riskBadge,
      time: getCurrentTimeString(),
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    if (typeof textOverride !== 'string') {
      setInputValue('');
    }
  };

  return (
    <>
      {/* Slide-over / Floating Chat Panel (only rendered when open) */}
      {isOpen && (
        <aside
          aria-label="Indra Assistant Chat Panel"
          className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[390px] max-h-[78vh] flex flex-col indra-card border-[#19C3F0]/60 shadow-[0_0_32px_rgba(0,0,0,0.75)] overflow-hidden"
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between gap-2 px-4 py-3 bg-[#08152B] border-b border-[#19C3F0]/35">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-full bg-[#19C3F0]/20 border border-[#19C3F0]/50 flex items-center justify-center text-[#19C3F0]">
                <Bot className="w-5 h-5" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#22C55E] ring-2 ring-[#08152B]" />
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-white">Indra Assistant</h2>
                <p className="text-[12px] text-slate-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                  <span>Monitoring {cityData.name} live feed</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#19C3F0]"
                aria-label="Minimize Indra Assistant"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#19C3F0]"
                aria-label="Close Indra Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#09172E]/95 max-h-[340px]">
            {messages.map((msg) => {
              if (msg.sender === 'user') {
                return (
                  <div key={msg.id} className="flex flex-col items-end">
                    <div className="max-w-[85%] rounded-2xl rounded-br-sm px-3.5 py-2.5 bg-gradient-to-r from-[#19C3F0] to-[#0EA5E9] text-[#071326] font-semibold text-[14px] shadow-md">
                      {msg.text}
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1">{msg.time}</span>
                  </div>
                );
              }

              const riskStyle = msg.riskBadge ? RISK_COLORS[msg.riskBadge] : null;
              return (
                <div key={msg.id} className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#19C3F0]/15 border border-[#19C3F0]/40 flex items-center justify-center text-[#19C3F0] shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="rounded-2xl rounded-tl-sm p-3 bg-[#0F2547] border border-[#19C3F0]/30 text-[14px] text-white leading-relaxed space-y-2">
                      <p>{msg.text}</p>
                      {riskStyle && (
                        <div
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${riskStyle.badgeClass}`}
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Risk level: {msg.riskBadge}</span>
                        </div>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 block">{msg.time}</span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick-reply Chips */}
          <div className="px-3.5 py-2 bg-[#08152B] border-t border-[#19C3F0]/20 flex flex-wrap gap-1.5">
            {CHAT_QUICK_REPLIES.map((qr) => (
              <button
                key={qr}
                type="button"
                onClick={() => handleSend(qr)}
                className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#0F2547] hover:bg-[#19C3F0]/20 text-[#19C3F0] border border-[#19C3F0]/35 transition focus:outline-none focus:ring-2 focus:ring-[#19C3F0]"
              >
                {qr}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#071122] border-t border-[#19C3F0]/30 flex items-center gap-2"
          >
            <label htmlFor="indra-chat-input" className="sr-only">
              Type your message to Indra Assistant
            </label>
            <input
              id="indra-chat-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-[#0C1D3A] text-white placeholder-slate-400 text-[14px] px-3.5 py-2 rounded-xl border border-[#19C3F0]/35 focus:outline-none focus:ring-2 focus:ring-[#19C3F0]"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-[#19C3F0] hover:bg-[#38BDF8] text-[#071326] font-bold transition shadow-[0_0_12px_rgba(25,195,240,0.4)] focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </aside>
      )}

      {/* Floating Round Chat Button at Bottom-Right (24px margin = bottom-6 right-6, closed by default) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#19C3F0] to-[#0284C7] text-[#071326] shadow-[0_0_25px_rgba(25,195,240,0.65)] hover:scale-105 transition-all duration-200 flex items-center justify-center border-2 border-white/25 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#19C3F0]"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close Indra Assistant' : 'Open Indra Assistant'}
      >
        <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#22C55E] ring-2 ring-[#0B1A33]" />
        {isOpen ? <X className="w-6 h-6 text-[#071326]" /> : <Bot className="w-7 h-7 text-[#071326]" />}
      </button>
    </>
  );
}
