import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { posts } from "@/components/site/site-data";
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
function Article() {
  const { post } = Route.useLoaderData();
  const similar = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  return (
    <>
      <article>
        <header className="bg-primary-dark pb-16 pt-36 text-primary-foreground">
          <div className="container-wide">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-primary-foreground/70"
            >
              <ArrowLeft className="size-4" /> Retour au journal
            </Link>
            <p className="mt-10 text-sm font-semibold uppercase tracking-widest text-primary-foreground/60">
              {post.category} · {post.date}
            </p>
            <h1 className="mt-5 max-w-5xl text-5xl font-bold leading-tight sm:text-7xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/70">
              {post.excerpt}
            </p>
          </div>
        </header>
        <div className="container-wide -mt-1">
          <img
            src={post.image}
            width={1536}
            height={1024}
            alt={`Photographie industrielle : ${post.title}`}
            className="aspect-[16/8] w-full object-cover"
          />
        </div>
        <div className="mx-auto max-w-3xl px-4 py-20 text-lg leading-8">
          <p className="text-xl font-medium">
            Dans l’industrie, une solution d’emballage pertinente commence toujours par une
            compréhension précise du produit, de son parcours et de ses contraintes.
          </p>
          <h2 className="mt-12 text-3xl font-bold">
            Comprendre l’usage avant de définir la solution
          </h2>
          <p className="mt-5 text-muted-foreground">
            La manutention, le stockage, l’exposition aux éléments et les équipements de
            conditionnement influencent directement le choix du format. Une analyse méthodique
            permet d’identifier les caractéristiques essentielles sans complexité inutile.
          </p>
          <h2 className="mt-12 text-3xl font-bold">La régularité, un enjeu industriel</h2>
          <p className="mt-5 text-muted-foreground">
            Au-delà des propriétés du matériau, la constance entre les séries facilite les
            opérations et sécurise les flux. C’est pourquoi chaque besoin mérite un échange
            technique et un suivi adapté.
          </p>
          <div className="mt-12 border-l-4 border-highlight bg-secondary p-6">
            <p className="font-medium">
              L’équipe LGM accompagne chaque demande sur la base des contraintes réelles de
              production et d’utilisation.
            </p>
          </div>
          <Button asChild variant="cta" size="lg" className="mt-10">
            <Link to="/devis">
              Échanger sur votre besoin <ArrowRight />
            </Link>
          </Button>
        </div>
      </article>
      <section className="section-pad bg-secondary">
        <div className="container-wide">
          <h2 className="text-3xl font-bold">À lire aussi</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {similar.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group grid grid-cols-[120px_1fr] overflow-hidden rounded-lg bg-card shadow-sm"
              >
                <img
                  src={p.image}
                  width={1536}
                  height={1024}
                  loading="lazy"
                  alt=""
                  className="h-full w-full object-cover"
                />
                <div className="p-5">
                  <p className="text-xs uppercase text-highlight">{p.category}</p>
                  <h3 className="mt-2 font-semibold group-hover:text-primary">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
