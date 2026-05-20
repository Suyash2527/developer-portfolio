"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils";
import { forwardRef } from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "outline" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, className, children, disabled, ...props }, ref) => {
    
    // Base styles handled mostly in globals.css for specific classes
    const baseStyles = "relative inline-flex items-center justify-center gap-2 focus:outline-none select-none transition-colors duration-200";

    const variants = {
      primary: "primary-button",
      outline: "outline-button",
      ghost: "outline-button border-transparent",
      glass: "outline-button bg-white",
    };

    // Sizing handled by globals.css, but we can allow some overrides here if needed
    // globals.css already specifies px-6 py-3 for outline-button and primary-button
    const sizes = {
      sm: "!px-4 !py-2 !text-[11px]",
      md: "",
      lg: "!px-8 !py-4 !text-base",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4 relative z-10" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export default Button;
