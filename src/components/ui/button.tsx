import React from "react";
import { cn } from "@/utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variants = {
      primary:
        "bg-[#7F265B] text-white shadow-sm hover:bg-[#6d214f] hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(127,38,91,0.25)]",
      secondary:
        "bg-slate-100 text-slate-800 hover:bg-slate-200 hover:-translate-y-0.5",
      outline:
        "border border-[#7F265B]/20 bg-white text-[#7F265B] hover:border-[#7F265B] hover:bg-[#7F265B]/5 hover:-translate-y-0.5",
      ghost: "text-slate-600 hover:bg-[#7F265B]/5 hover:text-[#7F265B]",
      danger:
        "bg-red-500 text-white shadow-sm hover:bg-red-600 hover:-translate-y-0.5",
    };

    const sizes = {
      sm: "px-3.5 py-1.5 text-xs",
      md: "px-5 py-2.5 text-sm",
      lg: "px-7 py-3.5 text-base",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
