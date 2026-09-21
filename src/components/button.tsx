import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "accent" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANTS: Record<ButtonVariant, string> = {
  // Le bouton de la fondation : un plein noir. Une seule action principale par vue.
  primary: "border-inverse bg-inverse text-inverse-ink hover:border-inverse-hover hover:bg-inverse-hover",
  secondary: "border-line-strong bg-surface text-ink hover:bg-surface-muted",
  ghost: "border-transparent bg-transparent text-ink-muted hover:bg-surface-muted hover:text-ink",
  // Le turquoise de la fondation, en aplat : il marque ce qui déclenche une machine, pas ce qui
  // navigue. Texte encre dessus (10,6:1) — du blanc sur ce turquoise ne se lirait pas.
  accent: "border-accent bg-accent text-accent-ink hover:border-accent-hover hover:bg-accent-hover",
  danger: "border-danger bg-surface text-danger hover:bg-danger hover:text-white",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-8 gap-1.5 px-3 text-xs",
  md: "h-10 gap-2 px-4 text-sm",
  lg: "h-12 gap-2 px-6 text-base",
};

/**
 * Les classes d'un bouton, pour habiller autre chose qu'un `<button>` — un `Link` de
 * Next, typiquement, qui doit rester un lien pour la navigation et l'accessibilité.
 */
export function buttonClasses(variant: ButtonVariant = "secondary", size: ButtonSize = "md", className?: string) {
  return cn(
    "inline-flex shrink-0 items-center justify-center border font-medium no-underline whitespace-nowrap",
    "transition-colors duration-200 ease-standard",
    "disabled:cursor-not-allowed disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40",
    VARIANTS[variant],
    SIZES[size],
    className,
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "secondary", size = "md", className, type = "button", ...props },
  ref,
) {
  return <button ref={ref} type={type} className={buttonClasses(variant, size, className)} {...props} />;
});
