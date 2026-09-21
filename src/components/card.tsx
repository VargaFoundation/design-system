import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../cn";

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title?: ReactNode;
  /** Une ligne au-dessus du titre, en petites capitales. */
  eyebrow?: ReactNode;
  /** Un bouton ou un lien aligné à droite de l'en-tête. */
  action?: ReactNode;
  /** Se soulève d'un pixel au survol : pour une carte qui est un lien. */
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const PADDING = { none: "", sm: "p-4", md: "p-6", lg: "p-8" } as const;

/**
 * Un bloc à filet. Pas d'ombre au repos, pas d'arrondi : la carte se distingue du fond par
 * sa bordure, comme sur le site. L'ombre n'apparaît qu'au survol d'une carte cliquable.
 */
export function Card({
  title,
  eyebrow,
  action,
  interactive,
  padding = "md",
  className,
  children,
  ...props
}: CardProps) {
  const hasHeader = title != null || eyebrow != null || action != null;
  return (
    <section
      className={cn(
        "border border-line bg-surface",
        interactive && "transition-shadow duration-200 ease-standard hover:border-line-strong hover:shadow-hover",
        PADDING[padding],
        className,
      )}
      {...props}
    >
      {hasHeader && (
        <header
          className={cn(
            "mb-4 flex items-start justify-between gap-4",
            // Une carte sans marge (un tableau qui va d'un bord à l'autre) garde un en-tête aéré.
            padding === "none" && "px-6 pt-6",
          )}
        >
          <div className="min-w-0 space-y-1">
            {eyebrow != null && <Label>{eyebrow}</Label>}
            {typeof title === "string" ? (
              <h3 className="font-display text-base font-bold tracking-tight text-ink">{title}</h3>
            ) : (
              title
            )}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

/**
 * Libellé : en-tête de champ, légende de chiffre. En minuscules comme tout ce que la fondation
 * écrit, et en `ink-muted` — `ink-subtle` (2,5:1 sur blanc) ne se lit pas.
 */
export function Label({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("block text-xs text-ink-muted", className)}
      {...props}
    />
  );
}

/**
 * Un chiffre mis en avant. Le nombre en Space Mono, grand ; le libellé dessous, petit —
 * c'est la hiérarchie des chiffres clés du site.
 */
export function Stat({
  value,
  label,
  hint,
  tone = "ink",
  className,
}: {
  value: ReactNode;
  label: ReactNode;
  hint?: ReactNode;
  tone?: "ink" | "accent" | "ok" | "warn" | "danger";
  className?: string;
}) {
  const color = { ink: "text-ink", accent: "text-accent-strong", ok: "text-ok", warn: "text-warn", danger: "text-danger" }[tone];
  return (
    <div className={cn("space-y-1", className)}>
      <div className={cn("font-display text-3xl leading-none font-bold tracking-tight tabular-nums", color)}>{value}</div>
      <Label>{label}</Label>
      {hint != null && <p className="text-xs text-ink-muted">{hint}</p>}
    </div>
  );
}
