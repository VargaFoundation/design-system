import type { HTMLAttributes } from "react";
import { cn } from "../cn";

/**
 * La barre d'onglets : un filet sous toute la ligne, un trait épais sous l'onglet actif. Pas
 * de pastilles — le site ne remplit jamais un fond pour montrer une sélection.
 */
export function TabList({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <nav className={cn("flex gap-6 overflow-x-auto border-b border-line", className)} {...props} />;
}

/**
 * Les classes d'un onglet, pour habiller le composant de lien du framework (`Link` de Next)
 * plutôt que d'imposer un `<a>`. `aria-current="page"` sur l'onglet actif.
 */
export function tabClasses(active: boolean, className?: string) {
  return cn(
    "-mb-px inline-flex items-center gap-2 border-b-2 py-3 text-sm whitespace-nowrap no-underline transition-colors duration-200",
    active ? "border-ink font-medium text-ink" : "border-transparent text-ink-muted hover:text-ink",
    className,
  );
}

/** Les classes d'un lien de navigation d'en-tête. */
export function navLinkClasses(active: boolean, className?: string) {
  return cn(
    "text-sm no-underline transition-colors duration-200",
    active ? "text-ink" : "text-ink-muted hover:text-ink",
    className,
  );
}
