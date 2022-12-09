let strip: neopixel.Strip = null
let c = 0
function 筑波ランタン色コードの確認 () {
    strip = neopixel.create(DigitalPin.P1, 16, NeoPixelMode.RGB)
    c = 0
    for (let index = 0; index < 16; index++) {
        if (7 < c) {
            c = 0
        } else {
            if (c < 0) {
                c = 0
            }
        }
        strip.showColor(TukubaLantern.colorMap[c])
        basic.showNumber(c)
        c += 1
    }
}
