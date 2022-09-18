import Map from './map.js';
import Player from './player.js';
import RayCasting from './raycasting.js';
import ObjectRenderer from './object-renderer.js';

export default class Game {
    constructor() {
        this.map = new Map();
        this.map.getMap();

        this.player = new Player(this);
        this.rayCasting = new RayCasting(this);
        this.objectRenderer = new ObjectRenderer(this);

        this.deltaTime = 0;
    }

    update(deltaTime) {
        this.deltaTime = deltaTime;

        this.player.update();
        this.rayCasting.update();
    }

    draw(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 1600, 900);

        // this.map.draw(ctx);
        // this.rayCasting.draw(ctx);
        // this.player.draw(ctx);
        this.objectRenderer.draw(ctx);
    }
}
