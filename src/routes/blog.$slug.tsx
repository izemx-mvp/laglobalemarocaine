import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, useScroll } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Copy,
  Factory,
  Layers3,
  Lightbulb,
  Linkedin,
  MessageCircle,
  Ruler,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/site/blocks";
import { Button } from "@/components/ui/button";
import { posts } from "@/components/site/site-data";
import logo from "@/assets/lgm-logo.png";
import productionImage from "@/assets/industrial-production.jpg";

const sections = [
  { id: "comprendre-usage", label: "Comprendre l’usage" },
  { id: "criteres-techniques", label: "Définir les critères" },
  { id: "regularite-industrielle", label: "Maîtriser la régularité" },
] as const;

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} | LGM` },
          { name: "description", content: loaderData.post.excerpt },
          { property: "og:title", content: loaderData.post.title },
          { property: "og:description", content: loaderData.post.excerpt },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Article indisponible | LGM" }, { name: "robots", content: "noindex" }],
  }),
  component: Article,
});

function ShareActions({ title, light = false }: { title: string; light?: boolean }) {
  const [copied, setCopied] = useState(false);

  const share = (network: "linkedin" | "whatsapp") => {
    const url = window.location.href;
    const destination =
      network === "linkedin"
        ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        : `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`;
    window.open(destination, "_blank", "noopener,noreferrer");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Partager cet article">
      <span className={`mr-2 text-xs font-semibold uppercase tracking-widest ${light ? "text-muted-foreground" : "text-primary-foreground/60"}`}>
        Partager
      </span>
      <Button
        type="button"
        size="icon"
        variant={light ? "outline" : "heroOutline"}
        onClick={() => share("linkedin")}
        aria-label="Partager sur LinkedIn"
        title="Partager sur LinkedIn"
      >
        <Linkedin />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={light ? "outline" : "heroOutline"}
        onClick={() => share("whatsapp")}
        aria-label="Partager sur WhatsApp"
        title="Partager sur WhatsApp"
      >
        <MessageCircle />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={light ? "outline" : "heroOutline"}
        onClick={copyLink}
        aria-label="Copier le lien"
        title="Copier le lien"
      >
        {copied ? <Check /> : <Copy />}
      </Button>
      <span className={`min-w-24 text-sm ${light ? "text-muted-foreground" : "text-primary-foreground/70"}`} aria-live="polite">
        {copied ? "Lien copié" : ""}
      </span>
    </div>
  );
}

function Article() {
  const { post } = Route.useLoaderData();
  const similar = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const { scrollYProgress } = useScroll();

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-highlight"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />
      <article>
        <header className="surface-grid bg-primary-dark pb-16 pt-36 text-primary-foreground sm:pb-20">
          <div className="container-wide">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground"
            >
              <ArrowLeft className="size-4" /> Retour au journal
            </Link>
            <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold uppercase tracking-widest text-primary-foreground/60">
              <span>{post.category} · {post.date}</span>
              <span className="hidden h-4 w-px bg-primary-foreground/25 sm:block" />
              <span className="inline-flex items-center gap-2 normal-case tracking-normal">
                <Clock3 className="size-4 text-highlight" /> 5 min de lecture
              </span>
            </div>
            <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-tight sm:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/70">
              {post.excerpt}
            </p>
            <div className="mt-8">
              <ShareActions title={post.title} />
            </div>
          </div>
        </header>

        <figure className="container-wide -mt-1">
          <img
            src={post.image}
            width={1536}
            height={864}
            alt={`Photographie industrielle : ${post.title}`}
            className="aspect-[16/9] w-full object-cover"
          />
          <figcaption className="border-x border-b border-border bg-card px-4 py-3 text-sm text-muted-foreground sm:px-6">
            L’analyse des conditions réelles d’utilisation guide la définition d’un emballage industriel adapté.
          </figcaption>
        </figure>

        <div className="container-wide grid gap-12 py-16 lg:grid-cols-[220px_minmax(0,760px)] lg:justify-center lg:py-24 xl:gap-20">
          <aside className="hidden lg:block">
            <nav className="sticky top-28 border-l border-border pl-6" aria-label="Sommaire de l’article">
              <p className="text-xs font-bold uppercase tracking-widest text-highlight">Dans cet article</p>
              <ol className="mt-5 space-y-4 text-sm">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="group flex gap-3 text-muted-foreground hover:text-primary"
                    >
                      <span className="font-semibold text-highlight">0{index + 1}</span>
                      <span>{section.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="min-w-0 text-lg leading-8">
            <Reveal>
              <p className="border-l-4 border-highlight pl-6 text-xl font-medium leading-9 sm:text-2xl">
                Dans l’industrie, une solution d’emballage pertinente commence toujours par une
                compréhension précise du produit, de son parcours et de ses contraintes.
              </p>
            </Reveal>

            <Reveal>
              <section id="comprendre-usage" className="scroll-mt-28 pt-16">
                <div className="flex items-start gap-5">
                  <span className="font-display text-5xl font-bold leading-none text-highlight/35">01</span>
                  <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                    Comprendre l’usage avant de définir la solution
                  </h2>
                </div>
                <p className="mt-6 text-muted-foreground">
                  La manutention, le stockage, l’exposition aux éléments et les équipements de
                  conditionnement influencent directement le choix du format. Une analyse méthodique
                  permet d’identifier les caractéristiques essentielles sans complexité inutile.
                </p>
                <div className="surface-grid-dark mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
                  {[
                    [Ruler, "Dimensions utiles", "Calibrer le format selon le produit et la ligne."],
                    [Layers3, "Épaisseur ciblée", "Ajuster la matière aux contraintes rencontrées."],
                    [ShieldCheck, "Niveau de protection", "Anticiper stockage, transport et exposition."],
                    [Factory, "Cadence de production", "Préserver la fluidité des opérations."],
                  ].map(([Icon, title, text]) => {
                    const ItemIcon = Icon as typeof Ruler;
                    return (
                      <div key={title as string} className="bg-card p-6">
                        <ItemIcon className="size-6 text-primary" />
                        <h3 className="mt-4 text-base font-bold">{title as string}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{text as string}</p>
                      </div>
                    );
                  })}
                </div>
              </section>
            </Reveal>

            <Reveal>
              <section id="criteres-techniques" className="scroll-mt-28 pt-20">
                <div className="flex items-start gap-5">
                  <span className="font-display text-5xl font-bold leading-none text-highlight/35">02</span>
                  <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                    Transformer les contraintes en critères techniques
                  </h2>
                </div>
                <p className="mt-6 text-muted-foreground">
                  Le dialogue technique permet de hiérarchiser les priorités. Il relie le besoin
                  exprimé aux conditions de production afin de construire une réponse claire,
                  reproductible et adaptée aux flux de l’entreprise.
                </p>

                <figure className="my-10 overflow-hidden rounded-lg bg-primary-dark">
                  <img
                    src={productionImage}
                    width={1536}
                    height={1024}
                    loading="lazy"
                    alt="Suivi d’une ligne de production d’emballages plastiques LGM"
                    className="aspect-[4/3] w-full object-cover sm:aspect-[16/9]"
                  />
                  <figcaption className="px-5 py-4 text-sm text-primary-foreground/70">
                    Le suivi en production contribue à maintenir des caractéristiques régulières d’une série à l’autre.
                  </figcaption>
                </figure>

                <div className="grid overflow-hidden rounded-lg bg-primary-dark text-primary-foreground sm:grid-cols-[180px_1fr]">
                  <div className="flex items-center justify-center bg-highlight p-8 text-center">
                    <div>
                      <strong className="block font-display text-6xl leading-none">1986</strong>
                      <span className="mt-2 block text-xs font-semibold uppercase tracking-widest">Année de création</span>
                    </div>
                  </div>
                  <p className="flex items-center p-7 text-base leading-7 text-primary-foreground/75">
                    Une expérience industrielle construite dans la durée, au contact des besoins des entreprises marocaines.
                  </p>
                </div>

                <div className="mt-10 border border-primary/20 bg-primary/5 p-6 sm:p-8">
                  <div className="flex gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Lightbulb className="size-5" />
                    </span>
                    <div>
                      <p className="font-display text-sm font-bold uppercase tracking-widest text-primary">À retenir</p>
                      <p className="mt-2 text-base leading-7">
                        Le bon niveau de spécification est celui qui répond à l’usage réel. Chaque paramètre doit avoir une fonction concrète dans la chaîne de conditionnement.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </Reveal>

            <Reveal>
              <section id="regularite-industrielle" className="scroll-mt-28 pt-20">
                <div className="flex items-start gap-5">
                  <span className="font-display text-5xl font-bold leading-none text-highlight/35">03</span>
                  <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                    La régularité, un enjeu industriel
                  </h2>
                </div>
                <p className="mt-6 text-muted-foreground">
                  Au-delà des propriétés du matériau, la constance entre les séries facilite les
                  opérations et sécurise les flux. C’est pourquoi chaque besoin mérite un échange
                  technique et un suivi adapté.
                </p>
                <ol className="mt-8 space-y-4">
                  {["Qualifier précisément l’application et ses contraintes.", "Valider les caractéristiques nécessaires au conditionnement.", "Suivre la régularité du résultat dans la durée."].map((item, index) => (
                    <li key={item} className="flex gap-4 rounded-lg border border-border bg-card p-5">
                      <CheckCircle2 className="mt-1 size-5 shrink-0 text-highlight" />
                      <span><strong className="mr-2 text-primary">0{index + 1}</strong>{item}</span>
                    </li>
                  ))}
                </ol>
                <blockquote className="my-12 border-l-4 border-highlight bg-secondary p-7 sm:p-9">
                  <p className="font-display text-xl font-medium leading-8">
                    « L’équipe LGM accompagne chaque demande sur la base des contraintes réelles de production et d’utilisation. »
                  </p>
                </blockquote>
              </section>
            </Reveal>

            <Reveal>
              <div className="mt-16 flex flex-col gap-6 border-y border-border py-8 sm:flex-row sm:items-center">
                <div className="flex size-20 shrink-0 items-center justify-center rounded-lg border border-border bg-background p-3">
                  <img src={logo} alt="LGM" className="h-full w-full object-contain" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-highlight">Auteur</p>
                  <h2 className="mt-1 text-xl font-bold">Rédigé par l’équipe LGM</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    L’expertise de La Globale Marocaine au service des enjeux d’emballage des industriels depuis 1986.
                  </p>
                </div>
              </div>
              <div className="mt-10 flex flex-wrap items-center justify-between gap-5">
                <ShareActions title={post.title} light />
                <Button asChild variant="cta" size="lg">
                  <Link to="/devis">
                    Échanger sur votre besoin <ArrowRight />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </article>

      <section className="section-pad diagonal-top surface-grid-dark bg-secondary pt-32">
        <div className="container-wide">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-highlight">Le journal LGM</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">À lire aussi</h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {similar.map((p, index) => (
              <Reveal key={p.slug} delay={index * 0.08}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group block overflow-hidden rounded-lg bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="overflow-hidden">
                    <img
                      src={p.image}
                      width={1536}
                      height={1024}
                      loading="lazy"
                      alt={`Illustration de l’article : ${p.title}`}
                      className="aspect-[16/9] w-full object-cover image-hover group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 sm:p-7">
                    <p className="text-xs font-semibold uppercase tracking-widest text-highlight">{p.category}</p>
                    <h3 className="mt-3 text-xl font-semibold leading-snug transition-colors group-hover:text-primary">{p.title}</h3>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Lire l’article <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}