input.onButtonPressed(Button.A, function () {
    radio.sendString("137")
    radio.sendString("P")
})
TukubaLantern.userLoop(TukubaLantern.UserLoops.L1, function () {
    basic.pause(200)
    strip.shift(1)
})
input.onButtonPressed(Button.AB, function () {
    radio.sendString("0112345671234567")
    radio.sendString("P")
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("237")
    radio.sendString("P")
})
let strip: neopixel.Strip = null
TukubaLantern.lanternInit("3", 300, 200)
strip = neopixel.create(DigitalPin.P1, 16, NeoPixelMode.RGB)
strip.showBarGraph(255, 255)
TukubaLantern.lanternUserInitialized()
