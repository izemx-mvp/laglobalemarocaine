import { createFileRoute } from "@tanstack/react-router";
import { Factory, Handshake, MapPin, ShieldCheck } from "lucide-react";
import { CtaBand, Hero, Reveal, SectionHeading } from "@/components/site/blocks";
import hero from "@/assets/morocco-factory.jpg";
import process from "@/assets/extrusion-detail.jpg";
import quality from "@/assets/quality-lab.jpg";
export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos de LGM | Fabricant marocain depuis 1986" },
      {
        name: "description",
        content:
          "Découvrez l’histoire, les valeurs et l’outil industriel de La Globale Marocaine à Casablanca et Had Soualem.",
      },
      { property: "og:title", content: "Notre histoire depuis 1986 — LGM" },
      {
        property: "og:description",
        content: "Une expertise marocaine des emballages plastiques industriels.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});
function About() {
  const timeline = [
    ["1986", "Fondation de La Globale Marocaine à Casablanca."],
    ["2000s", "Développement des capacités et diversification des solutions."],
    ["Aujourd’hui", "Une équipe de 50 à 100 personnes au service des industriels marocains."],
  ];
  return (
    <>
      <Hero
        image={hero}
        eyebrow="La Globale Marocaine"
        title="Notre histoire depuis 1986."
        description="Une entreprise industrielle marocaine bâtie sur la continuité, la maîtrise technique et la confiance."
        align="center"
      />
      <section className="section-pad">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Notre parcours"
            title="Près de quatre décennies d’engagement industriel."
          />
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {timeline.map((x, i) => (
              <Reveal key={x[0]} delay={i * 0.1}>
                <div className="border-l-2 border-primary pl-6">
                  <div className="text-4xl font-bold text-primary">{x[0]}</div>
                  <p className="mt-4 leading-7 text-muted-foreground">{x[1]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="diagonal-top diagonal-bottom surface-grid bg-primary-dark pb-20 pt-20 text-primary-foreground">
        <div className="container-wide grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["39 ans", "d’expérience"],
            ["50–100", "collaborateurs"],
            ["01", "localisation publique"],
            ["5", "familles de produits"],
          ].map((x) => (
            <div key={x[0]}>
              <div className="text-5xl font-bold">{x[0]}</div>
              <p className="mt-2 text-primary-foreground/60">{x[1]}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section-pad surface-grid-dark bg-secondary">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <img
              src={process}
              width={1536}
              height={1024}
              loading="lazy"
              alt="Détail d’une ligne d’extrusion de film plastique"
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
          </Reveal>
          <Reveal>
            <SectionHeading
              eyebrow="Notre implantation"
              title="Une présence claire, au plus près de vos demandes."
              text="Notre équipe centralise les échanges commerciaux, administratifs et techniques depuis notre localisation de Casablanca."
            />
            <div className="mt-7">
              <div className="border-t border-primary pt-4">
                <MapPin className="text-primary" />
                <h3 className="mt-3 font-semibold">La Globale Marocaine</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Centre Commercial Riad, Casablanca
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-wide">
          <SectionHeading eyebrow="Nos valeurs" title="Ce qui guide chaque production." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              [ShieldCheck, "Rigueur", "Contrôle attentif des paramètres et de la régularité."],
              [Handshake, "Proximité", "Un dialogue direct pour comprendre chaque contrainte."],
              [Factory, "Fiabilité", "Une organisation conçue pour les besoins industriels."],
            ].map(([I, t, d]) => {
              const Icon = I as typeof Factory;
              return (
                <div
                  key={t as string}
                  className="rounded-lg bg-primary-dark p-7 text-primary-foreground shadow-lg"
                >
                  <span className="grid size-11 place-items-center rounded-full bg-primary-foreground/10">
                    <Icon className="text-primary-foreground" />
                  </span>
                  <h3 className="mt-8 text-xl font-semibold">{t as string}</h3>
                  <p className="mt-2 text-sm leading-6 text-primary-foreground/75">{d as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section-pad diagonal-top surface-grid-dark bg-secondary pt-32">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Processus"
            title="De votre cahier des charges au produit fini."
          />
          <div className="relative mt-12 max-w-3xl before:absolute before:bottom-4 before:left-6 before:top-4 before:w-px before:bg-primary/25">
            {[
              "Analyse du besoin",
              "Définition technique",
              "Production & contrôle",
              "Préparation logistique",
            ].map((x, i) => (
              <div
                key={x}
                className="relative grid grid-cols-[3rem_1fr] items-start gap-6 pb-9 last:pb-0"
              >
                <span className="relative z-10 grid size-12 place-items-center rounded-full bg-highlight font-bold text-highlight-foreground shadow-md">
                  0{i + 1}
                </span>
                <div className="pt-2">
                  <h3 className="text-xl font-semibold">{x}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Une étape suivie par nos équipes pour assurer une réponse cohérente à votre
                    usage.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal>
            <div className="relative overflow-hidden rounded-lg">
              <img src={quality} width={1536} height={1024} loading="lazy" alt="Contrôle d’un film plastique en environnement industriel" className="aspect-[4/3] w-full object-cover image-hover hover:scale-105" />
              <div className="absolute bottom-0 left-0 bg-highlight px-6 py-5 text-highlight-foreground">
                <span className="block font-display text-3xl font-bold">Depuis 1986</span>
                <span className="text-sm">La continuité au service de la maîtrise</span>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <SectionHeading eyebrow="Culture industrielle" title="Observer, contrôler, progresser." text="La qualité se construit à chaque étape : compréhension de l’usage, réglage de la fabrication, attention portée à la régularité et préparation soignée." />
            <div className="mt-8 grid gap-px bg-border sm:grid-cols-3">
              {["Écoute", "Maîtrise", "Continuité"].map((item, i) => <div key={item} className="bg-background p-5"><span className="text-sm font-bold text-highlight">0{i + 1}</span><p className="mt-3 font-semibold">{item}</p></div>)}
            </div>
          </Reveal>
        </div>
      </section>
      <CtaBand
        title="Construisons une solution adaptée à votre activité."
        text="Décrivez-nous votre besoin, nos équipes reviendront vers vous."
      />
    </>
  );
}
