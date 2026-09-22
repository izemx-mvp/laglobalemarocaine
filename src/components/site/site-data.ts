import film from "@/assets/film-rolls.jpg";
import bags from "@/assets/bags-covers.jpg";
import greenhouse from "@/assets/agricultural-greenhouse.jpg";
import extrusion from "@/assets/extrusion-detail.jpg";
import quality from "@/assets/quality-lab.jpg";
import logistics from "@/assets/logistics-pallets.jpg";

export const products = [
  {
    slug: "films-plastiques",
    title: "Films plastiques",
    description: "Films techniques en formats et épaisseurs adaptés à vos lignes et usages.",
    image: film,
    sectors: ["Industrie", "Agroalimentaire", "Logistique"],
  },
  {
    slug: "sacs-industriels",
    title: "Sacs industriels",
    description: "Sacs résistants pour le conditionnement, la manutention et le stockage.",
    image: bags,
    sectors: ["Industrie", "Construction", "Agriculture"],
  },
  {
    slug: "housses-protection",
    title: "Housses de protection",
    description:
      "Protection de palettes, équipements et produits contre les contraintes extérieures.",
    image: logistics,
    sectors: ["Industrie", "Logistique"],
  },
  {
    slug: "gaines-plastiques",
    title: "Gaines plastiques",
    description: "Solutions continues pour emballage automatisé et applications industrielles.",
    image: extrusion,
    sectors: ["Industrie", "Agroalimentaire"],
  },
  {
    slug: "films-agricoles",
    title: "Films pour serres",
    description: "Films destinés à protéger les cultures et favoriser une production maîtrisée.",
    image: greenhouse,
    sectors: ["Agriculture"],
  },
];

export const posts = [
  {
    slug: "choisir-film-plastique-industriel",
    category: "Expertise",
    date: "12 septembre 2026",
    title: "Bien choisir son film plastique industriel",
    excerpt:
      "Les critères essentiels pour définir une solution adaptée à vos produits, vos lignes et vos contraintes.",
    image: quality,
  },
  {
    slug: "emballage-protection-logistique",
    category: "Conseils",
    date: "28 août 2026",
    title: "Mieux protéger les marchandises en transit",
    excerpt:
      "Housses, films et sacs : comment limiter les risques pendant le stockage et le transport.",
    image: logistics,
  },
  {
    slug: "plasturgie-maroc-industrie",
    category: "Industrie",
    date: "10 juillet 2026",
    title: "La plasturgie marocaine au service de l’industrie",
    excerpt:
      "Proximité, maîtrise technique et capacité d’adaptation au cœur des chaînes de valeur locales.",
    image: extrusion,
  },
  {
    slug: "lgm-savoir-faire-depuis-1986",
    category: "LGM",
    date: "18 juin 2026",
    title: "Un savoir-faire construit depuis 1986",
    excerpt:
      "Retour sur quatre décennies de développement industriel, au plus près des entreprises marocaines.",
    image: film,
  },
];

export const contact = {
  phone: "+212 5 22 54 03 38",
  phone2: "+212 5 22 54 03 39",
  fax: "+212 5 22 54 03 49",
  email: "globale1@menara.ma",
  office:
    "61, Centre Commercial Riad, angle Boulevard Lalla Yacout et Rue Mustapha El Maani, 3ème étage, Bureau n°3 — 20000 Casablanca, Maroc",
};
