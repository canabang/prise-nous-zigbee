import { onOff, electricityMeter } from 'zigbee-herdsman-converters/lib/modernExtend';

const definition = {
    fingerprint: [{ modelID: 'TS011F', manufacturerName: '_TZ3210_6cmeijtd' }],
    model: 'A11Z_Final', // Nom unique pour vérifier le chargement
    vendor: 'Nous',
    description: 'Smart power strip 3 gang (Fixed MJS)',
    extend: [
        onOff({ endpoints: { l1: 1, l2: 2, l3: 3 } }),
        // On commente temporairement la mesure électrique si elle pose problème, 
        // mais le but principal est d'abord de charger le fichier.
        electricityMeter(),
    ],
    meta: {
        multiEndpoint: true
    },
    endpoint: (device) => {
        return { l1: 1, l2: 2, l3: 3 };
    },
    // Configuration minimale pour éviter les erreurs
    configure: async (device, coordinatorEndpoint, logger) => {
        const endpoint = device.getEndpoint(1);
        try {
            await endpoint.read('genBasic', ['manufacturerName', 'zclVersion', 'appVersion', 'modelId', 'powerSource', 0xfffe]);
        } catch (e) {
            // On ignore les erreurs de lecture basic
        }
    },
};

export default definition;
