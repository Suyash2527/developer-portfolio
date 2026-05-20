"use client";

import { STATIC_SKILLS } from "@/data/portfolio";

export function Ticker() {
  // Use all skills for the ticker
  const items = STATIC_SKILLS.map((s) => s.name);

  // Duplicate items to ensure smooth infinite scrolling
  const displayItems = [...items, ...items, ...items, ...items];

  return (
    <div className="bg-[#0f0f0f] border-y-[2.5px] border-[#0f0f0f] py-3 overflow-hidden group">
      <div className="flex w-max animate-[scrollTicker_28s_linear_infinite] group-hover:[animation-play-state:paused]">
        <ul className="flex items-center shrink-0 px-6 m-0 list-none">
          {displayItems.map((item, i) => (
            <li key={i} className="flex items-center">
              <span 
                className={`font-heading text-lg whitespace-nowrap px-4 tracking-[0.01em] ${
                  i % 3 === 2 ? "text-[#f0d43a]" : "text-white"
                }`}
              >
                {item}
              </span>
              <span className="text-[#dd4433] text-[12px] leading-none shrink-0">■</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
