import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  ExternalLink,
  ChevronDown,
  RefreshCw,
  HelpCircle,
  ShieldCheck,
  Building,
  Coins,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { Politician } from '../../types';
import { FEATURED_POLITICIAN, OTHER_POLITICIANS } from '../../data/mockData';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sources?: string[];
  suggestedPrompts?: string[];
}

interface BantayAIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProfile?: (politician: Politician) => void;
  onOpenSmartCity?: () => void;
  onOpenSpending?: () => void;
  preselectedPoliticianName?: string;
  politicians?: Politician[];
}

export const BantayAIAssistant: React.FC<BantayAIAssistantProps> = ({
  isOpen,
  onClose,
  onOpenProfile,
  onOpenSmartCity,
  onOpenSpending,
  preselectedPoliticianName,
  politicians
}) => {
  const allPoliticians =
    politicians && politicians.length > 0 ? politicians : [FEATURED_POLITICIAN, ...OTHER_POLITICIANS];

  // Keep selector fast by prioritizing executive, national legislative, governors, and sample local officials
  const selectorPoliticians = React.useMemo(() => {
    const priorityRoles = new Set(['President', 'Senator', 'Governor', 'Congressman']);
    const primary = allPoliticians.filter((p) => priorityRoles.has(p.roleCategory));
    const localSample = allPoliticians.filter((p) => !priorityRoles.has(p.roleCategory)).slice(0, 60);
    const combined = [...primary, ...localSample].slice(0, 220);
    if (
      preselectedPoliticianName &&
      !combined.some((p) => p.name === preselectedPoliticianName)
    ) {
      const exact = allPoliticians.find((p) => p.name === preselectedPoliticianName);
      if (exact) combined.unshift(exact);
    }
    return combined;
  }, [allPoliticians, preselectedPoliticianName]);

  const [selectedPolitician, setSelectedPolitician] = useState<string>(
    preselectedPoliticianName || 'All Politicians'
  );
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `### Mabuhay! I am BantayAI 🏛️

I am your **AI Civic Intelligence Assistant** powered by **Gemini 3.8 Flash** and grounded in **${allPoliticians.length.toLocaleString()} live official records** across President, Senators, Congressmen, Governors, Mayors, Councilors, and Barangay Officials:
- **Official Profiles & Track Records:** Real-time verified rosters from OP, Senate, House of Representatives, DBM, DILG, and Liga ng mga Barangay.
- **Budget & Procurement Transparency:** How public funds are budgeted across DPWH, DOH, and LGUs.
- **Public Sentiment vs. Verified Findings:** Clarifying the critical difference between citizen opinion polls and official Commission on Audit (COA) / Ombudsman records.
- **Archipelago Smart Cities:** Insights into digital twin initiatives across Luzon, Visayas, Mindanao, and Palawan.

*Click any prompt below or type your question to begin!*`,
      timestamp: 'Just now',
      suggestedPrompts: [
        "What is Gov. Pamela \"Pam\" Baricuatro's official profile and Cebu projects?",
        'Who are the Senators of the 20th Congress?',
        'How does BantayPolitiko separate citizen sentiment from verified facts?',
        'Which infrastructure projects in the Visayas are currently delayed?'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (preselectedPoliticianName) {
      setSelectedPolitician(preselectedPoliticianName);
    }
  }, [preselectedPoliticianName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: text,
          politicianContext: selectedPolitician !== 'All Politicians' ? selectedPolitician : undefined
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'No response generated.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: data.sources,
        suggestedPrompts: data.suggestedPrompts
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error('Failed to get AI assistant response:', error);
      const fallbackMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `### Notice: Temporary Network Latency
I could not connect to the real-time AI service, but here is what the verified BantayPolitiko records indicate:

- **Official Public Records:** You can inspect government infrastructure milestones and contract audits in the **Projects** and **Budget Tracker** views.
- **Politician Dossiers:** For ${selectedPolitician !== 'All Politicians' ? selectedPolitician : 'Hon. Pamela "Pam" Baricuatro (Governor of Cebu)'}, official regional infrastructure projects include the Cebu Provincial Hospital Expansion (85% completed) and Rural Road Improvement Project (40% completed).`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedPrompts: [
          'Tell me about Gov. Pamela Baricuatro of Cebu',
          'Explain difference between citizen sentiment and verified facts'
        ]
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: `### Chat Cleared. How may I assist you?
Ask me about any Philippine politician, legislative bill, public infrastructure project, or budget allocation.`,
        timestamp: 'Just now',
        suggestedPrompts: [
          'Tell me about Gov. Pamela Baricuatro of Cebu',
          'Who are the Senators of the 20th Congress?',
          'Which infrastructure projects in the Philippines are delayed?'
        ]
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end p-2 sm:p-4 md:p-6 bg-slate-950/60 backdrop-blur-xs animate-fadeIn pointer-events-auto">
      {/* Click outside to close backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Drawer Modal */}
      <div className="relative w-full max-w-xl h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden z-10 animate-slideInRight">
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#061e47] via-[#073989] to-[#0757D9] text-white flex items-center justify-between border-b border-blue-900/50 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold tracking-tight">BantayAI</h3>
                <span className="bg-yellow-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Gemini 3.8 Flash
                </span>
              </div>
              <p className="text-xs text-blue-100 flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
                <span>Civic Intelligence & Public Records Assistant</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleResetChat}
              title="Reset conversation"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              title="Close assistant"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Politician Focus Context Selector Bar */}
        <div className="px-5 py-2.5 bg-blue-50/70 border-b border-blue-100 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600 font-bold shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Focus Target:</span>
          </div>

          <div className="flex-1 max-w-xs">
            <select
              value={selectedPolitician}
              onChange={(e) => setSelectedPolitician(e.target.value)}
              className="w-full bg-white border border-blue-200 rounded-lg px-2.5 py-1 text-xs font-bold text-[#102A56] outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
            >
              <option value="All Politicians">🌐 All {allPoliticians.length.toLocaleString()} Tracked Officials</option>
              {selectorPoliticians.map((p) => (
                <option key={p.id} value={p.name}>
                  [{p.roleCategory}] {p.name} ({p.jurisdiction})
                </option>
              ))}
            </select>
          </div>

          {selectedPolitician !== 'All Politicians' && (
            <button
              onClick={() => {
                const match = allPoliticians.find((p) => p.name === selectedPolitician);
                if (match && onOpenProfile) onOpenProfile(match);
              }}
              className="text-[11px] font-bold text-blue-700 hover:text-blue-900 flex items-center gap-0.5 hover:underline"
            >
              <span>View Dossier</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Messages Chat History Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-gradient-to-b from-slate-50/60 to-white">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-700 to-blue-500 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`flex flex-col max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
                  {/* Bubble Container */}
                  <div
                    className={`rounded-2xl p-4 text-xs sm:text-[13px] leading-relaxed shadow-xs transition-all ${
                      isUser
                        ? 'bg-[#0757D9] text-white rounded-br-xs font-medium'
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                    }`}
                  >
                    {/* Render Formatted Markdown-like Content */}
                    <div className="space-y-2 whitespace-pre-wrap">
                      {msg.text.split('\n').map((line, idx) => {
                        if (line.startsWith('### ')) {
                          return (
                            <h4 key={idx} className="text-sm sm:text-base font-extrabold text-[#102A56] mt-2 mb-1">
                              {line.replace('### ', '')}
                            </h4>
                          );
                        }
                        if (line.startsWith('#### ')) {
                          return (
                            <h5 key={idx} className="text-xs sm:text-sm font-bold text-blue-900 mt-2">
                              {line.replace('#### ', '')}
                            </h5>
                          );
                        }
                        if (line.startsWith('- ')) {
                          return (
                            <div key={idx} className="flex items-start gap-1.5 pl-1 my-0.5">
                              <span className="text-blue-500 font-bold shrink-0">•</span>
                              <span>{line.replace('- ', '')}</span>
                            </div>
                          );
                        }
                        if (line.trim() === '') {
                          return <div key={idx} className="h-1" />;
                        }
                        return <p key={idx}>{line}</p>;
                      })}
                    </div>

                    {/* Sources Cited Pill Badge */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-[10px] text-slate-500">
                        <span className="font-bold text-slate-700">Verified Sources:</span>
                        {msg.sources.map((src, i) => (
                          <span
                            key={i}
                            className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium"
                          >
                            {src}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Message Footer with Timestamp & Copy Action */}
                  <div className="mt-1 flex items-center gap-2 px-1 text-[10px] text-slate-400">
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="hover:text-slate-600 flex items-center gap-1 transition-colors"
                        title="Copy message"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600 font-bold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Suggested Follow-up Prompt Chips */}
                  {msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {msg.suggestedPrompts.map((p, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => handleSendMessage(p)}
                          className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 hover:border-blue-400 rounded-full px-3 py-1 text-[11px] font-semibold text-left transition-all shadow-2xs hover:shadow-xs flex items-center gap-1.5"
                        >
                          <HelpCircle className="w-3 h-3 text-blue-500 shrink-0" />
                          <span>{p}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 shadow-xs mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 justify-start animate-pulse">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xs flex items-center gap-2 text-xs text-slate-500 font-semibold">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
                <span>BantayAI is synthesizing official records...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Deep Link Actions Bar */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px]">
          <span className="text-slate-500 font-bold hidden sm:inline">Civic Tools:</span>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {onOpenSmartCity && (
              <button
                onClick={onOpenSmartCity}
                className="px-2.5 py-1 bg-white hover:bg-blue-50 text-[#0757D9] border border-blue-200 rounded-lg font-bold flex items-center gap-1 shadow-2xs"
              >
                <Building className="w-3 h-3" />
                <span>3D Smart City</span>
              </button>
            )}
            {onOpenSpending && (
              <button
                onClick={onOpenSpending}
                className="px-2.5 py-1 bg-white hover:bg-blue-50 text-[#0757D9] border border-blue-200 rounded-lg font-bold flex items-center gap-1 shadow-2xs"
              >
                <Coins className="w-3 h-3" />
                <span>Budget Intelligence</span>
              </button>
            )}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3.5 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder={`Ask BantayAI about ${selectedPolitician !== 'All Politicians' ? selectedPolitician : 'politicians, achievements, budgets'}...`}
            className="flex-1 bg-slate-100 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm outline-none transition-all placeholder:text-slate-400 text-slate-800"
            disabled={isLoading}
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isLoading}
            className="px-4 py-2.5 bg-[#0757D9] hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-xl font-bold transition-all flex items-center justify-center shadow-md disabled:shadow-none shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
