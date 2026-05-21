"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  sender: "user" | "agent";
  text: string;
};

export default function AgentChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "agent",
      text: "INITIATING UPLINK...\nCONNECTION ESTABLISHED.\nI am the digital assistant for Suyash. How can I help you?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Generate a random session ID on mount
  useEffect(() => {
    setSessionId(Math.random().toString(36).substring(2, 15));
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text, sessionId }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), sender: "agent", text: data.reply || "ERROR: UNKNOWN RESPONSE" },
      ]);
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "agent",
          text: "ERROR: CONNECTION LOST. " + (err.message || "Failed to reach agent backend."),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, type: "spring", bounce: 0.5 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-[#dd4433] text-white border-[2.5px] border-[#0f0f0f] brutal-shadow font-mono text-xs uppercase tracking-widest cursor-none hover:bg-[#0f0f0f] transition-colors"
      >
        {isOpen ? "CLOSE TERMINAL" : "🤖 ASK JARVIS AI"}
      </motion.button>

      {/* Floating Terminal Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[360px] sm:w-[400px] h-[500px] max-h-[70vh] bg-[#111111] border-[2.5px] border-[#0f0f0f] brutal-shadow z-50 flex flex-col font-mono"
          >
            {/* Terminal Header */}
            <div className="bg-[#0f0f0f] p-3 flex justify-between items-center border-b-[2.5px] border-[#333333]">
              <div className="flex gap-2">
                <span className="w-3 h-3 bg-[#dd4433] rounded-none border border-[#333]"></span>
                <span className="w-3 h-3 bg-[#f0d43a] rounded-none border border-[#333]"></span>
                <span className="w-3 h-3 bg-[#15a315] rounded-none border border-[#333]"></span>
              </div>
              <span className="text-[#888] text-[10px] uppercase tracking-widest">
                JARVIS_AI_TERMINAL
              </span>
            </div>

            {/* Chat History */}
            <div 
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 text-sm"
            >
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <span className="text-[9px] uppercase tracking-widest text-[#555] mb-1">
                    {msg.sender === "user" ? "GUEST" : "SYSTEM"}
                  </span>
                  <div 
                    className={`p-3 max-w-[85%] whitespace-pre-wrap ${
                      msg.sender === "user" 
                        ? "bg-[#333333] text-white border-r-2 border-[#dd4433]" 
                        : "bg-transparent text-[#15a315] border-l-2 border-[#15a315]"
                    }`}
                  >
                    {msg.sender === "agent" && "> "}{msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex flex-col items-start">
                   <span className="text-[9px] uppercase tracking-widest text-[#555] mb-1">SYSTEM</span>
                   <div className="text-[#15a315] animate-pulse">
                     &gt; PROCESSING...
                   </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="border-t-[2.5px] border-[#333333] flex">
              <div className="bg-[#111111] text-[#15a315] p-3 flex items-center justify-center font-bold">
                &gt;
              </div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type command..."
                className="flex-1 bg-transparent border-none outline-none text-[#15a315] placeholder:text-[#444] p-3 cursor-none"
                autoFocus
              />
              <button 
                type="submit"
                disabled={isTyping}
                className="bg-[#333333] text-white px-4 text-[10px] uppercase tracking-widest hover:bg-[#dd4433] cursor-none"
              >
                EXEC
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
