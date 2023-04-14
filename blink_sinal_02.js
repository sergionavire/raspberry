var Gpio = require("onoff").Gpio;
var LEDRed = new Gpio(2, 'out');
LEDRed.writeSync(1);


function unexportOnClose(){
    LEDRed.writeSync(0);
    LEDYellow.writeSync(0);
    LEDGreen.writeSync(0);;
    LEDRed.unexport();
    LEDYellow.unexport();
    LEDGreen.unexport();
};

process.on('SIGINT', unexportOnClose);


