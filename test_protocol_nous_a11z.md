# Protocole de Test : Multiprise Zigbee Nous A11Z

## Objectif
Valider le fonctionnement complet de la multiprise Nous A11Z avec Zigbee2MQTT et un coordinateur SLZB-06M.

## Environnement de Test
- **Matériel** : Nous A11Z (Multiprise Zigbee 3.0).
- **Contrôleur** : SLZB-06M (PoE).
- **Logiciel** : Zigbee2MQTT (Dernière version stable).
- **Charge de Test** : Lave-vaisselle (Charge inductive et résistive variable).
- **Outil de mesure** : Multimètre / Wattmètre prise (si dispo) pour comparaison.

## 1. Intégration Zigbee (Z2M)
- **Appairage** :
    - Mode appairage (Appui long 5s sur le bouton).
    - Temps de détection et interview via SLZB-06M.
- **Identification** :
    - Fabricant/Modèle reconnu ?
    - Image correcte dans Z2M ?
    - Mise à jour OTA disponible ?
    - **LQI** au premier branchement.

## 2. Contrôle (On/Off)
- **Individuel vs Global** :
    - Peut-on piloter chaque prise (Socket 1, 2, 3...) indépendamment ?
    - Y a-t-il un switch "Global" pour tout éteindre/allumer ?
    - Les ports USB sont-ils pilotables (souvent un switch unique pour tous les USB) ?
- **Latence** :
    - Réactivité immédiate via HA ?
    - Retour d'état immédiat lors d'un appui physique ?
- **Comportement après coupure (Power On Behavior)** :
    - *Individuel* : Chaque prise a-t-elle son propre réglage (On/Off/Previous) ?
    - *Test* : Couper l'alimentation générale, attendre 10s, rallumer. Vérifier l'état de chaque prise.

## 3. Mesure de Consommation (Le point critique)
*Note : Sur les multiprises Tuya/Nous, la mesure est souvent **globale** (total de la multiprise) et non par prise. À vérifier impérativement.*

- **Type de mesure** :
    - [ ] Globale (Valeur unique W/V/A pour toute la multiprise) ?
    - [ ] Par Prise (Valeurs distinctes pour Socket 1, 2...) ?
- **Précision (Test Lave-vaisselle)** :
    - **Cycle Lavage** : Observer la courbe de puissance (Résistance de chauffe ~2000W vs Pompe ~50-100W).
    - **Comparaison** :
        - *Tension (V)* : Comparer avec le multimètre sur une autre prise du même circuit.
        - *Puissance (W)* : Vérifier la cohérence (ex: ~2000W en chauffe).
- **Fréquence de Rapport (Reporting)** :
    - Vérifier les paramètres de reporting dans Z2M.
    - Est-ce que les variations rapides de puissance (pompe qui démarre) sont bien remontées ?
    - ⚠️ *Attention au spam Zigbee si le rapport est trop fréquent.*

## 4. Fonctionnalités Avancées
- **Child Lock** :
    - Activez-le. Le bouton physique permet-il toujours d'éteindre ?
- **Indicator Mode** :
    - Peut-on éteindre les LEDs d'état (mode nuit) ?

## 5. Qualité Réseau (Routeur)
- **Routage** :
    - La multiprise agit-elle comme un bon routeur ?
    - Vérifier le LQI des appareils voisins via la carte réseau Z2M.

## 6. Intégration Home Assistant
- **Entités créées** :
    - Lister les entités (Switchs, Sensors).
    - Indisponibilité éventuelle de certaines entités.
- **Blueprint** :
    - Créer/Utiliser une carte Dashboard pour visualiser les 3+ prises et la conso globale.

---
**Checklist avant rédaction** :
- [ ] Screenshot de l'appareil dans Z2M.
- [ ] Screenshot de l'onglet "Exposes" (pour montrer les capacités).
- [ ] Photo de l'installation physique.
- [ ] Relevé des mesures (Max Watt observé).
