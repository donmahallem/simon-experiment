export class Background extends PIXI.Container {


    constructor(width: number, height: number) {
        super();
        let a = this.createGradient();
        a.width = width;
        a.height = height;
        this.addChild(a);
    }

    private createGradient(): PIXI.Sprite {
        let canv = document.createElement("canvas");
        canv.width = 100;
        canv.height = 100;
        let ctx = canv.getContext('2d');
        var gradient = ctx.createLinearGradient(0, 0, 0, 100);
        gradient.addColorStop(0, '#81C784');
        gradient.addColorStop(1, '#64B5F6');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 100, 100);
        return new PIXI.Sprite(PIXI.Texture.fromCanvas(canv));
    }
}