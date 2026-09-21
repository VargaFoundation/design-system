import { twMerge } from "tailwind-merge";

type ClassValue = string | false | null | undefined;

/**
 * Assemble des classes et résout les conflits Tailwind.
 *
 * `twMerge` et non une simple concaténation : un `className="p-4"` passé à une carte qui a
 * déjà `p-6` doit gagner. Concaténées, les deux classes coexistent et c'est l'ordre dans la
 * feuille générée — pas dans l'attribut — qui décide, c'est-à-dire le hasard.
 */
export function cn(...values: ClassValue[]): string {
  return twMerge(values.filter(Boolean).join(" "));
}
