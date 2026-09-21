import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../cn";

export type Tone = "neutral" | "accent" | "ok" | "warn" | "danger" | "ink";

const DOT: Record<Tone, string> = {
  neutral: "bg-ink-subtle",
  ink: "bg-ink",
  accent: "bg-accent-strong",
  ok: "bg-ok",
  warn: "bg-warn",
  danger: "bg-danger",
};

const TEXT: Record<Tone, string> = {
  neutral: "text-ink-muted",
  ink: "text-ink",
  accent: "text-accent-strong",
  ok: "text-ok",
  warn: "text-warn",
  danger: "text-danger",
};

/**
 * La puce carrée de la fondation. Carrée, jamais ronde : c'est elle qui ouvre chaque
 * badge du site, et elle porte l'état là où d'autres systèmes mettraient un rond coloré.
 */
export function Dot({ tone = "ink", size = 6, className }: { tone?: Tone; size?: 4 | 6 | 8; className?: string }) {
  const dimension = { 4: "size-1", 6: "size-1.5", 8: "size-2" }[size];
  return <span aria-hidden className={cn("inline-block shrink-0", dimension, DOT[tone], className)} />;
}

/**
 * La signature du site : un filet, une puce carrée, un libellé en monospace. Sert à
 * annoncer une section ou à poser une étiquette au-dessus d'un titre.
 */
export function Eyebrow({ children, tone = "ink", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border border-line-strong px-3 py-1 text-xs text-ink-muted",
        className,
      )}
    >
      <Dot tone={tone} size={4} />
      {children}
    </span>
  );
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  /** `outline` : un filet ; `soft` : un fond léger, pour ce qui doit se voir dans une liste. */
  variant?: "outline" | "soft" | "plain";
  dot?: boolean;
}

const SOFT: Record<Tone, string> = {
  neutral: "bg-surface-sunken",
  ink: "bg-surface-sunken",
  accent: "bg-accent-soft",
  ok: "bg-ok/10",
  warn: "bg-warn/10",
  danger: "bg-danger/10",
};

export function Badge({ tone = "neutral", variant = "outline", dot = true, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        variant === "outline" && "border border-line-strong",
        variant === "soft" && cn("border border-transparent", SOFT[tone]),
        TEXT[tone],
        className,
      )}
      {...props}
    >
      {dot && <Dot tone={tone} size={4} />}
      {children}
    </span>
  );
}
