enum KeyboardButton {
    A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z
}
namespace keyboard {
    
    // enum LEDState {
    //     //% block="off"
    //     Off,
    //     //% block="on"
    //     On
    // }

    const _rows: number = 3;
    const _cols: number = 3;
    let _columnSerials: number[];
    let setupStatus: boolean = false;
    let runKeyboardStatus: boolean = false;
    let ledState: LEDState = LEDState.Off;
    let comIncrement: number = 0;
    let SIPO: ShiftRegister;
    let PISO: ShiftRegister;
    let scanCode: number;
    
    class ShiftRegister {
        private shiftPin: DigitalPin;
        public constructor(shiftPin: DigitalPin) {
            this.shiftPin = shiftPin;
        }
        public set setPin(shiftPin: DigitalPin) {
            this.shiftPin = shiftPin;
        }
        public get getPin() {
            return this.shiftPin;
        }
        public latch() {
            pins.digitalWritePin(this.shiftPin, 1);
        }
        public unlatch() {
            pins.digitalWritePin(this.shiftPin, 0);
        }
    }
    
    //% fixedInstances
    export class Button{
        public id: number;
        public letter: string;
        private isPressed: boolean = false;
        private funct: () => void;
        
        constructor(id: number, letter: string){
            this.id = id;
            this.letter = letter;
        }
        
        //% blockId=onEvent block="on button $this |pressed" blockExternalInputs=false
        onEvent(handler: () => void) {
            this.funct = handler;
        }
        
        setIsPressed(isPressed: boolean){
            this.isPressed = isPressed;
        }
        
        //% blockId=getButton block="button $this| is pressed"
        getIsPressed(){
            return this.isPressed;
        }
        
        getLetter(){
            return this.letter;
        }

        runEvent(){
            if(this.isPressed && this.funct != null){
                this.funct()
            }
            
        }
    }
    
    class ButtonHandler{
        private static pressedButtons: Button[] = [];
        //private static storelines: string;
        static setButtonPressed(scanCode: number){
            buttonMaps[scanCode].setIsPressed(true);
            this.pressedButtons.push(buttonMaps[scanCode]);
            //this.storelines += buttonMaps[scanCode].getLetter();
        }
        
        static clearPrevButtonPressed(){
            this.pressedButtons.forEach(element => {
                element.setIsPressed(false)
            });
            this.pressedButtons = [];
        }
        
        static runHandler(){
            this.pressedButtons.forEach(element => {
                element.runEvent();
            });
        }
    }
    const buttonHandler = new ButtonHandler();

    //% block="display LED $choosenState"
    //% $ledState.defl=State.On
    export function keyboardLed(choosenState: LEDState) {
        ledState = choosenState;
    }

    //% block="set up keyboard pins |MOSI $extMOSI MISO $extMISO SCK $extSCK SIPO $extSIPO PISO $extPISO"
    export function setupKeyboard(extMOSI: DigitalPin, extMISO: DigitalPin, extSCK: DigitalPin, extSIPO: DigitalPin, extPISO: DigitalPin) {
        pins.spiPins(extMOSI, extMISO, extSCK);
        pins.spiFormat(8, 3);
        pins.spiFrequency(1000000);
        comIncrement = 0;
        createSerial();
        SIPO = new ShiftRegister(extSIPO);
        PISO = new ShiftRegister(extPISO);
        setupStatus = true;
    }
    
    //% block ="keyboard start"
    export function runKeyboard() {
        if (!setupStatus) {
            setupKeyboard(DigitalPin.P15, DigitalPin.P14, DigitalPin.P13, DigitalPin.P12, DigitalPin.P16)
        }
        if(!runKeyboardStatus){
            runKeyboardStatus = true;
            loops.everyInterval(10, function () {
                ButtonHandler.clearPrevButtonPressed();
                scanKeyboard();
                ButtonHandler.runHandler();
            })

        }
    }

    function createSerial() {
        _columnSerials = [];
        for (let i = 0; i < _cols; i++) {
            _columnSerials.push(Math.pow(2, i));
        }
    }

    function numberToBinary(number: number) {
        let binary: number[] = [];
        while (number > 0) {
            binary.unshift(number % 2);
            number = Math.floor(number / 2);
        }
        return binary
    }

    function mod(n: number, m: number) {
        return ((n % m) + m) % m;
    }

    function communicate() {
        SIPO.unlatch(); 
        PISO.unlatch();
        pins.spiWrite(_columnSerials[comIncrement]);
        SIPO.latch();
        PISO.latch();
        comIncrement = (comIncrement + 1) % _cols;
        return pins.spiWrite(0);
    }

    function displayLED(scanCode: number) {
        if(ledState === LEDState.Off){
            return;
        }
        basic.showString(buttonMaps[scanCode].getLetter(),0);
    }

    export function readLines() {

    }
    
    function runScanOperations(){
        displayLED(scanCode);
        ButtonHandler.setButtonPressed(scanCode);
    }

    function scanKeyboard() {
        let rowDetected: number = communicate();
        let temp = numberToBinary(rowDetected);
        let rowDetectedBin: number[] = [];
        for (let i = 0; i < _rows - temp.length; i++) {
            rowDetectedBin.push(0);
        }
        rowDetectedBin = rowDetectedBin.concat(temp);
        if (rowDetected != 0) {
            for (let i = 0; i < _rows; i++) {
                if (rowDetectedBin[i] == 1) {
                    // let scanCode = ((_rows - i) * _rows) + mod(comIncrement - 1, _cols);
                    scanCode = ((_rows - i) * _rows) + mod(comIncrement - 1, _cols);
                    runScanOperations();
                }
            }
        }
    }
    
    

}