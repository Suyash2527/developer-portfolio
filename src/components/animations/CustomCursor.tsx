"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Positional state
  const mouse = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide default cursor on body
    document.body.style.cursor = "none";

    const move = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      // Instantly move the crosshair
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    // Determine if hovering over clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleMouseOver);

    // Lerp loop for the red dot
    let animationFrameId: number;
    const render = () => {
      // Lerp logic: current = current + (target - current) * smooth
      dotPos.current.x += (mouse.current.x - dotPos.current.x) * 0.18;
      dotPos.current.y += (mouse.current.y - dotPos.current.y) * 0.18;
      
      if (dotRef.current) {
        dotRef.current.style.left = `${dotPos.current.x}px`;
        dotRef.current.style.top = `${dotPos.current.y}px`;
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={cn(
          "fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out",
          isHovering ? "w-[52px] h-[52px]" : "w-[26px] h-[26px]"
        )}
      >
        <div className={cn(
          "absolute inset-0 border-[1.5px] transition-colors duration-200",
          isHovering ? "border-[var(--red)]" : "border-[var(--border-color)]"
        )} />
        <div className={cn(
          "absolute top-0 left-1/2 w-[1.5px] h-full transition-colors duration-200",
          isHovering ? "bg-[var(--red)]" : "bg-[var(--ink)]"
        )} />
        <div className={cn(
          "absolute top-1/2 left-0 h-[1.5px] w-full transition-colors duration-200",
          isHovering ? "bg-[var(--red)]" : "bg-[var(--ink)]"
        )} />
      </div>
      <div
        ref={dotRef}
        className="fixed w-[5px] h-[5px] bg-[var(--red)] pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}
