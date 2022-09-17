export default class RayCasting {
    constructor(game) {
        this.game = game;
        this.rayCastingResult = [];
        this.fov = Math.PI / 3;
        this.numOfRays = 800;
        this.maxDepth = 20;
        this.deltaAngle = this.fov / this.numOfRays;
    }

    rayCast() {
        this.rayCastingResult = [];
        const [xOrigin, yOrigin] = this.game.player.pos;
        const [xMap, yMap] = this.game.player.mapPos;

        let rayAngle = this.game.player.angle - this.fov / 2 + 0.0001;
        for (let ray = 0; ray < this.numOfRays; ray++) {
            const sinA = Math.sin(rayAngle);
            const cosA = Math.cos(rayAngle);
            let deltaDepth;

            // horizontals
            let [yHor, dyHor] = sinA > 0 ? [yMap + 1, 1] : [yMap - 1e-6, -1];

            let depthHor = (yHor - yOrigin) / sinA;
            let xHor = xOrigin + depthHor * cosA;

            deltaDepth = dyHor / sinA;
            let dxHor = deltaDepth * cosA;

            for (let i = 0; i < this.maxDepth; i++) {
                const tileHor = `${Math.floor(xHor)},${Math.floor(yHor)}`;
                if (Object.keys(this.game.map.worldMap).includes(tileHor)) {
                    break;
                }
                xHor += dxHor;
                yHor += dyHor;
                depthHor += deltaDepth;
            }

            // verticals
            let [xVert, dxVert] = cosA > 0 ? [xMap + 1, 1] : [xMap - 1e-6, -1];

            let depthVert = (xVert - xOrigin) / cosA;
            let yVert = yOrigin + depthVert * sinA;

            deltaDepth = dxVert / cosA;
            let dyVert = deltaDepth * sinA;

            for (let i = 0; i < this.maxDepth; i++) {
                const tileVert = `${Math.floor(xVert)},${Math.floor(yVert)}`;
                if (Object.keys(this.game.map.worldMap).includes(tileVert)) {
                    break;
                }
                xVert += dxVert;
                yVert += dyVert;
                depthVert += deltaDepth;
            }

            let depth;
            if (depthVert < depthHor) {
                depth = depthVert;
                yVert %= 1;
            } else {
                depth = depthHor;
                xHor %= 1;
            }

            this.rayCastingResult.push([depth, rayAngle]);
            rayAngle += this.deltaAngle;
        }
    }

    draw(ctx) {
        for (let ray of this.rayCastingResult) {
            const [depth, rayAngle] = ray;
            ctx.strokeStyle = 'yellow';
            ctx.beginPath();
            ctx.moveTo(this.game.player.x * 100, this.game.player.y * 100);
            ctx.lineTo(
                this.game.player.x * 100 + depth * 100 * Math.cos(rayAngle),
                this.game.player.y * 100 + depth * 100 * Math.sin(rayAngle)
            );
            ctx.stroke();
            ctx.closePath();
        }
    }

    update() {
        this.rayCast();
    }
}
