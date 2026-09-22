import { Link, useRouterState } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
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
import logo from "@/assets/lgm-logo.png";
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
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return (
    <>
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main key={pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}>
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <Chatbot />
    </>
  );
}

function Header() {
  useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-background/95 shadow-[0_10px_30px_color-mix(in_oklab,var(--foreground)_10%,transparent)] backdrop-blur transition-[background-color,box-shadow] duration-500 ease-out">
      <div className="container-wide grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <Link to="/" aria-label="Accueil La Globale Marocaine" className="relative block h-12 min-w-0 max-w-[190px]">
          <img
            src={logo}
            alt="La Globale Marocaine"
            className="h-12 w-auto max-w-[190px] object-contain"
          />
        </Link>
        <div className="hidden items-center gap-6 lg:flex">
          <nav className="flex items-center gap-5">
            {links.map(([to, label]) => (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact: to === "/" }}
                className="text-sm font-medium text-foreground transition hover:text-highlight"
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
              <Button size="icon" variant="outline" aria-label="Ouvrir le menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="!w-[88vw] max-w-[22rem] pt-16">
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
          <div className="inline-flex rounded-md bg-background p-3 shadow-sm">
            <img src={logo} alt="LGM La Globale Marocaine" className="h-16 w-auto max-w-[250px] object-contain" />
          </div>
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
          <h3 className="text-sm uppercase tracking-widest text-primary-foreground/70">
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
          <h3 className="text-sm uppercase tracking-widest text-primary-foreground/70">
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
            <a href="https://maps.app.goo.gl/eCURBrHbLTEBwmPRA" target="_blank" rel="noreferrer" className="block text-primary-foreground/75 hover:text-primary-foreground">Localisation Google Maps</a>
          </div>
        </div>
        <div>
          <h3 className="text-sm uppercase tracking-widest text-primary-foreground/70">Horaires</h3>
          <div className="mt-5 space-y-3 text-sm text-primary-foreground/75">
            <p className="flex gap-3"><Clock3 className="size-4 shrink-0" /> Lundi–vendredi<br />9h00–18h00</p>
            <p>Samedi · 9h00–13h00</p>
            <p>Dimanche · Fermé</p>
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
