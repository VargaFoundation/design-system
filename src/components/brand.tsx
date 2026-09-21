import type { ReactNode, SVGAttributes } from "react";
import { cn } from "../cn";

/**
 * La marque de la fondation, en vecteur.
 *
 * Restituée depuis le logo officiel (varga.foundation/Image1.png) : sur une grille de 10, une
 * équerre d'épaisseur 1 — barre du haut et barre de gauche —, un blanc de 1, puis un carré plein
 * de 8. L'équerre prend `mark-frame` (le bleu-vert très sombre du logo en clair, le blanc en
 * sombre, sans quoi elle disparaîtrait sur fond noir) ; le carré garde le cyan de la marque.
 */
export function VargaMark({ className, title = "Varga Foundation", ...props }: SVGAttributes<SVGSVGElement> & { title?: string }) {
  return (
    <svg viewBox="0 0 10 10" role="img" aria-label={title} className={cn("size-5 shrink-0", className)} {...props}>
      <path d="M0 0H10V1H1V10H0Z" fill="var(--varga-mark-frame)" />
      <rect x="2" y="2" width="8" height="8" fill="var(--varga-brand)" />
    </svg>
  );
}

/**
 * La marque suivie du nom d'un produit de la fondation : en-tête d'application. En
 * minuscules, comme tout ce que la fondation écrit dans une interface.
 */
export function BrandMark({ name, product, className }: { name: ReactNode; product?: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <VargaMark className="size-5" />
      <span className="font-display text-sm font-bold tracking-tight text-ink">{name}</span>
      {product && <span className="border-l border-line-strong pl-2.5 text-xs text-ink-muted">{product}</span>}
    </span>
  );
}

/**
 * Le carré noir numéroté des valeurs du site (« 01 », « 02 », « 03 ») : pour ordonner des
 * étapes, les jalons d'un workflow, les critères d'une spec.
 */
export function Numeral({ value, className }: { value: number | string; className?: string }) {
  const text = typeof value === "number" ? String(value).padStart(2, "0") : value;
  return (
    <span
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center bg-inverse text-xs font-bold text-inverse-ink tabular-nums",
        className,
      )}
    >
      {text}
    </span>
  );
}

/** Le carré coché de la liste des projets : un élément livré, une case franchie. */
export function CheckSquare({ checked = true, className }: { checked?: boolean; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-4 shrink-0 items-center justify-center border",
        checked ? "border-inverse bg-inverse text-inverse-ink" : "border-line-strong bg-surface",
        className,
      )}
    >
      {checked && (
        <svg viewBox="0 0 10 10" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M1.5 5.2L4 7.5L8.5 2.5" strokeLinecap="square" />
        </svg>
      )}
    </span>
  );
}
