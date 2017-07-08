export class Fly extends PIXI.Container {
    private base: PIXI.Graphics;
    private acceleration: number = 0.001
    private speed: { x: number, y: number };
    private TOTAL_SPEED: number = 1
    private angleSpeed: number = 0.4
    private angleChangeDelay: number = 0.1;
    private timeSinceLastAngleChange: number = 0
    private _cageRadius: number = 100;
    private _type: number = 0;
    private readonly DEFAULT_COLORS: any[] = [0xFF0000, 0x00FF00, 0x0000FF];
    constructor() {
        super();
        const SPEED_MODIFIER: number = 1.2
        const direction: number = Math.random() * 2 * Math.PI;
        this.speed = {
            x: Math.cos(direction) * this.TOTAL_SPEED,
            y: Math.sin(direction) * this.TOTAL_SPEED
        };
        this.base = new PIXI.Graphics();
        this.addChild(this.base);
        this.redraw();
    }

    public step(delta: number): void {
        this.timeSinceLastAngleChange += delta;
        if (this.timeSinceLastAngleChange > this.angleChangeDelay) {
            const currentSpeed: number = Math.sqrt(Math.pow(this.speed.x, 2) + Math.pow(this.speed.y, 2));
            const currentDirection: number = Math.atan2(this.speed.y, this.speed.x)
            let newDirection: number = currentDirection + (Math.random() * this.angleSpeed) - (this.angleSpeed / 2);
            this.speed.x = Math.cos(newDirection) * currentSpeed;
            this.speed.y = Math.sin(newDirection) * currentSpeed;
            this.timeSinceLastAngleChange -= this.angleChangeDelay;
        }
        this.x += this.speed.x * delta;
        this.y += this.speed.y * delta;
        const dst: number = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        if (dst > this.cageRadius) {

            const totalSpeed: number = Math.sqrt(Math.pow(this.speed.x, 2) + Math.pow(this.speed.y, 2));
            let angle: number = Math.atan2(this.y, this.x) + Math.PI
            this.speed.x = Math.cos(angle) * totalSpeed;
            this.speed.y = Math.sin(angle) * totalSpeed;
            //this.speed.x = -this.speed.y
            //this.speed.y = -this.speed.x
        }
    }

    public set type(value: any) {
        this._type = value % 3;
        this.redraw();
    }

    public get type(): any {
        return this._type;
    }
    public set cageRadius(value: number) {
        this._cageRadius = value;
    }

    public get cageRadius(): number {
        return this._cageRadius;
    }

    public redraw(): void {
        this.base.clear();
        this.base.beginFill(this.DEFAULT_COLORS[this.type]);
        this.base.drawCircle(0, 0, 5)
        this.base.endFill();
    }

}