var Gpio = require("onoff").Gpio;

const GpioList = {
    red: 2,
    yellow: 3,
    green: 4
}

function turnonLed(color){
    var LED = new Gpio(GpioList[color], 'out');
    LED.writeSync(1);
    setTimeout(() => {
        LED.writeSync(0);
        LED.unexport();
    }, 5*1000);
}

function trafficSinal(seconds){
    var LEDRed = new Gpio(GpioList.red, 'out');
    var LEDYellow = new Gpio(GpioList.yellow, 'out');
    var LEDGreen = new Gpio(GpioList.green, 'out');
    
    var currentColor = "";
    var nextColor = "";

    blinkLED();
    var blinkInterval = setInterval(blinkLED, 4000);


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
    
    setTimeout(endBlink, seconds*1000);

    function unexportOnClose(){
        LEDRed.writeSync(0);
        LEDYellow.writeSync(0);
        LEDGreen.writeSync(0);;
        LEDRed.unexport();
        LEDYellow.unexport();
        LEDGreen.unexport();
    };
    
    process.on('SIGINT', unexportOnClose);
    
        
}

module.exports = { trafficSinal, turnonLed };
