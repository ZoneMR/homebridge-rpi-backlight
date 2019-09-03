const backlight = require('rpi-backlight');

let Accessory;
let Service;
let Characteristic;

class RpiBacklightAccessory {
    constructor(log, config) {
        // global vars
        this.log = log;

        // configuration vars
        this.name = config["name"] || 'Raspberry Pi Backlight';

        // register the service and provide the functions
	this.service = new Service.Lightbulb(this.name);

        this.service.getCharacteristic(Characteristic.On)
            .on('get', this.getStatus.bind(this))
            .on('set', this.setStatus.bind(this));

        this.service.getCharacteristic(Characteristic.Brightness)
            .setProps({
                maxValue: 255,
                minValue: 0
            })
            .on('get', this.getBrightness.bind(this))
            .on('set', this.setBrightness.bind(this));
    }

    async getStatus(callback) {
        callback(null, await backlight.isPoweredOn());
    }

    setStatus(value, callback) {
	if(value) backlight.powerOn(); else backlight.powerOff();

        callback(null);
    }

    async getBrightness(callback) {
        callback(null, await backlight.getBrightness());
    }

    setBrightness(value, callback) {
        backlight.setBrightness(value);

        callback(null);
    }

    static setHomebridge(homebridge) {
        Accessory = homebridge.platformAccessory;
        Service = homebridge.hap.Service;
        Characteristic = homebridge.hap.Characteristic;
    }

    getServices() {
        return [this.service];
    }
}

module.exports = RpiBacklightAccessory;
