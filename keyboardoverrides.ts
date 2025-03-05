namespace keyboard{
//% fixedInstance whenUsed block="A"
export const A = new Button(KeyboardButton.A, "A");

//% fixedInstance whenUsed block="B"
export const B = new Button(KeyboardButton.B, "B");

//% fixedInstance whenUsedblock="C"
export const C = new Button(KeyboardButton.C, "C");

//% fixedInstance whenUsedblock="D"
export const D = new Button(KeyboardButton.D, "D");

//% fixedInstance whenUsed block="E"
export const E = new Button(KeyboardButton.E, "E");

//% fixedInstance whenUsed block="F"
export const F = new Button(KeyboardButton.F, "F");

//% fixedInstance whenUsed block="G"
export const G = new Button(KeyboardButton.G, "G");

//% fixedInstance whenUsed block="H"
export const H = new Button(KeyboardButton.H, "H");

//% fixedInstance whenUsed block="I"
export const I = new Button(KeyboardButton.I, "I");

//% fixedInstance whenUsed block="J"
export const J = new Button(KeyboardButton.J, "J");

//% fixedInstance whenUsed block="K"
export const K = new Button(KeyboardButton.K, "K");

//% fixedInstance whenUsed block="L"
export const L = new Button(KeyboardButton.L, "L");

//% fixedInstance whenUsed block="M"
export const M = new Button(KeyboardButton.M, "M");

//% fixedInstance whenUsed block="N"
export const N = new Button(KeyboardButton.N, "N");

//% fixedInstance whenUsed block="O"
export const O = new Button(KeyboardButton.O, "O");

//% fixedInstance whenUsed block="P"
export const P = new Button(KeyboardButton.P, "P");

//% fixedInstance whenUsed block="Q"
export const Q = new Button(KeyboardButton.Q, "Q");

//% fixedInstance whenUsed block="R"
export const R = new Button(KeyboardButton.R, "R");

//% fixedInstance whenUsed block="S"
export const S = new Button(KeyboardButton.S, "S");

//% fixedInstance whenUsed block="T"
export const T = new Button(KeyboardButton.T, "T");

//% fixedInstance whenUsed block="U"
export const U = new Button(KeyboardButton.U, "U");

//% fixedInstance whenUsed block="V"
export const V = new Button(KeyboardButton.V, "V");

//% fixedInstance whenUsed block="W"
export const W = new Button(KeyboardButton.W, "W");

//% fixedInstance whenUsed block="X"
export const X = new Button(KeyboardButton.X, "X");

//% fixedInstance whenUsed block="Y"
export const Y = new Button(KeyboardButton.Y, "Y");

//% fixedInstance whenUsed block="Z"
export const Z = new Button(KeyboardButton.Z, "Z");


export const buttonMaps: { [scanCode: number]: Button } = {
    0: A,
    1: B,
    2: C,
    3: D,
    4: E,
    5: F,
    6: G,
    7: H,
    8: I,
    9: J,
    10: K,
    11: L,
    12: M,
    13: N,
    14: O,
    15: P,
    16: Q,
    17: R,
    18: S,
    19: T,
    20: U,
    21: V,
    22: W,
    23: X,
    24: Y,
    25: Z,
};
}