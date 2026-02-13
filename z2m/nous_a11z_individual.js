const tuya = require('zigbee-herdsman-converters/lib/tuya');
const utils = require('zigbee-herdsman-converters/lib/utils');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const e = exposes.presets;
const ea = exposes.access;

const definition = {
    fingerprint: [{ modelID: 'TS011F', manufacturerName: '_TZ3210_6cmeijtd' }],
    model: 'A11Z_TEST',
    vendor: 'Nous',
    description: 'TEST Individual Monitoring - Smart power strip 3 gang',

    // Mapping endpoints
    endpoint: (device) => {
        return { l1: 1, l2: 2, l3: 3 };
    },

    // ON TENTE DE NE RIEN SKIPPER POUR VOIR SI CA REMONTE SUR LES ENDPOINTS
    meta: {
        multiEndpoint: true,
        // multiEndpointSkip: ['energy', 'current', 'voltage', 'power'], // Commenté pour le test
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

        // 1. Envoi du Magic Packet
        await tuya.configureMagicPacket(device, coordinatorEndpoint, logger);

        // 2. Calibration (On applique la calibration sur le endpoint 1 par défaut, mais faudrait voir pour les autres)
        await endpoint.saveClusterAttributeKeyValue('haElectricalMeasurement', {
            acCurrentDivisor: 1000,
            acCurrentMultiplier: 1,
            acVoltageDivisor: 1,
            acVoltageMultiplier: 1,
            acPowerDivisor: 10,
            acPowerMultiplier: 1,
        });

        await endpoint.saveClusterAttributeKeyValue('seMetering', {
            divisor: 100,
            multiplier: 1,
        });

        device.save();
    },
};

module.exports = definition;
