import Game from './game.js';

const canvas = document.querySelector('.game-canvas');
const ctx = canvas.getContext('2d');

canvas.requestPointerLock =
    canvas.requestPointerLock || canvas.mozRequestPointerLock;
canvas.onclick = () => {
    canvas.requestPointerLock();
};

let lastTime = 0;
const game = new Game();

const gameLoop = (timestamp) => {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    game.update(deltaTime);
    game.draw(ctx);

    requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);
