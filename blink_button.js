var Gpio = require("onoff").Gpio;
//var LED = new Gpio(2, 'out');
var LEDRed = new Gpio(2, 'out');
var LEDYellow = new Gpio(3, 'out');
var LEDGreen = new Gpio(4, 'out');

var pushButton = new Gpio(17, 'in', 'both');

pushButton.watch(function (err, value) {
    if(err){
        console.error('There was an error', err);
        return;
    }
    console.log(value);
    LEDRed.writeSync(value);
    LEDYellow.writeSync(value);
    LEDGreen.writeSync(value);
});

function unexportOnClose(){
    //LED.writeSync(0);
    LEDRed.writeSync(0);
    LEDYellow.writeSync(0);
    LEDGreen.writeSync(0);;
    //LED.unexport();
    LEDRed.unexport();
    LEDYellow.unexport();
    LEDGreen.unexport();
    pushButton.unexport();
};

process.on('SIGINT', unexportOnClose);

