import * as PIXI from "pixi.js";
import {
    TankGame
} from "./tank-game";


// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container.
var app = new PIXI.Application();

// The application will create a canvas element for you that you
// can then insert into the DOM.
document.body.appendChild(app.view);
// load the texture we need

const tankGame: TankGame = new TankGame(app.view.width, app.view.height);
app.stage.addChild(tankGame);
app.stage.pivot.y = - app.view.height / 2;
app.stage.pivot.x = - app.view.width / 2;
//app.stage.scale.y = -1;