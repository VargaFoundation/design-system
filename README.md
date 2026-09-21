# design-system

Le design system de la [Varga Foundation](https://varga.foundation) : les jetons, les feuilles
Tailwind 4 et les composants React qui donnent à chaque produit de la fondation la même
grammaire que son site.

**Vitrine :** <https://vargafoundation.github.io/design-system/> — rendue depuis les vrais
composants, pas une maquette à part.

## Une grammaire, pas une palette

| | |
| :-- | :-- |
| **le monospace** | JetBrains Mono pour le texte, Space Mono pour les titres et les chiffres. Ligatures coupées : `->` reste deux caractères. |
| **l'angle droit** | Aucun arrondi. Tous les rayons de Tailwind valent 0 : un `rounded-lg` écrit par erreur reste carré. |
| **le filet** | 1 px, gris clair. Une carte se distingue du fond par sa bordure, jamais par une ombre au repos. |
| **les minuscules** | Tout ce que la fondation écrit dans une interface. Une convention d'écriture, pas un `text-transform` : `BILL-42` et `GitHub` gardent leur casse. |
| **un seul accent** | Le turquoise marque ce qui déclenche une machine. Tout le reste est noir, blanc, gris. |
| **le carré** | Puces, états, numéros, cases cochées : la forme de la marque revient partout. |

## Couleur

La marque tient en deux teintes relevées au pixel sur le logo officiel. Le turquoise
d'action **ne se lit pas en texte sur blanc** — il sert en aplat, et une variante plus
profonde prend le relais pour le texte.

| Rôle | Clair | Sur blanc | Usage |
| :-- | :-- | --: | :-- |
| `brand` | `#29F7FF` | 1,33:1 | le carré du logo ; jamais du texte |
| `mark-frame` | `#003336` | 13,75:1 | l'équerre du logo |
| `accent` | `#00D5BE` | 1,86:1 | aplat d'action, avec `accent-ink` dessus (10,6:1) |
| `accent-strong` | `#00796B` | 5,32:1 | le turquoise quand il doit être lu : texte, lien, focus |
| `ink` | `#0A0A0A` | 19,8:1 | texte |
| `ink-muted` | `#525252` | 7,8:1 | texte secondaire, libellés |
| `ink-placeholder` | `#737373` | 4,7:1 | placeholders |
| `ink-subtle` | `#A3A3A3` | 2,5:1 | **décoratif et désactivé seulement** |

Chaque rôle a une valeur sombre. Le mode sombre suit `.dark` ou `data-theme="dark"` sur
`<html>`, et le système si la page n'a rien choisi.

## Installation

Le paquet se consomme depuis le dépôt, à une étiquette de version :

```bash
pnpm add github:VargaFoundation/design-system#v0.1.0
```

Dans la feuille globale de l'application (Tailwind 4) :

```css
@import "tailwindcss";
@import "@varga/design-system/css";
@source "../../node_modules/@varga/design-system/src";
```

Le `@source` compte : sans lui, Tailwind ne voit pas les classes utilisées par les
composants, ne les génère pas, et les composants s'affichent sans style.

Les composants sont livrés en TypeScript source. Avec Next.js :

```js
// next.config.mjs
export default { transpilePackages: ["@varga/design-system"] };
```

Les polices sont **embarquées** (`fonts/`, SIL OFL 1.1) plutôt que chargées depuis Google
Fonts : une politique de sécurité stricte (`font-src 'self'`) bloquerait le CDN, et une
application interne n'a pas à signaler chaque visite à un tiers.

## Composants

```tsx
import { Badge, Button, Card, Eyebrow, Heading, Numeral, Section, Stat, VargaMark } from "@varga/design-system";

<Section grid>
  <Eyebrow>opensource data & ai</Eyebrow>
  <Heading as="h1" size="hero">democratize.</Heading>
  <Button variant="primary">discover our projects</Button>
</Section>
```

| | |
| :-- | :-- |
| **marque** | `VargaMark`, `BrandMark`, `Numeral`, `CheckSquare` |
| **mise en page** | `Container`, `Section` (`plain` · `muted` · `inverse`, trame `grid`), `Heading`, `Lead` |
| **actions** | `Button` (`primary` · `secondary` · `ghost` · `accent` · `danger`), `buttonClasses()` pour habiller un `Link` |
| **états** | `Badge`, `Dot`, `Eyebrow`, `Alert` |
| **contenu** | `Card`, `Stat`, `Label`, `Empty`, `Code`, `Kbd` |
| **formulaires** | `Input`, `Textarea`, `Select`, `Field` |
| **données** | `Table`, `THead`, `TBody`, `TR`, `TH`, `TD` |
| **navigation** | `TabList`, `tabClasses()`, `navLinkClasses()` |

## Règles d'usage

- **Une action principale par vue.** Le bouton noir est rare ; le reste est `secondary`.
- **Le turquoise signale une machine.** `accent` pour lancer un run, pas pour naviguer.
- **Un état se lit sans sa couleur.** La puce carrée accompagne toujours un libellé.
- **Pas d'ombre au repos.** Une seule ombre existe, au survol d'une carte cliquable.

## Contribuer

Les jetons vivent dans `tokens/tokens.json` (format W3C Design Tokens). `css/tokens.css` et
`css/theme.css` en sont **générés** — ne jamais les éditer à la main.

```bash
pnpm install
pnpm tokens      # régénère les feuilles depuis les jetons
pnpm check       # les feuilles correspondent aux jetons, et les composants se typent
pnpm showcase    # reconstruit la vitrine dans docs/
```

La CI refuse une feuille qui a dérivé des jetons.

## Licence

Apache 2.0. Les polices JetBrains Mono et Space Mono sont sous SIL Open Font License 1.1
(`fonts/OFL-*.txt`).
