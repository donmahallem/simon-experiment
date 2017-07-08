export class TargetNumber extends PIXI.Container {

    public _num: number = 0;
    private text: PIXI.Text;
    private textStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 20,
        fontWeight: 'bold',
        fill: "#0000FF", // gradient
        stroke: '#4a1850',
        strokeThickness: 1
    });/*
    private textStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440
    });*/
    constructor(num: number) {
        super();
        this._num = num;
        this.text = new PIXI.Text("" + num, this.textStyle);
        this.addChild(this.text);
        this.centerText();
    }

    private centerText(): void {
        this.pivot.y = this.height;
        this.scale.y = -1;
        this.text.x = this.text.width / -2;
    }

    public set num(num: number) {
        this._num = num;
        this.text.text = "" + num;
        this.centerText();
    }

    public get num(): number {
        return this._num;
    }
}