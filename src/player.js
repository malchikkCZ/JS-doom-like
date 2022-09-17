import InputListener from './input-listener.js';

export default class Player {
    constructor(game) {
        this.game = game;
        this.x = 1.5;
        this.y = 5;
        this.size = 60;
        this.angle = -Math.PI / 2;
        this.speed = 0.004;
        this.sensitivity = 0.0002;

        new InputListener(this);
        this.direction = [];
    }

    move(direction) {
        if (!this.direction.includes(direction)) {
            this.direction.push(direction);
        }
    }

    stop(direction) {
        this.direction = this.direction.filter((dir) => dir !== direction);
    }

    rotate(movementX) {
        this.angle += movementX * this.sensitivity * this.game.deltaTime;
    }

    movement() {
        const sinA = Math.sin(this.angle);
        const cosA = Math.cos(this.angle);
        let [dx, dy] = [0, 0];
        const speed = this.speed * this.game.deltaTime;
        const speedSin = speed * sinA;
        const speedCos = speed * cosA;

        if (this.direction.includes('up')) {
            dx += speedCos;
            dy += speedSin;
        }
        if (this.direction.includes('down')) {
            dx += -speedCos;
            dy += -speedSin;
        }
        if (this.direction.includes('left')) {
            dx += speedSin;
            dy += -speedCos;
        }
        if (this.direction.includes('right')) {
            dx += -speedSin;
            dy += speedCos;
        }

        this.checkWallCollision(dx, dy);
        this.angle %= 2 * Math.PI;
    }

    checkWall(x, y) {
        const coords = `${x},${y}`;
        return !Object.keys(this.game.map.worldMap).includes(coords);
    }

    checkWallCollision(dx, dy) {
        const scale = this.size / this.game.deltaTime;
        console.log(scale);
        if (
            this.checkWall(Math.floor(this.x + dx * scale), Math.floor(this.y))
        ) {
            this.x += dx;
        }
        if (
            this.checkWall(Math.floor(this.x), Math.floor(this.y + dy * scale))
        ) {
            this.y += dy;
        }
    }

    update() {
        this.movement();
    }

    draw(ctx) {
        ctx.strokeStyle = 'yellow';
        ctx.beginPath();
        ctx.moveTo(this.x * 100, this.y * 100);
        ctx.lineTo(
            this.x * 100 + 1600 * Math.cos(this.angle),
            this.y * 100 + 1600 * Math.sin(this.angle)
        );
        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = 'green';
        ctx.arc(this.x * 100, this.y * 100, this.size / 2, 0, 2 * Math.PI);
        ctx.fill();
    }
}
