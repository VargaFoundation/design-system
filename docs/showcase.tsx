/**
 * La vitrine du design system, rendue depuis les vrais composants — pas une maquette à part
 * qui dériverait d'eux. `pnpm showcase` la construit en HTML statique dans `docs/`.
 *
 * Tout y est écrit en minuscules, comme sur varga.foundation : c'est une convention
 * d'écriture, pas un `text-transform`, pour que les noms propres et les identifiants
 * (`BILL-42`, `GitHub`) gardent leur casse.
 */
import tokens from "../tokens/tokens.json";
import {
  Alert,
  Badge,
  BrandMark,
  Button,
  Card,
  CheckSquare,
  Code,
  Container,
  Dot,
  Empty,
  Eyebrow,
  Heading,
  Input,
  Kbd,
  Label,
  Lead,
  Numeral,
  Section,
  Select,
  Stat,
  TBody,
  TD,
  TH,
  THead,
  TR,
  Table,
  TabList,
  Textarea,
  VargaMark,
  tabClasses,
} from "../src";

type Leaf = { $value: string };
const neutrals = Object.entries(tokens.color.neutral).filter(([k]) => !k.startsWith("$")) as [string, Leaf][];
const roles = Object.keys(tokens.semantic.light).filter((k) => !k.startsWith("$"));

function Swatch({ name, color, note }: { name: string; color: string; note?: string }) {
  return (
    <div className="space-y-2">
      <div className="h-16 border border-line" style={{ background: color }} />
      <div>
        <p className="text-xs font-medium text-ink">{name}</p>
        <p className="text-xs text-ink-subtle">{note ?? color.toLowerCase()}</p>
      </div>
    </div>
  );
}

export function Showcase() {
  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-line">
        <Container className="flex h-16 items-center justify-between">
          <BrandMark name="varga.foundation" product="design system" />
          <nav className="flex items-center gap-8 text-sm text-ink-muted">
            <a href="#jetons" className="no-underline hover:text-ink">
              jetons
            </a>
            <a href="#composants" className="no-underline hover:text-ink">
              composants
            </a>
            <a href="#donnees" className="no-underline hover:text-ink">
              données
            </a>
            <Button variant="primary" size="sm">
              github
            </Button>
          </nav>
        </Container>
      </header>

      <Section divided={false} grid className="py-24 md:py-32">
        <Container className="flex flex-col items-center text-center">
          <Eyebrow>v0.1.0 · apache 2.0</Eyebrow>
          <Heading as="h1" size="hero" className="mt-10">
            simplify.
            <br />
            square.
            <br />
            share.
          </Heading>
          <Lead className="mt-10">
            le monospace partout, aucun arrondi, des filets d'un pixel, beaucoup de blanc — et un seul turquoise, réservé à
            ce qui agit.
          </Lead>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button variant="primary" size="lg">
              commencer
            </Button>
            <Button variant="secondary" size="lg">
              lire les principes
            </Button>
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <Heading size="xl" className="text-center">
            nos principes
          </Heading>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[
              ["le monospace", "la fondation écrit comme on écrit du code : JetBrains Mono pour le texte, Space Mono pour les titres."],
              ["l'angle droit", "aucun arrondi, nulle part. un rayon de Tailwind écrit par erreur reste carré."],
              ["un seul accent", "le turquoise marque ce qui déclenche une machine. tout le reste est noir, blanc, gris."],
            ].map(([title, text], index) => (
              <div key={title} className="flex flex-col items-center text-center">
                <Numeral value={index + 1} />
                <p className="mt-5 font-display text-base font-bold">{title}</p>
                <p className="mt-2 max-w-xs text-sm text-ink-muted">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="jetons">
        <Container className="space-y-12">
          <div>
            <Eyebrow>jetons</Eyebrow>
            <Heading size="xl" className="mt-6">
              couleur
            </Heading>
            <Lead className="mt-4">
              la marque tient en deux teintes relevées au pixel sur le logo. le turquoise d'action ne se lit pas en texte sur
              blanc (1,86:1) : il sert en aplat, et <Code>accent-strong</Code> prend le relais pour le texte (5,32:1).
            </Lead>
          </div>
          <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
            <Swatch name="paper" color={tokens.color.base.paper.$value} />
            <Swatch name="ink" color={tokens.color.base.ink.$value} />
            <Swatch name="brand" color={tokens.color.base.brand.$value} note="#29f7ff · logo" />
            <Swatch name="brand-deep" color={tokens.color.base["brand-deep"].$value} note="#003336 · logo" />
            <Swatch name="accent" color={tokens.color.base.accent.$value} note="#00d5be · aplat" />
            <Swatch name="accent-strong" color={tokens.semantic.light["accent-strong"]} note="#00796b · texte" />
          </div>
          <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
            <Swatch name="ok" color={tokens.color.status.ok.$value} />
            <Swatch name="warn" color={tokens.color.status.warn.$value} />
            <Swatch name="danger" color={tokens.color.status.danger.$value} />
          </div>
          <div className="grid grid-cols-6 gap-2 md:grid-cols-11">
            {neutrals.map(([name, value]) => (
              <Swatch key={name} name={`neutral-${name}`} color={value.$value} />
            ))}
          </div>
          <div>
            <Label>rôles sémantiques — ce que les composants consomment ({roles.length})</Label>
            <p className="mt-2 text-sm text-ink-muted">{roles.map((r) => `--varga-${r}`).join("  ·  ")}</p>
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container className="grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>jetons</Eyebrow>
            <Heading size="xl" className="mt-6">
              typographie
            </Heading>
            <Lead className="mt-4">
              ligatures coupées : en monospace, <Code>{"->"}</Code> doit rester deux caractères lisibles.
            </Lead>
          </div>
          <div className="space-y-6">
            <div>
              <Label>space mono · titres</Label>
              <p className="mt-2 font-display text-5xl leading-none font-bold tracking-tight">aa 0123</p>
            </div>
            <div>
              <Label>jetbrains mono · texte</Label>
              <p className="mt-2 text-base">un ticket entre, une mise en production maîtrisée sort.</p>
              <p className="mt-1 text-sm text-ink-muted">0 1 2 3 4 5 6 7 8 9 — l0O Il1 {"{} [] () <> => ->"}</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="composants">
        <Container className="space-y-12">
          <div>
            <Eyebrow>composants</Eyebrow>
            <Heading size="xl" className="mt-6">
              actions
            </Heading>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">principal</Button>
            <Button variant="secondary">secondaire</Button>
            <Button variant="ghost">discret</Button>
            <Button variant="accent">lancer le run</Button>
            <Button variant="danger">rejeter</Button>
            <Button variant="secondary" disabled>
              indisponible
            </Button>
          </div>

          <div>
            <Heading size="lg">états</Heading>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Badge>brouillon</Badge>
              <Badge tone="accent">en cours · agent</Badge>
              <Badge tone="ink">attente humaine</Badge>
              <Badge tone="ok">en production</Badge>
              <Badge tone="warn">budget à 82 %</Badge>
              <Badge tone="danger">bloqué</Badge>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Badge variant="soft">brouillon</Badge>
              <Badge variant="soft" tone="accent">
                en cours · agent
              </Badge>
              <Badge variant="soft" tone="ok">
                en production
              </Badge>
              <Badge variant="soft" tone="warn">
                budget à 82 %
              </Badge>
              <Badge variant="soft" tone="danger">
                bloqué
              </Badge>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card eyebrow="projet" title="billing-api" action={<Badge tone="ok">sain</Badge>} interactive>
              <p className="text-sm text-ink-muted">facturation et avoirs. workflow default-simple, preset solo.</p>
            </Card>
            <Card title="coût du mois">
              <Stat value="42,18 €" label="dépensé" hint="sur un budget de 200 €" />
            </Card>
            <Card title="runs">
              <div className="grid grid-cols-2 gap-4">
                <Stat value="128" label="terminés" />
                <Stat value="3" label="bloqués" tone="danger" />
              </div>
            </Card>
          </div>

          <div>
            <Heading size="lg">livrables</Heading>
            <ul className="mt-6 max-w-2xl space-y-4">
              {[
                ["ecphoria", "une plateforme de mémoire open source pour agents ia, en un seul binaire Rust."],
                ["choregos", "un ticket entre, une mise en production maîtrisée sort."],
                ["design-system", "ce dépôt : jetons, feuilles Tailwind 4 et composants React."],
              ].map(([name, text]) => (
                <li key={name} className="flex gap-3">
                  <CheckSquare className="mt-0.5" />
                  <div>
                    <p className="font-bold">{name}</p>
                    <p className="text-sm text-ink-muted">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container className="grid gap-12 md:grid-cols-2">
          <div className="space-y-5">
            <Eyebrow>composants</Eyebrow>
            <Heading size="xl">formulaires</Heading>
            <div className="space-y-1.5">
              <Label>dépôt applicatif</Label>
              <Input placeholder="https://github.com/acme/billing-api" />
            </div>
            <div className="space-y-1.5">
              <Label>template</Label>
              <Select defaultValue="k8s">
                <option value="k8s">github-tekton-argo-k8s</option>
                <option value="aca">github-aca</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>raison du rejet</Label>
              <Textarea placeholder="ce qui manque avant de continuer…" />
            </div>
          </div>
          <div className="space-y-5">
            <Heading size="lg">messages</Heading>
            <Alert tone="accent" title="un agent travaille sur ce ticket">
              il écrit la spécification. vous serez sollicité pour la valider.
            </Alert>
            <Alert tone="warn" title="budget à 82 %">
              le prochain run pourrait dépasser le plafond du projet.
            </Alert>
            <Alert tone="danger" title="run bloqué">
              la vérification a échoué deux fois sur la même assertion.
            </Alert>
            <Empty title="aucun ticket prêt" action={<Button variant="primary" size="sm">créer un ticket</Button>}>
              posez le label <Code>agent-ready</Code> sur une issue pour qu'un agent la prenne.
            </Empty>
            <p className="text-sm text-ink-muted">
              raccourci : <Kbd>⌘</Kbd> <Kbd>K</Kbd>
            </p>
          </div>
        </Container>
      </Section>

      <Section id="donnees">
        <Container className="space-y-8">
          <div>
            <Eyebrow>composants</Eyebrow>
            <Heading size="xl" className="mt-6">
              données
            </Heading>
          </div>
          <TabList>
            <a href="#donnees" aria-current="page" className={tabClasses(true)}>
              vue d'ensemble
            </a>
            <a href="#donnees" className={tabClasses(false)}>
              board
            </a>
            <a href="#donnees" className={tabClasses(false)}>
              trains
            </a>
            <a href="#donnees" className={tabClasses(false)}>
              mémoire
            </a>
          </TabList>
          <Card padding="none">
            <Table>
              <THead>
                <tr>
                  <TH>ticket</TH>
                  <TH>état</TH>
                  <TH>acteur</TH>
                  <TH align="right">coût</TH>
                  <TH align="right">durée</TH>
                </tr>
              </THead>
              <TBody>
                {(
                  [
                    ["BILL-42", "en cours", "accent", "agent · claude", "0,31 €", "4 min"],
                    ["BILL-41", "attente humaine", "ink", "Marie", "0,62 €", "—"],
                    ["BILL-38", "en production", "ok", "train du 18/09", "1,04 €", "22 min"],
                    ["BILL-37", "bloqué", "danger", "agent · gemini", "2,40 €", "38 min"],
                  ] as const
                ).map(([key, state, tone, actor, cost, duration]) => (
                  <TR key={key} interactive>
                    <TD className="font-medium">{key}</TD>
                    <TD>
                      <Badge tone={tone} variant="plain">
                        {state}
                      </Badge>
                    </TD>
                    <TD className="text-ink-muted">
                      <span className="inline-flex items-center gap-2">
                        <Dot tone={tone === "ink" || tone === "accent" ? tone : "neutral"} size={4} />
                        {actor}
                      </span>
                    </TD>
                    <TD align="right">{cost}</TD>
                    <TD align="right" className="text-ink-muted">
                      {duration}
                    </TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          </Card>
          <div className="grid grid-cols-2 border border-line md:grid-cols-4">
            {[
              ["1", "pays contributeurs"],
              ["12", "contributeurs"],
              ["5", "projets actifs"],
              ["11", "organisations"],
            ].map(([value, label], index) => (
              <div key={label} className={index > 0 ? "border-l border-line p-6 text-center" : "p-6 text-center"}>
                <Stat value={value} label={label} className="items-center" />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="inverse">
        <Container className="flex flex-col items-center text-center">
          <Heading size="xl">rejoignez-nous</Heading>
          <Lead className="mt-4">participez à la démocratisation des technologies data et ia.</Lead>
          <div className="mt-8 flex gap-3">
            <Button variant="primary">contribuer</Button>
            <Button variant="secondary">faire un don</Button>
          </div>
        </Container>
      </Section>

      <footer className="border-t border-line py-10">
        <Container className="flex items-center justify-between text-xs text-ink-subtle">
          <span className="inline-flex items-center gap-2">
            <VargaMark className="size-3.5" />© 2026 varga foundation · apache 2.0
          </span>
          <span>@varga/design-system</span>
        </Container>
      </footer>
    </div>
  );
}
