import type { ElementType, HTMLAttributes } from "react";
import { cn } from "../cn";

const WIDTHS = { text: "max-w-3xl", page: "max-w-6xl", wide: "max-w-[1400px]" } as const;

export function Container({
  size = "page",
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { size?: keyof typeof WIDTHS }) {
  return <div className={cn("mx-auto w-full px-6", WIDTHS[size], className)} {...props} />;
}

/**
 * Une bande de page. Le site alterne blanc et gris très clair, séparés par un filet : c'est
 * ce rythme qui donne l'air éditorial, bien plus que la typographie seule.
 */
export function Section({
  tone = "plain",
  divided = true,
  grid = false,
  className,
  ...props
}: HTMLAttributes<HTMLElement> & {
  /** `inverse` : la bande noire du site (« rejoignez-nous »), texte clair, pour un appel fort. */
  tone?: "plain" | "muted" | "inverse";
  divided?: boolean;
  /** La trame de papier millimétré derrière le titre du site. */
  grid?: boolean;
}) {
  const tones = {
    plain: "bg-surface text-ink",
    muted: "bg-surface-muted text-ink",
    // `bg-surface` et non `bg-inverse` : `.inverse` redéfinit les rôles *sur cet élément même*,
    // donc `surface` y vaut déjà le noir. `bg-inverse` y vaudrait le blanc — la bande
    // s'effacerait en voulant s'inverser.
    inverse: "inverse bg-surface text-ink",
  } as const;
  return (
    <section
      className={cn(
        "py-16 md:py-24",
        tones[tone],
        divided && tone !== "inverse" && "border-t border-line",
        grid && "grid-paper",
        className,
      )}
      {...props}
    />
  );
}

const DISPLAY = {
  hero: "text-5xl md:text-7xl leading-none",
  xl: "text-4xl md:text-5xl leading-tight",
  lg: "text-2xl md:text-3xl leading-snug",
  md: "text-xl leading-snug",
  sm: "text-base leading-snug",
} as const;

export function Heading({
  as: Tag = "h2",
  size = "lg",
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { as?: ElementType; size?: keyof typeof DISPLAY }) {
  return <Tag className={cn("font-display font-bold tracking-tight text-ink", DISPLAY[size], className)} {...props} />;
}

/** Texte d'introduction sous un titre : plus grand, plus gris, jamais plus large qu'une ligne lisible. */
export function Lead({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("max-w-3xl text-base text-ink-muted md:text-lg", className)} {...props} />;
}
