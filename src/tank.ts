export class Tank extends PIXI.Container {
    private base: PIXI.Graphics;
    private _activated: boolean = false;
    private _type: number = 0;
    constructor() {
        super();
        this.base = new PIXI.Graphics();
        this.addChild(this.base);
        this.redraw();
    }

    public redraw(): void {
        this.base.clear();
        this.base.beginFill(0xFF00FF);
        this.base.drawRoundedRect(-40, -20, 80, 40, 5)
        this.base.endFill();
        this.base.beginFill(this.activated ? 0x113300 : 0x999999);
        this.base.drawRoundedRect(-35, -15, 70, 30, 3)
        this.base.endFill();
    }

    public get type(): number {
        return this._type;
    }

    public set type(value: number) {
        this._type = value;
    }

    public set activated(value: boolean) {
        this._activated = value;
        this.redraw();
    }

    public get activated(): boolean {
        return this._activated;
    }
}