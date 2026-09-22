import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Boxes, Factory, Lightbulb, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand, Hero, Reveal, SectionHeading } from "@/components/site/blocks";
import hero from "@/assets/quality-lab.jpg";
export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services industriels | La Globale Marocaine" },
      {
        name: "description",
        content:
          "Fabrication sur mesure, conseil technique, production à grande échelle et accompagnement logistique par LGM.",
      },
      { property: "og:title", content: "Services de fabrication plastique — LGM" },
      {
        property: "og:description",
        content: "Un accompagnement industriel complet, de l’étude à la livraison.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});
function Services() {
  const services = [
    [
      Boxes,
      "Fabrication sur mesure",
      "Dimensions, épaisseurs et caractéristiques définies selon votre application.",
    ],
    [
      Lightbulb,
      "Conseil technique",
      "Un échange précis pour orienter les choix de matière et de format.",
    ],
    [
      Factory,
      "Production à grande échelle",
      "Des capacités organisées pour accompagner les besoins industriels récurrents.",
    ],
    [
      Truck,
      "Préparation logistique",
      "Conditionnement et organisation des expéditions selon vos contraintes.",
    ],
  ];
  return (
    <>
      <Hero
        image={hero}
        eyebrow="Services"
        title="L’industrie exige plus qu’un simple produit."
        description="Nous transformons vos contraintes opérationnelles en solutions d’emballage cohérentes et maîtrisées."
      />
      <section className="section-pad">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Notre accompagnement"
            title="Un savoir-faire qui commence par l’écoute."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {services.map(([I, t, d], i) => {
              const Icon = I as typeof Boxes;
              return (
                <Reveal key={t as string} delay={i * 0.08}>
                  <article className="group min-h-72 rounded-lg border bg-card p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <Icon className="size-8 text-primary" />
                    <h2 className="mt-12 text-2xl font-semibold">{t as string}</h2>
                    <p className="mt-3 max-w-lg leading-7 text-muted-foreground">{d as string}</p>
                    <Button asChild variant="link" className="mt-5 px-0">
                      <Link to="/devis">
                        Parler de votre besoin <ArrowRight />
                      </Link>
                    </Button>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section-pad bg-primary-dark text-primary-foreground">
        <div className="container-wide">
          <SectionHeading
            light
            eyebrow="Comment ça marche"
            title="Un parcours clair, sans détour."
          />
          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {[
              "Vous décrivez votre usage",
              "Nous précisons les paramètres",
              "Nous préparons la production",
              "Nous organisons le suivi",
            ].map((x, i) => (
              <div key={x} className="relative">
                <div className="mb-6 flex items-center">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-highlight font-bold">
                    {i + 1}
                  </span>
                  {i < 3 && (
                    <span className="ml-3 hidden h-px flex-1 bg-primary-foreground/25 md:block" />
                  )}
                </div>
                <h3 className="text-lg font-semibold">{x}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand
        title="Votre besoin est spécifique ? C’est notre point de départ."
        text="Partagez vos contraintes, quantités et délais pour lancer l’étude."
      />
    </>
  );
}
