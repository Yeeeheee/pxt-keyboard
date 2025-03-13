enum KeyboardButton {
    Q = 1,W,E,R,T,Y,U,
    I = 0,
    O = 29,
    P = 24,
    A = 9,S,D,F,G,H,J,
    K = 8,
    L = 30,
    Z = 18,X,C,V,B,N,
    M = 16,
    CapsLock = 17,
    Backspace = 31,
    NumLock = 25,Space,FullStop,Enter

    //Q,W,E,R,T,Y,U,I,O,P,A,S,D,F,G,H,J,K,L,Z,X,C,V,B,N,M
}
namespace keyboard {

    const _rows: number = 4;
    const _cols: number = 8;
    let _columnSerials: number[];
    let setupStatus: boolean = false;
    let runKeyboardStatus: boolean = false;
    let ledState: LEDState = LEDState.Off;
    let comIncrement: number = 0;
    let SIPO: ShiftRegister;
    let PISO: ShiftRegister;
    //let scanCode: number;
    
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
        public cLetter: string;
        public lLetter: string;
        public nLetter: string;
        private isPressed: boolean = false;
        private pressedCount: number = 0;
        private funct: () => void;
        
        constructor(id: number, cLetter: string, lLetter: string, nLetter: string){
            this.id = id;
            this.cLetter = cLetter;
            this.lLetter = lLetter;
            this.nLetter = nLetter;
        }
        
        //% blockId=onEvent block="on button $this |pressed" blockExternalInputs=false
        onEvent(handler: () => void) {
            this.funct = handler;
        }
        
        setPressed(){
            if(!this.isPressed){
                this.isPressed = true;
                return;
            }
            if(this.pressedCount < 200){
                this.pressedCount += 1 
            }
        }

        setReleased(){
            if(this.isPressed){
                this.pressedCount = 0
                this.isPressed = false;
            }
        }
        
        //% blockId=getButton block="button $this| is pressed"
        getIsPressed(){
            return this.isPressed;
        }

        getPressedCount(){
            return this.pressedCount;
        }

        getLetter(){
            if(ButtonHandler.numLock){
                return this.nLetter
            }
            if(ButtonHandler.capsLock){
                return this.cLetter
            }
            return this.lLetter
        }

        runEvent(){
            if(this.isPressed && this.funct != null){
                this.funct()
            }
            
        }
    }
    
    //% fixedInstances
    class ButtonHandler{
        public static numLock: boolean = false;
        public static capsLock: boolean = false;
        public static anyfunct: () => void;
        //private static storelines: string;
        static ButtonPressed(scanCode: number){
            if(buttonMaps[scanCode] != null){
                if(!buttonMaps[KeyboardButton.NumLock].getIsPressed() && KeyboardButton.NumLock == scanCode){
                    this.numLock = !this.numLock;
                }
                if(!buttonMaps[KeyboardButton.CapsLock].getIsPressed() && KeyboardButton.CapsLock == scanCode){
                    this.capsLock = !this.capsLock;
                }
                buttonMaps[scanCode].setPressed();
                displayLED(scanCode);
                buttonMaps[scanCode].runEvent();
                this.runAnyFunct()
            }
        }
        
        static ButtonReleased(scanCode: number){
            if(buttonMaps[scanCode] != null){
                buttonMaps[scanCode].setReleased();
            }
        }
        
        
        private static runAnyFunct(){
            if(this.anyfunct != null){
                this.anyfunct()
            }
        }
    }

    //% blockId=onAnyEvent block="on button ANY bitton is pressed"
    export function onEvent(handler: () => void) {
            ButtonHandler.anyfunct = handler;
    }
    
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
            setupKeyboard(DigitalPin.P15, DigitalPin.P14, DigitalPin.P13, DigitalPin.P8, DigitalPin.P16)
        }
        if(!runKeyboardStatus){
            runKeyboardStatus = true;
            loops.everyInterval(10, function () {
                scanKeyboard();
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

    function reverseArray<T>(arr: T[]) {
        let left = 0;
        let right = arr.length - 1;
        
        while (left < right) {

            let temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            
            left++;
            right--;
        }
        
        return arr;
    }

    function contains<T>(arr: T[], value: T) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
                return true;
            }
        }
        return false;
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

    function scanKeyboard() {
        let rowDetected: number = communicate();
        let rowDetectedBin: number[] = reverseArray(numberToBinary(rowDetected));
        for (let i = 0; i < _rows + 1; i++) {
            let scanCode = i * _cols + comIncrement  - _cols;
            if (rowDetectedBin[i] == 1) {
                ButtonHandler.ButtonPressed(scanCode);
                continue
            }
            ButtonHandler.ButtonReleased(scanCode);    

        }
    }
    

}