# TODO : Mise en conformité HACF (Ghost CMS)

Basé sur [le manuel des rédacteurs HACF](https://www.hacf.fr/redacteurs/), voici les points à adapter pour la publication :

## 1. Méta-données & SEO (Ghost)
- [ ] **Méta Titre** : Rédiger un titre court et percutant (50-60 caractères).
    - *Actuel* : "Test de la Multiprise Connectée Zigbee Nous A11Z" (~47 chars) -> OK ou à optimiser.
- [ ] **Méta Description** : Résumé engageant pour Google (145-150 caractères).
    - *À rédiger* : Il faut un résumé qui contient les mots clés (Zigbee, Nous A11Z, Home Assistant, bug, solution).
- [ ] **Image d'entête** : Choisir une image 16/9 de haute qualité (sans texte) pour la couverture.
    - *Action* : Sélectionner une des photos existantes ou en faire une nouvelle "clean".

## 2. Structure & Balisage (Ghost)
- [ ] **Table des matières** : Ajouter le tag `#toc` dans les réglages Ghost pour générer le sommaire automatique.
- [ ] **Callouts** : Remplacer les *Italiques* ou *Notes* par des encadrés visuels (Callout).
    - *Action* : Convertir la note sur la version Dev Z2M et la note sur le "Facteur 10" voltage en `> Citation` ou `/callout` (Ghost).
- [ ] **Boutons HA** : Ajouter des boutons "My Home Assistant" si pertinent (ex: lien vers l'install Z2M ou vers l'appareil dans HA ?).
    - *Note* : Peut-être superflu pour un test matériel, à valider.

## 3. Workflow de Publication
- [ ] **Tags de diffusion** : Ajouter `#pub` (ou `#facebook`, `#forum`, `#instagram`) lors de la première publication pour l'annonce automatique.
- [ ] **Forum** :
    - Préparer le titre du sujet forum : `[Article] Test de la Multiprise Nous A11Z`.
    - Ajouter le tag `hacf-blog` sur le sujet forum.
    - Lier le sujet à l'article via le champ "X Card Description" (ID du topic).

## 4. Contenu & Forme
- [ ] **Introduction** : Vérifier la structure "Problématique -> Résumé Solution -> Prérequis".
    - *Actuel* : C'est déjà bien structuré, peut-être renforcer le "Résumé Solution" dès l'intro pour teaser le fix.
- [ ] **Gras** : Mettre en gras les mots-clés importants pour la lecture rapide (scanning).

---
*Cette liste servira de guide lors de l'intégration dans l'interface Ghost.*
