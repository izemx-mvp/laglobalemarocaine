import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Factory, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero, Reveal, SectionHeading, CtaBand, ProductCard } from "@/components/site/blocks";
import { products } from "@/components/site/site-data";
import hero from "@/assets/industrial-production.jpg";
import rolls from "@/assets/film-rolls.jpg";
import greenhouse from "@/assets/agricultural-greenhouse.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "La Globale Marocaine | Emballages plastiques industriels depuis 1986" },
      {
        name: "description",
        content:
          "LGM conçoit et fabrique à Casablanca et Had Soualem des films, sacs, housses, gaines et films agricoles pour l'industrie.",
      },
      {
        property: "og:title",
        content: "La Globale Marocaine — Le plastique au service de vos ambitions",
      },
      {
        property: "og:description",
        content: "Fabricant marocain d'emballages plastiques industriels depuis 1986.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero
        image={hero}
        eyebrow="Fabricant marocain • Depuis 1986"
        title="Le plastique au service de vos ambitions."
        description="Films, sacs, housses et gaines conçus pour les exigences de l'industrie, produits avec rigueur à Had Soualem."
        full
      >
        <Button asChild size="lg" variant="cta">
          <Link to="/devis">
            Demander un devis <ArrowRight />
          </Link>
        </Button>
        <Button asChild size="lg" variant="heroOutline">
          <Link to="/produits">Découvrir nos produits</Link>
        </Button>
      </Hero>
      <section className="bg-primary-dark py-8 text-primary-foreground">
        <div className="container-wide grid gap-px bg-primary-foreground/15 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["39", "ans d’expérience"],
            ["50–100", "collaborateurs"],
            ["01", "site de production"],
            ["100%", "marocain"],
          ].map(([n, l]) => (
            <div key={l} className="bg-primary-dark px-7 py-7">
              <div className="font-display text-4xl font-bold">{n}</div>
              <div className="mt-1 text-sm text-primary-foreground/70">{l}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="section-pad">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="Notre savoir-faire"
              title="Des solutions pensées pour vos contraintes réelles."
              text="De la protection légère aux applications industrielles intensives, notre gamme répond aux besoins de chaque métier."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad bg-secondary">
        <div className="container-wide space-y-20">
          <Reveal>
            <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_.85fr]">
              <div className="overflow-hidden rounded-lg">
                <img
                  src={rolls}
                  width={1536}
                  height={1024}
                  loading="lazy"
                  alt="Rouleaux de film plastique transparent sur une ligne industrielle"
                  className="aspect-[5/4] w-full object-cover image-hover hover:scale-105"
                />
              </div>
              <div>
                <span className="text-sm font-semibold uppercase text-highlight">
                  Maîtrise industrielle
                </span>
                <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
                  Une qualité régulière, série après série.
                </h2>
                <p className="mt-5 leading-7 text-muted-foreground">
                  Notre outil de production et notre expérience permettent de transformer vos
                  spécifications en emballages fiables, avec une attention constante portée à la
                  matière, aux dimensions et à la finition.
                </p>
                <ul className="mt-7 space-y-3">
                  {[
                    "Conseil technique au plus près de l’usage",
                    "Production adaptée aux volumes industriels",
                    "Suivi rigoureux de chaque demande",
                  ].map((x) => (
                    <li key={x} className="flex gap-3">
                      <ShieldCheck className="mt-0.5 text-primary" /> {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="grid items-center gap-10 lg:grid-cols-[.85fr_1.15fr]">
              <div className="lg:order-2 overflow-hidden rounded-lg">
                <img
                  src={greenhouse}
                  width={1536}
                  height={1024}
                  loading="lazy"
                  alt="Serre agricole moderne protégée par un film plastique transparent"
                  className="aspect-[5/4] w-full object-cover image-hover hover:scale-105"
                />
              </div>
              <div>
                <span className="text-sm font-semibold uppercase text-highlight">
                  Un partenaire de proximité
                </span>
                <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
                  Ancrés au Maroc. Tournés vers vos objectifs.
                </h2>
                <p className="mt-5 leading-7 text-muted-foreground">
                  Du siège de Casablanca à l’usine de Had Soualem, nos équipes accompagnent les
                  industriels et acteurs agricoles avec réactivité.
                </p>
                <div className="mt-7 flex items-center gap-3 font-medium text-primary">
                  <MapPin /> Casablanca · Had Soualem
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-wide">
          <SectionHeading eyebrow="Secteurs desservis" title="Une matière. De multiples métiers." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["Industrie & logistique", "Agriculture", "Agroalimentaire", "Construction"].map(
              (x, i) => (
                <div
                  key={x}
                  className="group border-t-2 border-primary p-6 transition-colors hover:bg-secondary"
                >
                  <Factory className="text-primary" />
                  <h3 className="mt-10 text-xl font-semibold">{x}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Des formats étudiés selon vos usages et conditions opérationnelles.
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>
      <CtaBand
        title="Parlons de votre prochain besoin industriel."
        text="Notre équipe étudie vos spécifications et vous répond avec une proposition adaptée."
      />
    </>
  );
}
