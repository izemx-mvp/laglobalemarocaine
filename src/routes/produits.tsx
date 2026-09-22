import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand, Hero, Reveal, SectionHeading } from "@/components/site/blocks";
import { products } from "@/components/site/site-data";
import hero from "@/assets/bags-covers.jpg";
export const Route = createFileRoute("/produits")({
  head: () => ({
    meta: [
      { title: "Films, sacs, housses et gaines plastiques | LGM" },
      {
        name: "description",
        content:
          "Découvrez les catégories d’emballages plastiques industriels fabriqués par La Globale Marocaine.",
      },
      { property: "og:title", content: "Nos produits d’emballage industriel — LGM" },
      {
        property: "og:description",
        content: "Films, sacs, housses, gaines et films agricoles conçus au Maroc.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Products,
});
function Products() {
  const filters = [
    "Tous",
    "Industrie",
    "Agriculture",
    "Agroalimentaire",
    "Logistique",
    "Construction",
  ];
  const [filter, setFilter] = useState("Tous");
  const shown = filter === "Tous" ? products : products.filter((p) => p.sectors.includes(filter));
  return (
    <>
      <Hero
        image={hero}
        eyebrow="Nos produits"
        title="La bonne protection, pour chaque application."
        description="Une gamme complète de solutions plastiques industrielles, définies selon vos usages et vos contraintes."
        align="center"
      />
      <section className="section-pad surface-grid-dark">
        <div className="container-wide">
          <SectionHeading eyebrow="Gamme LGM" title="Cinq familles. Des possibilités sur mesure." />
          <div
            className="mt-10 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filtrer par secteur"
          >
            {filters.map((x) => (
              <Button
                key={x}
                variant={filter === x ? "cta" : "outline"}
                onClick={() => setFilter(x)}
                role="tab"
                aria-selected={filter === x}
              >
                {x}
              </Button>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <article className="group overflow-hidden rounded-lg border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative overflow-hidden">
                    <img
                      src={p.image}
                      width={1536}
                      height={1024}
                      loading="lazy"
                      alt={`${p.title} pour applications industrielles`}
                      className="aspect-[4/3] w-full object-cover image-hover group-hover:scale-105"
                    />
                    <div className="absolute left-4 top-4 flex max-w-[calc(100%-2rem)] flex-wrap gap-2">
                      {p.sectors.map((s) => (
                        <span key={s} className="rounded-full bg-primary-dark px-3 py-1 text-xs font-semibold text-primary-foreground shadow-md">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-7">
                    <h2 className="text-2xl font-semibold">{p.title}</h2>
                    <p className="mt-3 leading-7 text-muted-foreground">{p.description}</p>
                    <Button
                      asChild
                      variant="cta"
                      className="mt-7 h-auto whitespace-normal py-3 text-center"
                    >
                      <Link to="/devis">
                        Demander un devis pour ce produit <ArrowRight />
                      </Link>
                    </Button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand
        title="Vous ne voyez pas exactement votre besoin ?"
        text="Notre équipe étudie aussi les configurations spécifiques."
      />
    </>
  );
}
