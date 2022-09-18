export default class ObjectRenderer {
    constructor(game) {
        this.game = game;
        this.skyOffset = 0;
        this.wallTextures = this.loadWallTextures();
        this.skyBackground = document.getElementById('sky');
    }

    loadWallTextures() {
        return {
            1: document.getElementById('texture1'),
            2: document.getElementById('texture2'),
            3: document.getElementById('texture3'),
            4: document.getElementById('texture4'),
            5: document.getElementById('texture5'),
        };
    }

    draw(ctx) {
        this.skyOffset = (this.skyOffset + 0.5 * this.game.player.rel) % 1600;
        ctx.drawImage(this.skyBackground, -1600 - this.skyOffset, 0);
        ctx.drawImage(this.skyBackground, -this.skyOffset, 0);
        ctx.drawImage(this.skyBackground, -this.skyOffset + 1600, 0);

        ctx.fillStyle = 'rgb(30, 30, 30)';
        ctx.fillRect(0, 450, 1600, 900);

        const objects = this.game.rayCasting.objectsToRender;
        for (let object of objects) {
            const {
                scale,
                wallPos: [x, y],
                wallColumn: { dx, dy, dw, dh },
                projHeight,
                texture,
            } = object;

            const image = this.wallTextures[texture];
            ctx.drawImage(image, dx, dy, dw, dh, x, y, scale, projHeight);
        }
    }
}
