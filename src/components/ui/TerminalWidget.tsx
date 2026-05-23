"use client";

import { useState, useEffect } from "react";

type LineType = "prompt" | "default" | "success" | "status" | "echo";

interface TerminalLine {
  text: string;
  type: LineType;
  isInput?: boolean;
}

const LINES: TerminalLine[] = [
  { text: "whoami", type: "prompt", isInput: true },
  { text: "suyash chaudhari", type: "default" },
  { text: "designer + dev", type: "default" },
  { text: "ls skills/", type: "prompt", isInput: true },
  { text: "react next ts", type: "success" },
  { text: "figma css a11y", type: "success" },
  { text: "status", type: "prompt", isInput: true },
  { text: "✓ open to work", type: "status" },
  { text: "✓ remote · global", type: "status" },
  { text: "echo $zero", type: "prompt", isInput: true },
  { text: '"zero shortcuts"', type: "echo" },
];

export function TerminalWidget() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(true);

  useEffect(() => {
    if (visibleLines >= LINES.length) {
      setIsTyping(false);
      return;
    }

    const currentLine = LINES[visibleLines];

    if (currentLine.isInput) {
      if (currentCharIndex < currentLine.text.length) {
        const timeout = setTimeout(() => {
          setCurrentCharIndex((prev) => prev + 1);
        }, 22); // ~22ms per character
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setVisibleLines((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 250); // delay after typing finished
        return () => clearTimeout(timeout);
      }
    } else {
      // Output lines appear instantly but with a delay before the next line
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 150); // stagger delay
      return () => clearTimeout(timeout);
    }
  }, [visibleLines, currentCharIndex]);

  const getColorClass = (type: LineType) => {
    switch (type) {
      case "prompt":
        return "text-[#39ff14]";
      case "success":
        return "text-[#39ff14]";
      case "status":
        return "text-[#e04c36]";
      case "echo":
        return "text-[#fbbf24]";
      default:
        return "text-[#ddd]";
    }
  };

  return (
    <div className="relative w-full max-w-[320px] font-terminal text-[12px] leading-[1.6]">
      {/* "AVAILABLE FOR WORK" Tag */}
      <div className="absolute -top-3 -right-3 z-20 bg-[var(--red)] text-white font-mono text-[9px] uppercase tracking-widest px-2 py-1 shadow-brutal border-2 border-[var(--border-color)]">
        Available for work
      </div>

      {/* Terminal Window */}
      <div className="border-[2.5px] border-[var(--border-color)] bg-[#0d0d0d] shadow-[5px_5px_0_#0f0f0f] relative overflow-hidden flex flex-col h-[280px]">
        {/* CRT Scanline Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-10 opacity-[0.15]"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 1px, #000 1px, #000 2px)"
          }}
        />

        {/* Top Bar */}
        <div className="flex items-center justify-between px-3 py-2 border-b-[2.5px] border-[var(--border-color)] bg-[var(--ink)] z-20">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] border-[1.5px] border-[var(--border-color)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border-[1.5px] border-[var(--border-color)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] border-[1.5px] border-[var(--border-color)]" />
          </div>
          <div className="font-terminal text-[10px] text-[var(--muted)]">
            suyash ~ zsh
          </div>
          <div className="w-[30px]" /> {/* Spacer for centering */}
        </div>

        {/* Terminal Content */}
        <div className="p-4 flex-1 overflow-y-auto z-20 flex flex-col gap-1">
          {LINES.map((line, index) => {
            if (index > visibleLines) return null;
            
            const isCurrentLine = index === visibleLines;
            const textToShow = (isCurrentLine && line.isInput) 
              ? line.text.substring(0, currentCharIndex) 
              : line.text;

            return (
              <div key={index} className="flex gap-2">
                {line.isInput && <span className="text-[#39ff14] shrink-0">~ $</span>}
                <span className={getColorClass(line.type)}>
                  {textToShow}
                  {isCurrentLine && line.isInput && (
                    <span className="inline-block w-2 h-3.5 bg-[#39ff14] ml-1 align-middle animate-[blink_1s_step-end_infinite]" />
                  )}
                </span>
              </div>
            );
          })}
          
          {/* Final blinking cursor after everything is done */}
          {!isTyping && (
            <div className="flex gap-2 mt-1">
              <span className="text-[#39ff14]">~ $</span>
              <span className="inline-block w-2 h-3.5 bg-[#39ff14] ml-1 align-middle animate-[blink_1s_step-end_infinite]" />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-3 py-1.5 border-t-[2.5px] border-[var(--border-color)] bg-[#0d0d0d] flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#39ff14] animate-pulse" />
            <span className="text-[#39ff14] text-[9px] uppercase tracking-widest">Running</span>
          </div>
        </div>
      </div>
    </div>
  );
}
