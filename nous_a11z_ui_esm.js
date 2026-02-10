// Format ESM moderne recommandé par la documentation récente
import { onOff, electricityMeter } from 'zigbee-herdsman-converters/lib/modernExtend';

const definition = {
    fingerprint: [{ modelID: 'TS011F', manufacturerName: '_TZ3210_6cmeijtd' }],
    model: 'A11Z_UI', // Suffixe UI pour identifier cette version
    vendor: 'Nous',
    description: 'Smart power strip 3 gang (UI Version)',
    extend: [
        onOff({ endpoints: { l1: 1, l2: 2, l3: 3 } }),
        electricityMeter(),
    ],
    meta: {
        multiEndpoint: true
    },
    endpoint: (device) => {
        return { l1: 1, l2: 2, l3: 3 };
    },
    configure: async (device, coordinatorEndpoint, logger) => {
        const endpoint = device.getEndpoint(1);
        await endpoint.read('genBasic', ['manufacturerName', 'zclVersion', 'appVersion', 'modelId', 'powerSource', 0xfffe]);
    },
};

export default definition;
