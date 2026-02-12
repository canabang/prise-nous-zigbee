const tuya = require('zigbee-herdsman-converters/lib/tuya');
const utils = require('zigbee-herdsman-converters/lib/utils');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const e = exposes.presets;
const ea = exposes.access;

const definition = {
    fingerprint: [{ modelID: 'TS011F', manufacturerName: '_TZ3210_6cmeijtd' }],
    model: 'A11Z',
    vendor: 'Nous',
    description: 'Smart power strip 3 gang with energy monitoring & countdown',
    ota: ota.zigbeeOTA,

    // Mapping endpoints
    endpoint: (device) => {
        return { l1: 1, l2: 2, l3: 3 };
    },

    // Skip global endpoints for electrical measurements
    meta: {
        multiEndpoint: true,
        multiEndpointSkip: ['energy', 'current', 'voltage', 'power'],
    },

    extend: [
        // Configuration moderne Tuya pour Switch + Mesures
        tuya.modernExtend.tuyaOnOff({
            electricalMeasurements: true,   // Active la mesure
            powerOutageMemory: true,        // Active la mémoire d'état
            onOffCountdown: true,           // Active le compte à rebours
            indicatorMode: true,            // Active le mode LED
            childLock: true,                // Active le verrouillage enfant
            endpoints: ['l1', 'l2', 'l3'],  // Définit les 3 prises
        }),
        // Sondage régulier pour la mise à jour des valeurs
        tuya.modernExtend.electricityMeasurementPoll({
            metering: (device) => [100, 160, 192].includes(device.applicationVersion) || (device.softwareBuildID && ["1.0.5"].includes(device.softwareBuildID)),
        }),
    ],

    configure: async (device, coordinatorEndpoint, logger) => {
        const endpoint = device.getEndpoint(1);

        // 1. Envoi du Magic Packet (Nécessaire pour séparer les canaux sur certains firmwares)
        await tuya.configureMagicPacket(device, coordinatorEndpoint, logger);

        // 2. Calibration des Mesures Électriques
        // Le firmware _TZ3210_6cmeijtd renvoie des valeurs brutes nécessitant des diviseurs spécifiques.
        // Test Validé :
        // - Voltage : Diviseur 1 -> 226V (OK)
        // - Puissance : Diviseur 10 -> ~26W (OK pour 25W lampe)
        // - Courant : Diviseur 1000 -> 0.11A (OK)

        await endpoint.saveClusterAttributeKeyValue('haElectricalMeasurement', {
            acCurrentDivisor: 1000,
            acCurrentMultiplier: 1,
            acVoltageDivisor: 1,    // 230V brut -> 230V affiché
            acVoltageMultiplier: 1,
            acPowerDivisor: 10,     // 260 brut / 10 = 26W
            acPowerMultiplier: 1,
        });

        // Configuration du metering (Energie cumulée)
        await endpoint.saveClusterAttributeKeyValue('seMetering', {
            divisor: 100,
            multiplier: 1,
        });

        // Force OTA cluster output if attached
        if (device.getEndpoint(1).binds.some(b => b.cluster.name === 'genOta')) {
            // utils.attachOutputCluster(device, 'genOta'); // Removed as 'utils' might not have this, standard confirm is usually enough
        }

        device.save();
    },
};

module.exports = definition;
