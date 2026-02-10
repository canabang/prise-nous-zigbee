const { onOff, electricityMeter } = require('zigbee-herdsman-converters/lib/modernExtend');

const definition = {
    // On force la détection de ce modèle spécifique
    fingerprint: [{ modelID: 'TS011F', manufacturerName: '_TZ3210_6cmeijtd' }],
    model: 'A11Z_Custom', // Nom changé pour vérifier qu'il est bien chargé
    vendor: 'Nous',
    description: 'Smart power strip 3 gang (Custom Fix)',
    extend: [
        // Définition des 3 prises
        onOff({ endpoints: { l1: 1, l2: 2, l3: 3 } }),
        // Mesure électrique (si supportée, sinon on pourra le commenter)
        electricityMeter(),
    ],
    meta: {
        multiEndpoint: true
    },
    endpoint: (device) => {
        return { l1: 1, l2: 2, l3: 3 };
    },
    // Surcharge de la configuration pour éviter l'erreur UNSUPPORTED_ATTRIBUTE
    configure: async (device, coordinatorEndpoint, logger) => {
        const endpoint = device.getEndpoint(1);
        // Lecture basique uniquement
        await endpoint.read('genBasic', ['manufacturerName', 'zclVersion', 'appVersion', 'modelId', 'powerSource', 0xfffe]);
    },
};

module.exports = [definition];
