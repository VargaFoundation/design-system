import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { cn } from "../cn";
import { Dot, type Tone } from "./badge";

/** Un tableau à filets horizontaux seulement : les colonnes se lisent par l'alignement. */
export function Table({ className, ...props }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={cn("w-full border-collapse text-left text-sm tabular-nums", className)} {...props} />
    </div>
  );
}

export function THead({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn("border-b border-ink", className)} {...props} />;
}

export function TBody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn("divide-y divide-line", className)} {...props} />;
}

export function TR({ className, interactive, ...props }: HTMLAttributes<HTMLTableRowElement> & { interactive?: boolean }) {
  return <tr className={cn(interactive && "transition-colors hover:bg-surface-muted", className)} {...props} />;
}

export function TH({ className, align = "left", ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "px-3 py-2 text-xs font-medium whitespace-nowrap text-ink-muted",
        align === "right" && "text-right",
        className,
      )}
      {...props}
    />
  );
}

export function TD({ className, align = "left", ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn("px-3 py-2.5 align-top", align === "right" && "text-right", className)} {...props} />;
}

/** Une zone vide qui dit quoi faire, pas seulement qu'il n'y a rien. */
export function Empty({ title, children, action, className }: { title?: ReactNode; children?: ReactNode; action?: ReactNode; className?: string }) {
  return (
    <div className={cn("border border-dashed border-line-strong px-6 py-12 text-center", className)}>
      {title && <p className="font-display text-sm font-bold text-ink">{title}</p>}
      {children && <p className="mx-auto mt-1 max-w-md text-sm text-ink-muted">{children}</p>}
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}

const ALERT_BORDER: Record<Tone, string> = {
  neutral: "border-l-ink-subtle",
  ink: "border-l-ink",
  accent: "border-l-accent-strong",
  ok: "border-l-ok",
  warn: "border-l-warn",
  danger: "border-l-danger",
};

/** Un message dans la page : un trait épais à gauche porte le ton, le texte reste lisible. */
export function Alert({ tone = "neutral", title, children, className }: { tone?: Tone; title?: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      className={cn("border border-line border-l-2 bg-surface px-4 py-3 text-sm", ALERT_BORDER[tone], className)}
    >
      {title && (
        <p className="mb-0.5 flex items-center gap-2 font-medium text-ink">
          <Dot tone={tone} size={6} />
          {title}
        </p>
      )}
      {children && <div className="text-ink-muted">{children}</div>}
    </div>
  );
}

export function Kbd({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <kbd className={cn("border border-line-strong border-b-2 bg-surface-muted px-1.5 py-0.5 text-xs text-ink", className)} {...props} />;
}

export function Code({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <code className={cn("bg-surface-sunken px-1 py-0.5 text-[0.85em] text-ink", className)} {...props} />;
}
