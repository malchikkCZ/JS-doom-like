export default class RayCasting {
    constructor(game) {
        this.game = game;
        this.rayCastingResult = [];
        this.objectsToRender = [];
        this.fov = Math.PI / 3;
        this.numOfRays = 800;
        this.scale = 1600 / this.numOfRays;
        this.textureSize = 256;
        this.maxDepth = 20;
        this.deltaAngle = this.fov / this.numOfRays;
        this.screenDist = 800 / Math.tan(this.fov / 2);
    }

    getObjectsToRender() {
        this.objectsToRender = [];
        for (let ray of this.rayCastingResult) {
            let wallPos, wallColumn;
            const { depth, texture, offset } = ray;

            const projHeight = this.screenDist / (depth + 0.0001);
            const rayIndex = this.rayCastingResult.indexOf(ray);

            wallColumn = {
                dx: offset * (this.textureSize - this.scale),
                dy: 0,
                dw: this.scale,
                dh: this.textureSize,
            };
            wallPos = [rayIndex * this.scale, 450 - Math.floor(projHeight / 2)];

            const scale = this.scale;
            this.objectsToRender.push({
                depth,
                scale,
                wallPos,
                wallColumn,
                projHeight,
                texture,
            });
        }
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
            let [textureHor, textureVert] = [1, 1];

            // horizontals
            let [yHor, dyHor] = sinA > 0 ? [yMap + 1, 1] : [yMap - 1e-6, -1];

            let depthHor = (yHor - yOrigin) / sinA;
            let xHor = xOrigin + depthHor * cosA;

            deltaDepth = dyHor / sinA;
            let dxHor = deltaDepth * cosA;

            for (let i = 0; i < this.maxDepth; i++) {
                const tileHor = `${Math.floor(xHor)},${Math.floor(yHor)}`;
                if (Object.keys(this.game.map.worldMap).includes(tileHor)) {
                    textureHor = this.game.map.worldMap[tileHor];
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
                    textureVert = this.game.map.worldMap[tileVert];
                    break;
                }
                xVert += dxVert;
                yVert += dyVert;
                depthVert += deltaDepth;
            }

            let depth, texture, offset;
            if (depthVert < depthHor) {
                depth = depthVert;
                texture = textureVert;
                yVert %= 1;
                offset = cosA > 0 ? yVert : 1 - yVert;
            } else {
                depth = depthHor;
                texture = textureHor;
                xHor %= 1;
                offset = sinA > 0 ? 1 - xHor : xHor;
            }

            depth *= Math.cos(this.game.player.angle - rayAngle);

            this.rayCastingResult.push({ depth, texture, rayAngle, offset });
            rayAngle += this.deltaAngle;
        }
    }

    draw(ctx) {
        for (let ray of this.rayCastingResult) {
            const { depth, rayAngle } = ray;
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
        this.getObjectsToRender();
    }
}
