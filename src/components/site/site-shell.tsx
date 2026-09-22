import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  Clock3,
  Facebook,
  Linkedin,
  Mail,
  Menu,
  Phone,
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
import whiteLogo from "@/assets/lgm-logo-white.png";
import { contact } from "./site-data";
import { Chatbot } from "./chatbot";

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
  useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    const fn = () => setScrolled(scrollY > 24);
    fn();
    addEventListener("scroll", fn, { passive: true });
    return () => removeEventListener("scroll", fn);
  }, []);
  const light = !scrolled;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-out ${scrolled ? "bg-background/95 shadow-[0_10px_30px_color-mix(in_oklab,var(--foreground)_10%,transparent)] backdrop-blur" : "bg-transparent shadow-none"}`}
    >
      <div className="container-wide grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <Link to="/" aria-label="Accueil La Globale Marocaine" className="relative block h-12 min-w-0 max-w-[190px]">
          <img
            src={logo.url}
            alt="La Globale Marocaine"
            className={`absolute inset-0 h-12 w-auto max-w-[190px] object-contain transition-all duration-500 ${light ? "translate-y-1 opacity-0" : "translate-y-0 opacity-100"}`}
          />
          <img
            src={whiteLogo}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 h-12 w-auto max-w-[190px] object-contain transition-all duration-500 ${light ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"}`}
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
    <footer className="surface-grid bg-primary-dark pt-16 text-primary-foreground">
      <div className="container-wide grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_.65fr_1fr_.9fr]">
        <div>
          <img
            src={logo.url}
            alt="LGM La Globale Marocaine"
            className="h-20 w-auto max-w-[280px] object-contain"
          />
          <p className="mt-5 max-w-sm text-sm leading-6 text-primary-foreground/65">
            Fabricant marocain d’emballages plastiques industriels. Une expertise de proximité,
            construite depuis 1986.
          </p>
          <div className="mt-6 flex gap-2" aria-label="Réseaux sociaux">
            <span className="grid size-9 place-items-center rounded-full border border-primary-foreground/30 text-primary-foreground/75" aria-label="LinkedIn à venir">
              <Linkedin className="size-4" />
            </span>
            <span className="grid size-9 place-items-center rounded-full border border-primary-foreground/30 text-primary-foreground/75" aria-label="Facebook à venir">
              <Facebook className="size-4" />
            </span>
          </div>
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
        <div>
          <h3 className="text-sm uppercase tracking-widest text-primary-foreground/70">Horaires</h3>
          <div className="mt-5 space-y-3 text-sm text-primary-foreground/75">
            <p className="flex gap-3"><Clock3 className="size-4 shrink-0" /> Lundi–vendredi<br />9h00–18h00</p>
            <p>Samedi · 9h00–13h00*</p>
            <p>Dimanche · Fermé</p>
            <p className="text-xs text-primary-foreground/65">* À confirmer avant votre visite.</p>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="container-wide flex flex-col gap-3 py-5 text-xs text-primary-foreground/75 sm:flex-row sm:justify-between">
          <span>© 2026 La Globale Marocaine SARL</span>
          <span>Mentions légales · Confidentialité</span>
        </div>
      </div>
    </footer>
  );
}
