export default class ObjectRenderer {
    constructor(game) {
        this.game = game;
    }

    draw(ctx) {
        const objects = this.game.rayCasting.objectsToRender;
        for (let object of objects) {
            const [depth, scale, projHeight, [x, y]] = object;
            const alpha = Math.sqrt(1 / depth ** 2);
            ctx.fillStyle = `rgba(225,225,225,${alpha})`;
            ctx.fillRect(x, y, scale, projHeight);
        }
    }
}
