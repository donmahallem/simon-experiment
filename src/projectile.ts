export class Projectile extends PIXI.Graphics {
    constructor() {
        super();
        this.beginFill(0xFF0000);
        this.moveTo(-4, 2);
        this.lineTo(2, 2);
        this.lineTo(4, 0);
        this.lineTo(2, -2);
        this.lineTo(-4, -2);
        this.lineTo(-4, 2);
        this.endFill();
    }

    public lastX: number = null;
    public lastY: number = null;

    private static readonly GRAVITY: PIXI.Point = new PIXI.Point(0, -0.05);
    private static readonly TERMINAL_VELOCITY: number = 10;
    public velocity: PIXI.Point = new PIXI.Point();
    public destroyed: boolean = false;

    public step(delta: number): void {
        this.velocity.x = Math.min(Projectile.TERMINAL_VELOCITY, this.velocity.x + (Projectile.GRAVITY.x * delta));
        this.velocity.y = Math.min(Projectile.TERMINAL_VELOCITY, this.velocity.y + (Projectile.GRAVITY.y * delta));
        this.lastX = this.x;
        this.lastY = this.y;
        this.x = this.x + (delta * this.velocity.x);
        this.y = this.y + (delta * this.velocity.y);
        if (this.velocity.x == 0) {
            this.rotation = this.velocity.y >= 0 ? 0 : Math.PI;
        } else {
            this.rotation = Math.atan(this.velocity.y / this.velocity.x);
        }
    }
}