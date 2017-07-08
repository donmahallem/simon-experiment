import { Fly } from "./fly";
import { Tank } from "./tank";


export class FlyContainer extends PIXI.Container {


    constructor(flyNumber: number = 100, radius: number = 20) {
        super();
        for (let i = 0; i < flyNumber; i++) {
            let fly: Fly = new Fly()
            let angle: number = Math.PI * 2 * Math.random();
            fly.x = Math.sin(angle) * Math.random() * radius;
            fly.y = Math.cos(angle) * Math.random() * radius;
            fly.cageRadius = radius;
            fly.type = i % 3;
            this.addChild(fly);
        }

    }

    public step(delta: number): void {
        for (let fly of this.children) {
            (<Fly>fly).step(delta);
        }
    }

    public activateChannels(tanks: Tank[]): void {
        //console.log("b")
        let activations: number[] = new Array(tanks.length);
        for (let tidx = 0; tidx < tanks.length; tidx++) {
            activations[tidx] = 0
        }
        for (let i = 0; i < this.children.length; i++) {
            let globalFly = this.children[i].getGlobalPosition();
            for (let j = 0; j < tanks.length; j++) {
                if (tanks[j].type != (<Fly>this.children[i]).type) {
                    continue;
                }
                if (tanks[j].getBounds().contains(globalFly.x, globalFly.y)) {
                    activations[j] += 1;
                }
            }
        }
        for (let idx = 0; idx < tanks.length; idx++) {
            tanks[idx].activated = activations[idx] > 2
        }
    }

}