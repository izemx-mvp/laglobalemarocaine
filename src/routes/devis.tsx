import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Clock3, Mail, Phone } from "lucide-react";
import { LeadForm } from "@/components/site/forms";
import { contact } from "@/components/site/site-data";
export const Route = createFileRoute("/devis")({
  head: () => ({
    meta: [
      { title: "Demande de devis emballage plastique | LGM" },
      {
        name: "description",
        content:
          "Décrivez votre besoin en films, sacs, housses, gaines ou films agricoles à l’équipe LGM.",
      },
      { property: "og:title", content: "Demandez une étude personnalisée — LGM" },
      { property: "og:description", content: "Présentez votre besoin industriel à notre équipe." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Quote,
});
function Quote() {
  return (
    <section className="surface-grid-dark min-h-screen bg-secondary pb-24 pt-32">
      <div className="container-wide">
        <p className="text-sm font-semibold uppercase tracking-widest text-highlight">
          Demande de devis
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-6xl">
          Parlez-nous de votre besoin.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          Chaque solution est étudiée selon son usage, ses dimensions et les volumes concernés.
        </p>
        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.3fr_.7fr]">
          <div className="rounded-lg bg-background p-6 shadow-sm sm:p-10">
            <LeadForm quote />
          </div>
          <aside className="diagonal-bottom surface-grid rounded-lg bg-primary-dark px-8 pb-14 pt-8 text-primary-foreground">
            <h2 className="text-2xl font-semibold">Une réponse construite pour vous.</h2>
            <p className="mt-4 text-sm leading-6 text-primary-foreground/70">
              LGM ne propose pas de catalogue tarifaire standard : les caractéristiques de chaque
              fabrication sont étudiées pour préparer une proposition cohérente.
            </p>
            <div className="mt-8 space-y-6">
              {[
                [Clock3, "Retour dans les meilleurs délais ouvrés"],
                [CheckCircle2, "Étude technique de votre demande"],
                [Phone, contact.phone],
                [Mail, contact.email],
              ].map(([I, t]) => {
                const Icon = I as typeof Clock3;
                return (
                  <div key={t as string} className="flex gap-3">
                    <Icon className="size-5 shrink-0 text-primary-foreground/70" />
                    <span className="text-sm">{t as string}</span>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
