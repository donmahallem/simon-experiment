type Point = {
    x: number;
    y: number;
}


export class Landscape extends PIXI.Graphics {
    private data: number[] = [];
    private sourceData: number[];
    private _hillHeight: number;
    private _hillOffset: number;
    private _hillWidth: number;
    private _deltaHeight: number;
    private _octaves: number;
    public constructor(hillWidth: number, hillHeight: number, hillOffset: number, octaves: number) {
        super();
        if (hillHeight <= 0) {
            throw new Error("hillHeight must larger than 0");
        }
        if (hillWidth <= 0) {
            throw new Error("hillWidth must larger than 0");
        }
        this._hillHeight = hillHeight;
        this._hillOffset = hillOffset;
        this._hillWidth = hillWidth;
        this._octaves = octaves;
        this.regenerate();
    }

    public explodeAt(_x: number, radius: number = 10) {
        let x = Math.round(_x);
        let startHeight: number = this.getHeight(x);
        for (let i = x - radius; i <= radius + x; i++) {
            let dX = i - x;
            this.data[i] = Math.min(this.data[i], startHeight - Math.sin(Math.acos(dX / radius)) * radius);
            if (this.data[i] <= 0) {
                this.data[i] = 1;
            }
        }
        this.redraw();
    }

    public getHeight(x: number): number {
        return this.data[Math.trunc(x)];
    }

    public set hillHeight(height: number) {
        this._hillHeight = height;
        this.redraw();
    }

    public get hillHeight(): number {
        return this._hillHeight;
    }

    public set hillWidth(width: number) {
        this._hillWidth = width;
        this.regenerate();
    }

    public get hillWidth(): number {
        return this._hillWidth;
    }

    public set hillOffset(offset: number) {
        this._hillOffset = offset;
        this.redraw();
    }

    public get hillOffset(): number {
        return this._hillOffset;
    }
    public set octaves(octaves: number) {
        this._octaves = octaves;
        this.regenerate();
    }

    public get octaves(): number {
        return this._octaves;
    }

    public regenerate(): void {
        this.sourceData = Landscape.generate(this._hillWidth, this._octaves);
        for (let x = 0; x < this.sourceData.length; x++) {
            this.data[x] = this._hillOffset + (this.sourceData[x] * this._hillHeight);
        }
        this.redraw();
    }

    public redraw(): void {
        this.clear();
        this.beginFill(0x8B4513);
        this.lineStyle(2, 0x7CFC00, 1);
        this.moveTo(0, 0);
        for (let i: number = 0; i < this.data.length; i++) {
            if (this.data[i]) {
                this.lineTo(i, this.data[i]);
            }
        }
        this.lineTo(this.width, 0);
        this.lineTo(0, 0);
        this.endFill();
    }

    private static generate(width: number, ocataves: number = 6): number[] {
        if (width % 1 != 0) {
            throw new Error("Only integers as width allowed");
        }
        if (ocataves % 1 != 0) {
            throw new Error("Only integers as octaves allowed");
        }
        let res: number[] = [];
        let w = width;
        let stepWidth: number = Math.ceil(width / ocataves);
        for (let i = 0; i <= ocataves; i++) {
            res[i * stepWidth] = Math.random();
            if (i > 0) {
                this.fillBezier(res, (i - 1) * stepWidth, i * stepWidth);
            }
        }
        return res;
    }

    private static fillBezier(data: number[], idxL: number, idxR: number) {
        let dX = idxR - idxL;
        let idxC = (idxR + idxL) / 2;
        let p0: Point = {
            x: idxL,
            y: data[idxL]
        }
        let p3: Point = {
            x: idxR,
            y: data[idxR]
        }
        let p1: Point = {
            x: idxC,
            y: data[idxL]
        }
        let p2: Point = {
            x: idxC,
            y: data[idxR]
        }
        for (let i = 0; i < dX; i++) {
            data[idxL + i] = this.bezier(p0, p1, p2, p3, i / dX).y
        }
    }

    private static bezier(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
        return {
            x: (Math.pow(1 - t, 3) * p0.x) + (3 * t * Math.pow(1 - t, 2) * p1.x) + (3 * Math.pow(t, 2) * (1 - t) * p2.x) + (Math.pow(t, 3) * p3.x),
            y: (Math.pow(1 - t, 3) * p0.y) + (3 * t * Math.pow(1 - t, 2) * p1.y) + (3 * Math.pow(t, 2) * (1 - t) * p2.y) + (Math.pow(t, 3) * p3.y)
        };
    }
}