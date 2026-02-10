# Test de la Multiprise Connectée Zigbee Nous A11Z

## Introduction
La gestion de l'énergie et le pilotage précis de nos appareils sont au cœur de la domotique moderne. Aujourd'hui, nous nous penchons sur la **multiprise intelligente Nous A11Z**, un périphérique Zigbee 3.0 promettant de transformer n'importe quelle installation classique en un système connecté et mesurable.

Pourquoi s'intéresser à ce modèle ?
- **Protocol Zigbee 3.0** : Maillage, réactivité et compatibilité étendue.
- **Multiprise (3 Prises 220V)** : Idéal pour un coin TV ou un bureau.
- **Suivi de consommation** : Pour traquer les appareils énergivores.
- **Qualité/Prix** : Les produits Nous (souvent basés sur du Tuya de qualité) sont réputés pour leur bon rapport qualité/prix.

Dans cet article, nous allons la passer au crible : inclusion, pilotage individuel, précision des mesures et intégration dans Home Assistant via Zigbee2MQTT.

## Déballage et Présentation

*(Insérer ici photo du packaging/produit - Fichier potentiel : `2026-02-09_10-48.png`)*

Au déballage, on retrouve une multiprise au design sobre et moderne. Elle dispose de :
- 3 prises 220V Schuko (compatibles avec nos fiches françaises E/F).
- Un bouton physique général, permettant aussi l'appairage.
- Des LEDs d'état discrètes pour chaque prise.

La qualité de fabrication semble au rendez-vous, avec un câble de longueur standard et des plastiques qui ne font pas "cheap".

## Installation et Inclusion Zigbee

Pour ce test, l'environnement est le suivant :
- **Contrôleur** : [SLZB-06M](https://smlight.tech/product/slzb-06m/) en mode PoE (Power over Ethernet).
- **Logiciel** : Zigbee2MQTT (Z2M) tournant dans un container Docker séparé de Home Assistant (HAOS).
- **Versions** : HAOS (v...) / Z2M (v...).

### La procédure
1.  Branchez la multiprise.
2.  Activez le mode appairage dans Z2M ("Permit Join").
3.  Maintenez le bouton physique appuyé pendant environ 5 secondes jusqu'à ce que la LED clignote.

### Résultat immédiat
L'inclusion a été **instantanée**. À peine le mode appairage lancé, la multiprise est détectée par le coordinateur SLZB-06M.

*(Insérer ici Screenshot Z2M de la détection - Fichiers potentiels : `Screenshot_20260209_...png`)*

Dans Zigbee2MQTT, l'appareil est parfaitement reconnu (Modèle A11Z) avec sa photo correspondante. Aucune manipulation exotique (External Converter) n'a été nécessaire, ce qui est un excellent point pour les débutants.

### Entités Exposées dans Home Assistant
Une fois l'intégration terminée, Home Assistant remonte automatiquement une pléthore d'entités :
- **Switchs** : un switch pour chaque prise (l1, l2, l3)
- **Sensors** : Puissance (W), Tension (V), Intensité (A) et Énergie (kWh).
- **Diagnostics** : Qualité du lien (LQI).
- **Configuration** : Pas d'options de comportement après coupure (Power-on behavior), pas d'état des LEDs, pas de verrouillage enfant.

*(Insérer ici Screenshot de l'appareil dans HA/Z2M)*

## Fonctionnalités et Contrôle

### Pilotage : Une surprise de taille ?
Passons aux choses sérieuses : le contrôle des prises. Sur le papier, une multiprise connectée doit permettre de piloter chaque prise indépendamment.

Cependant, lors de mes premiers tests, j'ai constaté un comportement inattendu :
> **Constat n°1 :** Bien que Zigbee2MQTT expose trois interrupteurs distincts (l1, l2, l3), **l'activation de n'importe lequel d'entre eux entraîne l'allumage ou l'extinction simultanée des trois prises !**

*(Insérer ici GIF animé montrant l'action sur un switch et la réaction des autres)*

### Investigations Techniques
Pour en avoir le cœur net, j'ai tenté d'envoyer des commandes Zigbee "brutes" via la console de développement de Zigbee2MQTT, en ciblant spécifiquement l'Endpoint 2 (censé être la deuxième prise).
> **Résultat :** Rien. Aucune réaction. Le relais ne claque pas, la prise reste dans son état.

Cela suggère que le firmware de ce modèle (ou son implémentation actuelle dans Z2M) ne gère pas correctement les commandes standards `genOnOff` sur les endpoints secondaires. C'est un point noir pour ceux qui espéraient un contrôle fin.

### Limitations et Points Positifs

Malgré ce comportement de pilotage groupé étrange, il y a du bon et du moins bon :

**🟢 Les Points Positifs :**
- **Réactivité Exemplaire** : Que ce soit via l'interface Zigbee2MQTT, Home Assistant ou le bouton physique, l'action est **instantanée**. La latence est quasi-nulle, ce qui est très agréable.
- **Retour d'état** : La mise à jour de l'état dans HA suit immédiatement l'action physique.

**🔴 Les Limitations (à ce jour) :**
- **Pas d'options avancées** :
    - Pas de mise à jour OTA proposée par Z2M pour l'instant.
    - L'option "Child Lock" est absente ou inopérante.

Est-ce un défaut de jeunesse de l'intégration Z2M avec ce modèle spécifique (`_TZ3210_6cmeijtd`) ? C'est fort probable. Les forums indiquent que ce fabricant Tuya utilise souvent des "Datapoints" non standards nécessitant un convertisseur externe pour fonctionner correctement.

## Mesures de Consommation : Le verdict

C'est LE point clé pour beaucoup d'entre nous : peut-on suivre la consommation de chaque appareil branché (TV vs Console vs Box) ?

La réponse, visible via l'onglet "Exposes" de Zigbee2MQTT, est sans appel :
> **Une seule remontée de puissance (W) est disponible.**

*(Insérer ici la capture de l'onglet Expose montrant un seul 'Power')*

Cela signifie que la mesure est **globale** pour l'ensemble de la multiprise. Impossible de savoir qui consomme quoi. Si vous branchez un lave-vaisselle et une cafetière, vous aurez le cumul des deux.

**Test de charge (À venir) :**
Il restera à vérifier si les valeurs remontent correctement lors d'une charge réelle.
*(En attente des tests)*

## Conclusion

La multiprise **Nous A11Z** (dans sa version `_TZ3210_6cmeijtd`) laisse un sentiment mitigé.

**J'ai aimé :**
*   ✅ **Le prix** : Souvent très abordable.
*   ✅ **La qualité perçue** : Bonne finition, format compact.
*   ✅ **Le Zigbee 3.0** : Inclusion instantanée, excellent routeur pour le maillage.
*   ✅ **La Réactivité** : Aucun délai perceptible pour le On/Off.

**J'ai moins aimé :**
*   ❌ **Le Pilotage Groupé (Bug)** : Impossible de piloter une prise sans tout couper (sur cette version firmware/Z2M sans bidouille).
*   ❌ **La Mesure Globale** : Pas de suivi individuel de la consommation.

**Pour qui ?**
Cette multiprise est parfaite si vous voulez **tout couper d'un coup** (ex: Veille TV/HiFi la nuit) et avoir une idée de la consommation totale de la zone.
Par contre, si vous cherchez à piloter finement chaque appareil ou à mesurer précisément la consommation de votre PC indépendamment de l'écran, passez votre chemin (ou préparez-vous à mettre les mains dans le code des convertisseurs Z2M) !

---
*Matériel testé avec Zigbee2MQTT (Docker) et contrôleur SLZB-06M.*
