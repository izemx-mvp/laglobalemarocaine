# Refonte visuelle et assistant conversationnel LGM

## Résultat attendu
- Donner à chaque page un rythme distinct tout en conservant l’identité LGM.
- Renforcer la profondeur par des dégradés, textures discrètes et découpes diagonales.
- Remplacer les choix fermés de l’assistant par une conversation libre en français.
- Améliorer la continuité du logo, de l’en-tête et du pied de page.

## Mise en œuvre
1. Faire évoluer le bloc d’introduction partagé avec une taille interne limitée, plusieurs alignements et un dégradé vert directionnel.
2. Ajouter des traitements réutilisables de texture et de bord diagonal, puis les répartir sur toutes les pages.
3. Différencier les cartes valeurs, services et produits ; rendre le processus À propos vertical et conserver Services horizontal.
4. Standardiser les images en 16/9, 4/3 ou carré et renforcer l’accent rouge aux endroits demandés.
5. Créer une version blanche dédiée du logo, réaliser un fondu entre les deux versions, adoucir l’ombre au défilement et enrichir le pied de page.
6. Ajouter un endpoint serveur Lovable AI utilisant `openai/gpt-6-astra`, avec le contexte LGM, les dix derniers messages, la règle absolue d’absence de prix et la validation des entrées.
7. Construire la fenêtre conversationnelle : saisie libre, Entrée, bulles, historique, indicateur de frappe, liens de contact et message de repli.
8. Vérifier le rendu ordinateur/mobile, les interactions, l’appel IA réel et l’absence d’erreurs.

## Détails techniques
- La clé Lovable AI reste uniquement côté serveur et ne sera jamais envoyée au navigateur.
- La conversation reste dans la session de la page ; aucune donnée personnelle n’est enregistrée.
- Lovable Cloud est activé pour fournir l’appel IA sécurisé, sans clé à saisir.
