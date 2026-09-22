import { createFileRoute } from "@tanstack/react-router";
import { Clock3, Mail, MapPin, Phone, Printer } from "lucide-react";
import { LeadForm } from "@/components/site/forms";
import { Hero } from "@/components/site/blocks";
import { contact } from "@/components/site/site-data";
import hero from "@/assets/logistics-pallets.jpg";
export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & localisation | La Globale Marocaine" },
      {
        name: "description",
        content: "Contactez La Globale Marocaine et localisez l’entreprise à Casablanca.",
      },
      { property: "og:title", content: "Contactez La Globale Marocaine" },
      { property: "og:description", content: "Coordonnées et localisation de LGM à Casablanca." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});
function Contact() {
  return (
    <>
      <Hero
        image={hero}
        eyebrow="Contact"
        title="Un point de contact. Une équipe à votre écoute."
        description="Échangez avec notre équipe ou retrouvez directement La Globale Marocaine à Casablanca."
      />
      <section className="section-pad">
        <div className="container-wide grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-bold">Coordonnées</h2>
            <div className="mt-8 space-y-5">
              <a href={`tel:${contact.phone.replaceAll(" ", "")}`} className="flex gap-4">
                <Phone className="shrink-0 text-primary" />
                <span>
                  {contact.phone}
                  <br />
                  {contact.phone2}
                </span>
              </a>
              <a href={`mailto:${contact.email}`} className="flex gap-4">
                <Mail className="shrink-0 text-primary" />
                {contact.email}
              </a>
              <p className="flex gap-4">
                <Printer className="shrink-0 text-primary" />
                Fax : {contact.fax}
              </p>
            </div>
            <div className="mt-10 border-t pt-8">
              <h3 className="flex items-center gap-3 text-lg font-semibold">
                <Clock3 className="text-primary" />
                Horaires
              </h3>
              <dl className="mt-4 grid grid-cols-[1fr_auto] gap-y-2 text-sm">
                <dt>Lundi–vendredi</dt>
                <dd>9h00–18h00</dd>
                <dt>Samedi</dt>
                <dd>9h00–13h00</dd>
                <dt>Dimanche</dt>
                <dd>Fermé</dd>
              </dl>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm sm:p-9">
            <h2 className="text-3xl font-bold">Écrivez-nous</h2>
            <p className="mb-8 mt-3 text-muted-foreground">
              Une question générale ? Notre équipe vous répond.
            </p>
            <LeadForm />
          </div>
        </div>
      </section>
      <section className="section-pad diagonal-top surface-grid-dark bg-secondary pt-32">
        <div className="container-wide">
          <div className="grid items-end gap-8 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="text-sm font-semibold uppercase text-highlight">Nous trouver</p>
              <h2 className="mt-4 text-4xl font-bold">La Globale Marocaine à Casablanca.</h2>
              <p className="mt-5 leading-7 text-muted-foreground">Préparez votre trajet et ouvrez l’itinéraire directement dans Google Maps.</p>
              <a href="https://maps.app.goo.gl/eCURBrHbLTEBwmPRA" target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-3 font-semibold text-primary transition hover:text-highlight">
                <MapPin /> Ouvrir dans Google Maps
              </a>
            </div>
            <article className="overflow-hidden rounded-lg bg-card shadow-sm">
              <iframe
                title="Carte Google Maps — La Globale Marocaine"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.537800809041!2d-7.614589784408567!3d33.591461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d29dec3ba36f%3A0x2cf5958c1da8d7e8!2sLa%20Globale%20Marocaine!5e0!3m2!1sfr!2sma!4v1790090568954!5m2!1sfr!2sma"
                className="h-[28rem] w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
              <div className="flex items-start gap-4 p-6"><MapPin className="shrink-0 text-primary" /><div><h3 className="text-xl font-semibold">La Globale Marocaine</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{contact.office}</p></div></div>
            </article>
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-wide grid gap-px bg-border sm:grid-cols-3">
          {[[Phone, "Par téléphone", contact.phone], [Mail, "Par e-mail", contact.email], [Clock3, "Horaires", "Lun–ven 9h–18h · Sam 9h–13h"]].map(([I, title, detail]) => {
            const Icon = I as typeof Phone;
            return <div key={title as string} className="bg-background p-7"><Icon className="text-highlight" /><h3 className="mt-8 text-xl font-semibold">{title as string}</h3><p className="mt-2 text-sm text-muted-foreground">{detail as string}</p></div>;
          })}
        </div>
      </section>
    </>
  );
}
