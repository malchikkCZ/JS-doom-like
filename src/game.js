import Map from './map.js';
import Player from './player.js';

export default class Game {
    constructor() {
        this.map = new Map();
        this.map.getMap();

        this.player = new Player(this);

        this.deltaTime = 0;
    }

    update(deltaTime) {
        this.deltaTime = deltaTime;

        this.player.update();
    }

    draw(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 1600, 900);

        this.player.draw(ctx);
        this.map.draw(ctx);
    }
}
