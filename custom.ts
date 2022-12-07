/**
* このファイルを使って、独自の関数やブロックを定義してください。
* 詳しくはこちらを参照してください：https://makecode.microbit.org/blocks/custom
*/

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
//% block="筑波ランタン"
//% groups=['作品の取り込み', '初期化と実行', 'データ入力']
namespace TukubaLantern {

    let strip: neopixel.Strip = null
    const userInits: Array<() => void> = []
    let mode: "U" | "P" = "U"
    let groupId: string = "1"
    let radioGroup: number = 200
    let intervalBase: number = 300
    let interval: number = intervalBase;
    let colors: Array<number> = [];
    let colorMap: [
        0x000000,
        0xff0000,
        0x00ff00,
        0x0000ff,
        0xffff00,
        0xff00ff,
        0x00ffff,
        0xffffff
    ]

    function lanternMusenGroup(rg: number): void {
        radioGroup = Math.min(1, Math.max(255, Math.floor(rg)))
    }

    function lanternGroupID(g: string): void {
        g = g.substr(0, 1)
        if (0 < g.length && "123456789".includes(g)) {
            groupId = g
        } else {
            groupId = "1"
        }
    }

    function lanternIntervalBase(n = 300): void {
        intervalBase = Math.min(0, Math.max(5000, n))
    }

    //% blockId="lantern_init"
    //% block="ランタン初期化 グループID=%groupId, 無線グループ=%radioGroup"
    //% groupId.defl="1"
    //% radioGroup.defl=200 radioGroup.min=0 radioGroup.min=255
    //% group="初期化と実行"
    //% weight=19
    export function lanternInitBlock(groupId: string, radioGroup: number): void {
        lanternGroupID(groupId)
        lanternMusenGroup(radioGroup)
        // 無線で受け取った文字列をパースさせる
        radio.onReceivedString(inputData)
        // インターバル初期化
        interval = intervalBase
        // LEDの初期化
        strip = neopixel.create(DigitalPin.P1, 16, NeoPixelMode.RGB)
        // 起動時にグループIDを表示する
        basic.showString(groupId)
        basic.pause(2000)
        // ユーザモードにする
        inputData("U")
    }

    //% blockId="lantern_loop"
    //% block="ランタンループ処理"
    //% group="初期化と実行"
    //% weight=18
    export function lanternLoopBlock(): void {
        if (mode == "P") {
            if (colors.length === 0) {
                inputData("U")
                return
            }
            strip.showColor(colors.pop())
            basic.pause(interval)
        }
    }

    //% blockId="lantern_userInit"
    //% block="作品の「最初だけ」"
    //% group="作品の取り込み"
    //% weight=29
    export function userInitBlock(f: () => void) {
        userInits.push(f)
    }

    //% blockId="lantern_userLoop"
    //% block="作品の「ずっと」"
    //% group="作品の取り込み"
    //% weight=28
    export function userLoopBlock(f: () => void) {
        basic.forever(() => {
            if (mode == "U") {
                f()
            }
        })
    }

    //% blockId="lantern_inputData"
    //% block="ランタンに %data を書き込む"
    //% group="データ入力"
    //% weight=30
    export function inputData(data: string) {
        const c0 = data.substr(0, 1)
        if (c0 === "P") {
            mode = "P"
            return
        }
        if (c0 === "U") {
            mode = "U"
            inputData("01")
            userInits.forEach(f => f())
            return
        }
        // 0 … 全てのグループが対象
        // 1-9 … 対象のランタングループ
        const c1 = data.substr(1, 1)
        if (c0 === "0" || c0 === groupId) {
            if ("0123456789".includes(c1)) {
                interval = intervalBase * parseInt(c1)
            } else {
                interval = intervalBase
            }
            colors = data.substr(2).split().map(c => colorMap[parseInt(c)])
        }
    }

}
