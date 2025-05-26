# pxt-keyboard

Micro:bit keyboard expansion<br>
Hardware: https://github.com/Yeeeheee/pxt-keyboard-hardware

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open []()
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/Yeeeheee/pxt-keyboard** and import

## Blocks

![image](https://github.com/Yeeeheee/pxt-keyboard/blob/master/Images/blocks.png)

## Example

Assign a button to make sound.

```blocks
keyboard.F.onEvent(function () {
    music.play(music.tonePlayable(131, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
})
```

## License
MIT

## Supported targets
* for PXT/microbit
(The metadata above is needed for package search.)
