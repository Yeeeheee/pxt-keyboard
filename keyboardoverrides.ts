namespace keyboard{
//% fixedInstance whenUsed block="A"
export const A = new Button(KeyboardButton.A, "A", "a", "-");

//% fixedInstance whenUsed block="B"
export const B = new Button(KeyboardButton.B, "B", "b", "&");

//% fixedInstance whenUsed block="C"
export const C = new Button(KeyboardButton.C, "C", "c", "%");

//% fixedInstance whenUsed block="D"
export const D = new Button(KeyboardButton.D, "D", "d", "=");

//% fixedInstance whenUsed block="E"
export const E = new Button(KeyboardButton.E, "E", "e", "3");

//% fixedInstance whenUsed block="F"
export const F = new Button(KeyboardButton.F, "F", "f", "(");

//% fixedInstance whenUsed block="G"
export const G = new Button(KeyboardButton.G, "G", "g", ")");

//% fixedInstance whenUsed block="H"
export const H = new Button(KeyboardButton.H, "H", "h", "{");

//% fixedInstance whenUsed block="I"
export const I = new Button(KeyboardButton.I, "I", "i", "8");

//% fixedInstance whenUsed block="J"
export const J = new Button(KeyboardButton.J, "J", "j", "}");

//% fixedInstance whenUsed block="K"
export const K = new Button(KeyboardButton.K, "K", "k", "!");

//% fixedInstance whenUsed block="L"
export const L = new Button(KeyboardButton.L, "L", "l", "\"");

//% fixedInstance whenUsed block="M"
export const M = new Button(KeyboardButton.M, "M", "m", "#");

//% fixedInstance whenUsed block="N"
export const N = new Button(KeyboardButton.N, "N", "n", "*");

//% fixedInstance whenUsed block="O"
export const O = new Button(KeyboardButton.O, "O", "o", "9");

//% fixedInstance whenUsed block="P"
export const P = new Button(KeyboardButton.P, "P", "p", "0");

//% fixedInstance whenUsed block="Q"
export const Q = new Button(KeyboardButton.Q, "Q", "q", "1");

//% fixedInstance whenUsed block="R"
export const R = new Button(KeyboardButton.R, "R", "r", "4");

//% fixedInstance whenUsed block="S"
export const S = new Button(KeyboardButton.S, "S", "s", "+");

//% fixedInstance whenUsed block="T"
export const T = new Button(KeyboardButton.T, "T", "t", "5");

//% fixedInstance whenUsed block="U"
export const U = new Button(KeyboardButton.U, "U", "u", "7");

//% fixedInstance whenUsed block="V"
export const V = new Button(KeyboardButton.V, "V", "v", "^");

//% fixedInstance whenUsed block="W"
export const W = new Button(KeyboardButton.W, "W", "w", "2");

//% fixedInstance whenUsed block="X"
export const X = new Button(KeyboardButton.X, "X", "x", "/");

//% fixedInstance whenUsed block="Y"
export const Y = new Button(KeyboardButton.Y, "Y", "y", "6");

//% fixedInstance whenUsed block="Z"
export const Z = new Button(KeyboardButton.Z, "Z", "z", "£");

export const CapsLock = new Button(KeyboardButton.CapsLock, "","","");

export const Backspace = new Button(KeyboardButton.Backspace, "\b","\b","\b");

export const NumLock = new Button(KeyboardButton.NumLock, "","","");

export const Space = new Button(KeyboardButton.Space, " "," "," ");

export const FullStop = new Button(KeyboardButton.FullStop, ".",".",".");

export const Enter = new Button(KeyboardButton.Enter, "\n","\n","\n");

export const buttonMaps: { [scanCode: number]: Button } = {
    [KeyboardButton.A]: A,
    [KeyboardButton.B]: B,
    [KeyboardButton.C]: C,
    [KeyboardButton.D]: D,
    [KeyboardButton.E]: E,
    [KeyboardButton.F]: F,
    [KeyboardButton.G]: G,
    [KeyboardButton.H]: H,
    [KeyboardButton.I]: I,
    [KeyboardButton.J]: J,
    [KeyboardButton.K]: K,
    [KeyboardButton.L]: L,
    [KeyboardButton.M]: M,
    [KeyboardButton.N]: N,
    [KeyboardButton.O]: O,
    [KeyboardButton.P]: P,
    [KeyboardButton.Q]: Q,
    [KeyboardButton.R]: R,
    [KeyboardButton.S]: S,
    [KeyboardButton.T]: T,
    [KeyboardButton.U]: U,
    [KeyboardButton.V]: V,
    [KeyboardButton.W]: W,
    [KeyboardButton.X]: X,
    [KeyboardButton.Y]: Y,
    [KeyboardButton.Z]: Z,
    [KeyboardButton.CapsLock]: CapsLock,
    [KeyboardButton.Backspace]: Backspace,
    [KeyboardButton.NumLock]: NumLock,
    [KeyboardButton.Space]: Space,
    [KeyboardButton.FullStop]: FullStop,
    [KeyboardButton.Enter]: Enter
};
}