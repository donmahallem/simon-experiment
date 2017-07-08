import {
    Tank
} from "./tank";
import {
    Landscape
} from "./landscape";
import {
    TargetNumber
} from "./target-number";
import {
    Background
} from "./background";
import {
    Projectile
} from "./projectile";
import {
    FlyContainer
} from "./fly-container";

// source: https://github.com/kittykatattack/learningPixi#keyboard
class KeyListener {
    private isDown: boolean = false;
    private isUp: boolean = true;
    public readonly code: number;

    private constructor(code: number) {
        this.code = code;
    }
    private downHandler(event) {
        if (event.keyCode === this.code) {
            if (this.isUp && this.press) this.press();
            this.isDown = true;
            this.isUp = false;
            event.preventDefault();
        }
    };
    private upHandler = function (event) {
        if (event.keyCode === this.code) {
            if (this.isDown && this.release) this.release();
            this.isDown = false;
            this.isUp = true;
            event.preventDefault();
        }
    };

    public static create(keyCode: number, down: Function = null, up: Function = null): KeyListener {
        let keyListener: KeyListener = new KeyListener(keyCode);
        window.addEventListener(
            "keydown", keyListener.downHandler.bind(keyListener), false
        );
        window.addEventListener(
            "keyup", keyListener.upHandler.bind(keyListener), false
        );
        keyListener.press = down;
        keyListener.release = up;
        return keyListener;
    }
    press: Function;
    release: Function;
}


export class TankGame extends PIXI.Container {

    private background: Background;
    private landscape: Landscape;
    private tanks: Tank[] = [];
    private gameWidth: number;
    private gameHeight: number;
    private initiated: boolean;
    private projectileContainer: PIXI.Container = new PIXI.Container();
    private numberContainer: PIXI.Container = new PIXI.Container();
    private powerUpListener: KeyListener;
    private powerDownListener: KeyListener;
    private powerText: PIXI.Text;
    private callText: PIXI.Text;
    private flyContainer: FlyContainer;
    private callTextStyle = new PIXI.TextStyle({
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
    });
    private power: number = 10;
    private powerTextStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 40,
        fontWeight: 'bold',
        fill: "#FFFFFF", // gradient
        stroke: '#000000',
        strokeThickness: 2
    });
    constructor(width: number, height: number) {
        super();
        this.gameHeight = height;
        this.gameWidth = width;
        this.init();
    }

    private init(): void {
        if (this.initiated === true) {
            throw new Error("Already initiated");
        }


        const RADIUS = 200;
        this.flyContainer = new FlyContainer(400, RADIUS);
        this.addChild(this.flyContainer);
        for (let i = 0; i < 3; i++) {
            const tank: Tank = new Tank();
            tank.type = i;
            this.tanks.push(tank);
            this.projectileContainer.addChild(this.tanks[i]);
            this.tanks[i].x = Math.cos(Math.PI * 2 / 3 * i) * RADIUS
            this.tanks[i].y = Math.sin(Math.PI * 2 / 3 * i) * RADIUS
            this.tanks[i].rotation = Math.PI * 2 / 3 * i + Math.PI / 2
        }
        this.addChild(this.projectileContainer);


        /*
        this.powerUpListener == KeyListener.create(87, null, () => {
            this.power = this.power + 0.1;
            this.updatePowerText();
        });
        this.powerUpListener == KeyListener.create(87, null, () => {
            this.power = this.power + 0.1;
            this.updatePowerText();
        });
        this.powerUpListener == KeyListener.create(82, null, () => {
            this.resetGame();
        });
        this.powerDownListener == KeyListener.create(83, null, () => {
            this.power = Math.max(0, this.power - 0.1);
            this.updatePowerText();
        });*/

        let ticker = PIXI.ticker.shared;
        ticker.add(deltaT => {
            //console.log(this.tank.rotation);
            this.projectileContainer.rotation += 0.01 * deltaT;
            this.flyContainer.step(deltaT);
            this.flyContainer.activateChannels.call(this.flyContainer, this.tanks);
        });

        setInterval(() => {
            console.log(PIXI.ticker.shared.FPS, PIXI.ticker.shared.minFPS);
        }, 1000)
    }

    private lineIntersect(p0_x, p0_y, p1_x, p1_y, p2_x, p2_y, p3_x, p3_y) {

        var s1_x, s1_y, s2_x, s2_y;
        s1_x = p1_x - p0_x;
        s1_y = p1_y - p0_y;
        s2_x = p3_x - p2_x;
        s2_y = p3_y - p2_y;

        var s, t;
        s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
        t = (s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);

        return (s >= 0 && s <= 1 && t >= 0 && t <= 1);
    }

}