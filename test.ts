keyboard.E.onEvent(function () {
    music.play(music.tonePlayable(147, music.beat(BeatFraction.Breve)), music.PlaybackMode.UntilDone)
})
keyboard.H.onEvent(function () {
    music.play(music.tonePlayable(175, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
})
keyboard.F.onEvent(function () {
    music.play(music.tonePlayable(131, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
})
keyboard.G.onEvent(function () {
    music.play(music.tonePlayable(165, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
})
keyboard.keyboardLed(LEDState.On)
keyboard.runKeyboard()
keyboard.runKeyboard()
basic.forever(function () {
    if (keyboard.J.getIsPressed()) {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . . . . .
            . . . . .
            `)
    }
})
