# LGM Packaging Vision

Créer un site web professionnel multi-pages, moderne et visuellement premium 

pour "La Globale Marocaine" (LGM), fabricant marocain d'emballages plastiques 

industriels basé à Casablanca, en activité depuis 1986.

## Direction artistique / inspiration

Style inspiré des sites B2B industriels modernes (type sites vitrines 

d'entreprises manufacturières européennes contemporaines) : sobre, confiant, 

avec des sections full-bleed, des bento-grids pour présenter les chiffres 

clés et services, et des mises en page asymétriques (pas uniquement des 

grilles de cards répétées sur chaque page). Éviter le style "générique 

template corporate" — privilégier de grands titres impactants, du contraste 

fort entre sections claires/sombres, et une hiérarchie visuelle nette.

## À propos de l'entreprise

- Nom : La Globale Marocaine (SARL), fondée en 1986

- Activité : fabrication d'emballages plastiques industriels — films, sacs, 

  housses, gaines, films pour serres agricoles

- Siège social : Casablanca (61 Centre Commercial Riad) ; usine de production : 

  Had Soualem

- Effectif : 50 à 100 employés

- Positionnement : fabricant industriel B2B établi et fiable, PAS une startup

## Identité visuelle

- Logo fourni (monogramme LGM, effet rouleau de film plastique + étoile rouge)

- Couleur primaire : vert forêt profond #0B5D3B

- Primaire foncée (hover, footer, sections sombres) : #073D27

- Accent (CTA, highlights, à utiliser avec parcimonie) : rouge #A81E2D

- Fond clair : #FAFAF9

- Texte : #1A1A1A

- Polices : titres en "Space Grotesk" ou "Manrope" (bold, impactant), corps 

  de texte en "Inter" (lisible, neutre) — via Google Fonts

- Style visuel : whitespace généreux, cards avec ombres douces, coins 

  légèrement arrondis, hover effects (scale léger + shadow), animations 

  d'entrée au scroll via Framer Motion (fade-in + slide-up progressif sur 

  chaque section, stagger sur les grilles de cards)

## Images et visuels

- Toutes les images du site doivent être générées directement dans Lovable 

  (génération d'image intégrée), aucune image stock externe

- Style des images générées : photographie industrielle réaliste et 

  professionnelle — rouleaux de film plastique, lignes de production, usine 

  moderne, gros plans texture plastique — cohérent avec la palette verte/

  neutre du site, éclairage propre et professionnel, pas de style cartoon 

  ni illustration enfantine

- Prévoir un visuel généré différent et pertinent pour : hero de l'accueil, 

  hero de chaque page (à propos, services, produits, blog, contact), chaque 

  card de catégorie produit, chaque article de blog placeholder

- Cohérence visuelle entre toutes les images générées (même style, même 

  ambiance colorimétrique) pour éviter un effet "patchwork"

## RÈGLE ABSOLUE : aucun prix, aucun paiement en ligne

- Aucun prix, tarif, ou fourchette de prix ne doit apparaître nulle part sur 

  le site, sur aucune page, ni dans le chatbot

- Aucun système de paiement en ligne — site vitrine, pas e-commerce

- Toute intention d'achat redirigée vers "Demande de devis" (/devis)

## Structure du site — pages distinctes avec routing (React Router)

### Page 1 — Accueil (/)

- Hero plein écran avec image générée en arrière-plan (usine/production), 

  overlay dégradé vert foncé pour lisibilité du texte, titre fort sur le 

  savoir-faire + "Depuis 1986", CTA principal "Demander un devis" + CTA 

  secondaire "Découvrir nos produits"

- Bento-grid de chiffres clés animés au scroll ("39 ans d'expérience", 

  "50-100 employés", "Production industrielle", "100% marocain")

- Aperçu produits : 3-4 cards visuelles (image générée + titre + 

  description) avec lien vers /produits

- Section "Pourquoi nous choisir" en mise en page asymétrique image/texte 

  alternée (zigzag), avec image générée différente à chaque bloc

- Section confiance (secteurs desservis)

- Bandeau CTA final pleine largeur, fond vert foncé

- Footer complet

### Page 2 — À propos (/a-propos)

- Hero avec image générée (usine/atelier), titre "Notre histoire depuis 1986"

- Timeline visuelle animée (fondation → développement → aujourd'hui)

- Chiffres clés en grand format (bento-grid)

- Section usine/implantation avec image générée (Casablanca + Had Soualem)

- Section valeurs en cards avec icônes

- Process de fabrication en étapes numérotées avec micro-illustrations

### Page 3 — Services (/services)

- Hero avec image générée pertinente au service industriel

- Cards détaillées par service (fabrication sur-mesure, conseil technique, 

  production à grande échelle, logistique), icône + description + mini CTA 

  → /devis

- Section "Comment ça marche" en étapes numérotées horizontales avec 

  connecteurs visuels animés

### Page 4 — Produits (/produits)

- Grille des catégories (films plastiques, sacs, housses, gaines, films 

  agricoles), chaque card avec image générée spécifique au produit

- Filtre/tabs par secteur d'application

- AUCUN prix — CTA "Demander un devis pour ce produit" → /devis

- Hover effects sur les images (léger zoom au survol)

### Page 5 — Blog / Actualités (/blog)

- Grille d'articles avec image générée à la une par article

- 3-4 articles placeholder réalistes (actualités entreprise, conseils 

  emballages, tendances plasturgie Maroc, salons professionnels)

- Page article (/blog/[slug]) : image générée en tête, contenu structuré, 

  articles similaires

### Page 6 — Demande de devis (/devis)

- Deux colonnes : formulaire à gauche/centre, réassurance à droite (délai 

  de réponse, coordonnées, explication brève de l'absence de prix affiché)

- Formulaire : Nom/Société, Email, Téléphone, Type de produit (menu 

  déroulant), Quantité/volume, Message, bouton d'envoi

- Focus states visibles, validation claire, état de confirmation visuel 

  animé après envoi

### Page 7 — Contact (/contact)

- Formulaire de contact simple

- Coordonnées complètes (siège + usine), carte Google Maps embed

- Horaires d'ouverture, mise en page aérée

## Navigation & header (toutes pages)

- Header sticky avec effet de fond qui apparaît au scroll (transparent en 

  haut de page sur le hero, fond blanc avec ombre légère une fois scrollé)

- Logo à gauche, menu : Accueil / À propos / Services / Produits / Blog / 

  Contact

- Bouton CTA "Demander un devis" toujours visible, distinct visuellement

- Menu mobile hamburger avec animation d'ouverture fluide (slide ou fade)

## Chatbot (widget global, toutes pages)

- Bouton flottant fixe bas droite, fond vert #0B5D3B, icône blanche, léger 

  effet pulse pour attirer l'attention

- Fenêtre de chat (~400px, coins arrondis, ombre portée), header vert foncé 

  "LGM Assistant" + bouton fermer

- Message d'accueil : "Bonjour 👋 Bienvenue chez La Globale Marocaine. Je 

  peux vous renseigner sur nos produits ou vous aider à préparer votre 

  demande de devis. Comment puis-je vous aider ?"

- Arbre de décision par boutons (quick replies), pas de champ de texte libre :

  - 🏭 Nos produits → liste catégories + bouton vers /produits

  - 💰 Comment obtenir un prix ? → explique le sur-mesure, bouton vers /devis

  - 📋 Faire une demande de devis → redirige vers /devis

  - 🕐 Horaires & contact → infos + bouton vers /contact

  - 👤 Parler à quelqu'un → téléphone/email + bouton vers /contact

- Bouton "⬅ Retour au menu" dans chaque branche

- Ne donne JAMAIS de prix ni de fourchette — toujours rediriger vers /devis

- Design cohérent avec l'identité (vert/gris clair), composant global

## Footer (toutes pages)

- Logo version simple, liens vers toutes les pages

- Coordonnées, réseaux sociaux (placeholders), mentions légales de base

- Fond vert foncé #073D27, texte clair

## SEO & technique

- Title et meta description uniques par page (basés sur le contenu de 

  chaque page)

- Alt text descriptif sur toutes les images générées

- Vrai site multi-pages avec routing, pas une page à ancres

## Contraintes générales

- Responsive mobile-first, tester header sticky et menu mobile

- Aucun prix ni paiement en ligne nulle part, y compris chatbot

- CTA "Demander un devis" répété stratégiquement sur chaque page

- Formulaires fonctionnels avec états visuels clairs (focus, validation, 

  succès)

- Variété de mise en page entre les pages (éviter la répétition du même 

  pattern de grille partout)

- Contrastes suffisants et accessibilité de base

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4b1c7bc0-fa01-46ab-b955-27a18c694b34).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
