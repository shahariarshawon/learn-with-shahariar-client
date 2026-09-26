import React from "react";
import { Button } from "./button";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon = "📚",
  title,
  description,
  actionText,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="rounded-[30px] border border-[#7F265B]/10 bg-white/90 px-6 py-16 text-center shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#7F265B]/10 text-2xl">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500 md:text-base">
        {description}
      </p>
      {actionText && onAction ? (
        <Button onClick={onAction} className="mt-6">
          {actionText}
        </Button>
      ) : null}
    </div>
  );
}
