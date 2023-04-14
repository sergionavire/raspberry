var Gpio = require("onoff").Gpio;
var LEDRed = new Gpio(2, 'out');
var LEDYellow = new Gpio(3, 'out');
var LEDGreen = new Gpio(4, 'out');
var blinkInterval = setInterval(blinkLED, 4000);

var currentColor = "";
var nextColor = "";

function blinkLED(){
    if(currentColor === "red"){
        LEDRed.writeSync(1);
        LEDYellow.writeSync(0);
        LEDGreen.writeSync(0);
        currentColor = "red";
        nextColor = "green";
    } else if(currentColor === "yellow"){
        LEDRed.writeSync(0);
        LEDYellow.writeSync(1);
        LEDGreen.writeSync(0);
        currentColor = "yellow";
        nextColor = "red";
    } else {
        LEDRed.writeSync(0);
        LEDYellow.writeSync(0);
        LEDGreen.writeSync(1);
        currentColor = "green";
        nextColor = "yellow";
    }
    currentColor = nextColor;
}

function endBlink(){
    clearInterval(blinkInterval);
    LEDRed.writeSync(0);
    LEDYellow.writeSync(0);
    LEDGreen.writeSync(0);
    LEDRed.unexport();
    LEDYellow.unexport();
    LEDGreen.unexport();
}

setTimeout(endBlink, 3000000);

function unexportOnClose(){
    LEDRed.writeSync(0);
    LEDYellow.writeSync(0);
    LEDGreen.writeSync(0);;
    LEDRed.unexport();
    LEDYellow.unexport();
    LEDGreen.unexport();
};

process.on('SIGINT', unexportOnClose);


