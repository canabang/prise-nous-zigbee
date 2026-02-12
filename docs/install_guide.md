# Guide d'Installation : Correctif Nous A11Z

Ce correctif vise à rétablir le pilotage individuel des prises pour le modèle **Nous A11Z** identifié comme `_TZ3210_6cmeijtd`.

## 1. Mise en place du fichier
Le fichier `nous_a11z.js` a été créé dans ce dossier. Vous devez le copier dans le dossier de configuration de votre **Zigbee2MQTT**.

Dans votre cas (Docker), ce dossier est généralement mappé sur votre hôte.
Cherchez le dossier qui contient votre `configuration.yaml` actuel.
Placez le fichier `nous_a11z.js` :
- Soit directement à côté de `configuration.yaml`.
- Soit dans un sous-dossier (si vous en utilisez un), mais le plus simple est à la racine de la config.

## 2. Modification de `configuration.yaml`
Ouvrez votre fichier `configuration.yaml` Zigbee2MQTT et ajoutez (ou modifiez) la section `external_converters`.

```yaml
external_converters:
  - nous_a11z.js
```
*Si vous avez mis le fichier dans un sous-dossier data, adaptez le chemin.*

## 3. Redémarrage
1.  Redémarrez le container Zigbee2MQTT.
2.  Surveillez les logs au démarrage. Vous devriez voir une ligne indiquant que le convertisseur externe a été chargé.
`info  z2m: Loading external converter 'nous_a11z.js'`

## 4. Vérification
Allez sur l'appareil dans l'interface Z2M.
- L'image ou le nom peut avoir changé (description : `Smart power strip 3 gang...`).
- Testez les switchs `l1`, `l2`, `l3`.
- **Note** : Il faudra peut-être ré-appairer la prise une dernière fois (sans la supprimer, juste "Permit Join" + Appui long) pour qu'elle prenne bien la nouvelle définition.
