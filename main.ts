function progStep () {
    if (progColors.length == 0) {
        // 表示する色が無ければユーザモードに移行する
        progData("U")
    } else {
        if ("0" == progColors[0]) {
            progStripe.showColor(neopixel.colors(NeoPixelColors.Black))
        }
        if ("1" == progColors[0]) {
            progStripe.showColor(neopixel.colors(NeoPixelColors.Red))
        }
        if ("2" == progColors[0]) {
            progStripe.showColor(neopixel.colors(NeoPixelColors.Green))
        }
        if ("3" == progColors[0]) {
            progStripe.showColor(neopixel.colors(NeoPixelColors.Blue))
        }
        if ("4" == progColors[0]) {
            progStripe.showColor(neopixel.colors(NeoPixelColors.Orange))
        }
        if ("5" == progColors[0]) {
            progStripe.showColor(neopixel.colors(NeoPixelColors.Purple))
        }
        if ("6" == progColors[0]) {
            progStripe.showColor(neopixel.colors(NeoPixelColors.Indigo))
        }
        if ("7" == progColors[0]) {
            progStripe.showColor(neopixel.colors(NeoPixelColors.White))
        }
        progColors.shift()
        basic.pause(progInterval)
    }
}
function progLoop () {
    basic.showString("" + (progMode))
    if (progMode == "P") {
        progStep()
    }
    if (progMode == "U") {
        userLoop()
    }
}
input.onButtonPressed(Button.A, function () {
    progData("U")
})
function userInit () {
    strip = neopixel.create(DigitalPin.P1, 16, NeoPixelMode.RGB)
    strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
    strip.setPixelColor(2, neopixel.colors(NeoPixelColors.Orange))
    strip.setPixelColor(4, neopixel.colors(NeoPixelColors.Yellow))
    strip.setPixelColor(6, neopixel.colors(NeoPixelColors.Green))
    strip.setPixelColor(8, neopixel.colors(NeoPixelColors.Indigo))
    strip.setPixelColor(10, neopixel.colors(NeoPixelColors.Violet))
    strip.setPixelColor(12, neopixel.colors(NeoPixelColors.Purple))
    strip.setPixelColor(14, neopixel.colors(NeoPixelColors.White))
}
function progInit (無線グループ: number, 位置グループ: string) {
    radio.setGroup(無線グループ)
    progGroup = 位置グループ
    progStripe = neopixel.create(DigitalPin.P1, 16, NeoPixelMode.RGB)
    progData("U")
    userInit()
}
function userLoop () {
    strip.show()
    strip.rotate(1)
}
radio.onReceivedString(function (receivedString) {
    progData(receivedString)
})
input.onButtonPressed(Button.B, function () {
    progData("011234567")
    progData("P")
})
function progData (命令文字列: string) {
    if ("P" == 命令文字列.substr(0, 1)) {
        progMode = "P"
    }
    if ("U" == 命令文字列.substr(0, 1)) {
        progMode = "U"
        progData("01")
        userInit()
    }
    // 0 … 全てのグループが対象
    // 1-9 … 対象のランタングループ
    if (命令文字列.substr(0, 1) == "0" || 命令文字列.substr(0, 1) == progGroup) {
        // 2文字目から色変更インターバルを取得
        progInterval = Math.constrain(parseFloat(命令文字列.substr(1, 1)) * 100, 30, 3000)
        progColors = 命令文字列.substr(2, 999).split("")
    }
}
let progGroup = ""
let strip: neopixel.Strip = null
let progMode = ""
let progInterval = 0
let progStripe: neopixel.Strip = null
let progColors: string[] = []
progInit(200, "1")
basic.forever(function () {
    progLoop()
})
