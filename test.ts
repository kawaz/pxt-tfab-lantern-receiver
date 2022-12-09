// // テストはここに来ます。このパッケージが拡張機能として使用されるときにはコンパイルされません。
// TukubaLantern.userInitBlock(function () {
//     strip = neopixel.create(DigitalPin.P1, 16, NeoPixelMode.RGB)
//     strip.showBarGraph(255, 255)
// })
// input.onButtonPressed(Button.A, function () {
//     radio.sendString("137")
//     radio.sendString("P")
// })
// TukubaLantern.userLoop(TukubaLantern.UserLoops.L2, function () {
//     basic.showIcon(IconNames.No)
//     basic.pause(700)
//     strip.showColor(neopixel.colors(NeoPixelColors.Violet))
// })
// TukubaLantern.userLoop(TukubaLantern.UserLoops.L1, function () {
//     basic.showIcon(IconNames.Heart)
//     basic.pause(1000)
//     if (Math.randomBoolean()) {
//         strip.showRainbow(1, 360)
//     } else {
//         strip.showColor(neopixel.colors(NeoPixelColors.Green))
//     }
// })
// input.onButtonPressed(Button.AB, function () {
//     radio.sendString("0112345671234567")
//     radio.sendString("P")
// })
// input.onButtonPressed(Button.B, function () {
//     radio.sendString("237")
//     radio.sendString("P")
// })
// let strip: neopixel.Strip = null
// TukubaLantern.lanternInit("1", 300, 200)
