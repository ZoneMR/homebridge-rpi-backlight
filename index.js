const RpiBacklightAccessory = require('./lib/RpiBacklightAccessory.js');

module.exports = function(homebridge) {
    RpiBacklightAccessory.setHomebridge(homebridge);

    homebridge.registerAccessory("homebridge-rpi-backlight", "RpiBacklight", RpiBacklightAccessory);
}
