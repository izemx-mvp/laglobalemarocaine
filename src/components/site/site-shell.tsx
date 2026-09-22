import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  ChevronRight,
  Clock3,
  Mail,
  Menu,
  Package,
  Phone,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import logo from "@/assets/lgm-logo.png.asset.json";
import { contact } from "./site-data";

const links = [
  ["/", "Accueil"],
  ["/a-propos", "À propos"],
  ["/services", "Services"],
  ["/produits", "Produits"],
  ["/blog", "Blog"],
  ["/contact", "Contact"],
] as const;
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <Chatbot />
    </>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    const fn = () => setScrolled(scrollY > 24);
    fn();
    addEventListener("scroll", fn, { passive: true });
    return () => removeEventListener("scroll", fn);
  }, []);
  const light = !scrolled;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${scrolled ? "bg-background/95 shadow-sm backdrop-blur" : "bg-transparent"}`}
    >
      <div className="container-wide grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <Link to="/" aria-label="Accueil La Globale Marocaine" className="min-w-0">
          <img
            src={logo.url}
            alt="La Globale Marocaine"
            className={`h-12 w-auto max-w-[190px] object-contain transition ${light ? "brightness-0 invert" : "filter-none"}`}
          />
        </Link>
        <div className="hidden items-center gap-6 lg:flex">
          <nav className="flex items-center gap-5">
            {links.map(([to, label]) => (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact: to === "/" }}
                className={`text-sm font-medium transition hover:text-highlight ${light ? "text-hero-foreground" : "text-foreground"}`}
                activeProps={{ className: "text-highlight" }}
              >
                {label}
              </Link>
            ))}
          </nav>
          <Button asChild variant="cta">
            <Link to="/devis">Demander un devis</Link>
          </Button>
        </div>
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant={light ? "heroOutline" : "outline"}
                aria-label="Ouvrir le menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[88%] pt-16">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <SheetDescription className="sr-only">Menu principal du site</SheetDescription>
              <nav className="flex flex-col">
                {links.map(([to, label]) => (
                  <SheetClose key={to} asChild>
                    <Link to={to} className="border-b py-4 text-xl font-semibold">
                      {label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <Button asChild variant="cta" size="lg" className="mt-8 w-full">
                <Link to="/devis">Demander un devis</Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-primary-dark pt-16 text-primary-foreground">
      <div className="container-wide grid gap-12 pb-12 md:grid-cols-2 lg:grid-cols-[1.25fr_.7fr_1fr]">
        <div>
          <img
            src={logo.url}
            alt="LGM La Globale Marocaine"
            className="h-20 w-auto max-w-[280px] object-contain brightness-0 invert"
          />
          <p className="mt-5 max-w-sm text-sm leading-6 text-primary-foreground/65">
            Fabricant marocain d’emballages plastiques industriels. Une expertise de proximité,
            construite depuis 1986.
          </p>
        </div>
        <div>
          <h3 className="text-sm uppercase tracking-widest text-primary-foreground/50">
            Navigation
          </h3>
          <nav className="mt-5 grid gap-3">
            {links.map(([to, label]) => (
              <Link key={to} to={to} className="text-sm hover:text-primary-foreground/65">
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h3 className="text-sm uppercase tracking-widest text-primary-foreground/50">
            Nous joindre
          </h3>
          <div className="mt-5 space-y-3 text-sm">
            <a
              href={`tel:${contact.phone.replaceAll(" ", "")}`}
              className="flex gap-3 hover:text-primary-foreground/65"
            >
              <Phone className="size-4 shrink-0" />
              {contact.phone}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="flex gap-3 hover:text-primary-foreground/65"
            >
              <Mail className="size-4 shrink-0" />
              {contact.email}
            </a>
            <p className="text-primary-foreground/65">Casablanca · Had Soualem</p>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="container-wide flex flex-col gap-3 py-5 text-xs text-primary-foreground/50 sm:flex-row sm:justify-between">
          <span>© 2026 La Globale Marocaine SARL</span>
          <span>Mentions légales · Confidentialité</span>
        </div>
      </div>
    </footer>
  );
}

type Branch = "menu" | "products" | "price" | "contact";
function Chatbot() {
  const [open, setOpen] = useState(false),
    [branch, setBranch] = useState<Branch>("menu");
  const options = [
    { label: "🏭 Nos produits", b: "products" as Branch },
    { label: "💰 Comment obtenir une estimation ?", b: "price" as Branch },
    { label: "📋 Faire une demande de devis", to: "/devis" as const },
    { label: "🕐 Horaires & contact", b: "contact" as Branch },
    { label: "👤 Parler à quelqu’un", to: "/contact" as const },
  ];
  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Button
        size="icon"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Fermer l’assistant" : "Ouvrir LGM Assistant"}
        className="h-14 w-14 rounded-full animate-pulse-ring shadow-xl"
      >
        {open ? <X /> : <Bot />}
      </Button>
      {open && (
        <div className="absolute bottom-17 right-0 w-[min(390px,calc(100vw-2rem))] overflow-hidden rounded-lg border bg-background shadow-2xl">
          <div className="flex items-center gap-3 bg-primary-dark p-4 text-primary-foreground">
            <Bot />
            <div>
              <h2 className="font-semibold">LGM Assistant</h2>
              <p className="text-xs text-primary-foreground/65">Information & orientation</p>
            </div>
          </div>
          <div className="max-h-[65vh] overflow-y-auto p-5">
            <div className="rounded-md bg-secondary p-4 text-sm leading-6">
              {branch === "menu" &&
                "Bonjour 👋 Bienvenue chez La Globale Marocaine. Je peux vous renseigner sur nos produits ou vous aider à préparer votre demande de devis. Comment puis-je vous aider ?"}
              {branch === "products" &&
                "Nous fabriquons des films plastiques, sacs industriels, housses de protection, gaines et films pour serres agricoles."}
              {branch === "price" &&
                "Chaque demande dépend des dimensions, de la matière, de l’épaisseur et du volume. Notre équipe prépare donc une proposition personnalisée après étude de votre besoin."}
              {branch === "contact" && (
                <>
                  Lundi–vendredi : 9h–18h
                  <br />
                  Samedi : 9h–13h (à confirmer)
                  <br />
                  Dimanche : fermé
                  <br />
                  <br />
                  {contact.phone}
                  <br />
                  {contact.email}
                </>
              )}
            </div>
            <div className="mt-4 grid gap-2">
              {branch === "menu" ? (
                options.map((o) =>
                  o.to ? (
                    <Button
                      key={o.label}
                      asChild
                      variant="outline"
                      className="h-auto justify-between py-3 text-left whitespace-normal"
                    >
                      <Link to={o.to} onClick={() => setOpen(false)}>
                        {o.label}
                        <ChevronRight />
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      key={o.label}
                      variant="outline"
                      className="h-auto justify-between py-3 text-left whitespace-normal"
                      onClick={() => setBranch(o.b)}
                    >
                      {o.label}
                      <ChevronRight />
                    </Button>
                  ),
                )
              ) : (
                <>
                  <Button asChild variant="default">
                    <Link
                      to={
                        branch === "products"
                          ? "/produits"
                          : branch === "price"
                            ? "/devis"
                            : "/contact"
                      }
                      onClick={() => setOpen(false)}
                    >
                      {branch === "products"
                        ? "Voir tous les produits"
                        : branch === "price"
                          ? "Préparer ma demande"
                          : "Nous contacter"}
                      <ArrowRight />
                    </Link>
                  </Button>
                  <Button variant="ghost" onClick={() => setBranch("menu")}>
                    <ArrowLeft /> Retour au menu
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
