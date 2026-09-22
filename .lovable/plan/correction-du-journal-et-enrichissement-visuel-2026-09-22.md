# Correction du journal et enrichissement visuel

## Objectif
Corriger l’ouverture des articles, enrichir toutes les pages avec davantage de contenu visuel utile, et unifier la localisation et les animations du site.

## Modifications prévues
- Corriger la structure imbriquée des pages `/blog` et `/blog/$slug` afin que l’article remplace correctement la liste du journal.
- Ajouter à chaque page une nouvelle séquence visuelle adaptée : repères chiffrés, usages, engagements, étapes, sélection éditoriale ou informations pratiques selon le contexte.
- Réutiliser les photographies industrielles existantes avec des compositions variées, sans surcharger les pages ni ajouter de contenu commercial inventé.
- Remplacer toutes les cartes de localisation par l’unique carte Google fournie et relier l’adresse au lien partagé.
- Supprimer partout la mention « À confirmer avant votre visite » et retirer l’astérisque des horaires du samedi, y compris dans l’assistant.
- Placer le logo du pied de page sur un fond blanc pour assurer sa lisibilité.
- Ajouter des transitions de navigation et des animations globales plus fluides, tout en respectant la préférence de réduction des mouvements.
- Vérifier les articles, les pages principales, le menu et la carte sur ordinateur et mobile.

## Détails techniques
- Le parent `/blog` rendra un `Outlet` pour ses enfants et sa liste deviendra sa route index dédiée.
- Les ajouts resteront basés sur les composants, couleurs et images existants.
- La carte intégrée utilisera exactement l’URL d’iframe fournie, sans appel supplémentaire à un service externe.
