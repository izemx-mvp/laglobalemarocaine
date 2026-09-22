import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Factory, Lightbulb } from "lucide-react";
import { Hero, Reveal, SectionHeading } from "@/components/site/blocks";
import { posts } from "@/components/site/site-data";
import hero from "@/assets/extrusion-detail.jpg";
export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Actualités & expertise emballage plastique | LGM" },
      {
        name: "description",
        content:
          "Conseils, actualités et regards de LGM sur les emballages plastiques et l’industrie marocaine.",
      },
      { property: "og:title", content: "Le journal industriel de LGM" },
      {
        property: "og:description",
        content: "Expertise, conseils et actualités de la plasturgie au Maroc.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Blog,
});
function Blog() {
  return (
    <>
      <Hero
        image={hero}
        eyebrow="Actualités & expertise"
        title="Regards sur notre industrie."
        description="Conseils techniques, évolutions du métier et coulisses d’un savoir-faire marocain."
        align="center"
      />
      <section className="section-pad diagonal-top surface-grid-dark pt-32">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Le journal LGM"
            title="Pour mieux comprendre la matière et ses usages."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.07}>
                <article
                  className={
                    i === 0
                      ? "md:col-span-2 md:grid md:grid-cols-[1.2fr_.8fr] overflow-hidden rounded-lg border bg-card shadow-sm"
                      : "overflow-hidden rounded-lg border bg-card shadow-sm"
                  }
                >
                  <img
                    src={p.image}
                    width={1536}
                    height={1024}
                    loading="lazy"
                    alt={`Illustration de l’article : ${p.title}`}
                    className="aspect-[4/3] h-full w-full object-cover"
                  />
                  <div className="p-7">
                    <p className="text-xs font-semibold uppercase tracking-widest text-highlight">
                      {p.category} · {p.date}
                    </p>
                    <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">{p.title}</h2>
                    <p className="mt-3 leading-7 text-muted-foreground">{p.excerpt}</p>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                      className="mt-6 inline-flex items-center gap-2 font-semibold text-primary"
                    >
                      Lire l’article <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad bg-primary-dark text-primary-foreground">
        <div className="container-wide">
          <SectionHeading light eyebrow="Trois angles" title="Une lecture utile de notre métier." />
          <div className="mt-10 grid gap-px bg-primary-foreground/20 md:grid-cols-3">
            {[[BookOpen, "Comprendre", "Des repères clairs sur les familles d’emballages."], [Lightbulb, "Choisir", "Les critères qui relient un usage à une solution."], [Factory, "Produire", "Un regard concret sur la maîtrise industrielle."]].map(([I, title, text]) => {
              const Icon = I as typeof BookOpen;
              return <div key={title as string} className="bg-primary-dark p-8"><Icon className="text-highlight" /><h3 className="mt-8 text-2xl font-semibold">{title as string}</h3><p className="mt-3 text-sm leading-6 text-primary-foreground/70">{text as string}</p></div>;
            })}
          </div>
        </div>
      </section>
    </>
  );
}
