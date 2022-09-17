const _ = false;
const miniMap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, _, _, _, _, _, _, _, _, _, _, _, _, _, _, 1],
    [1, _, _, 3, 3, 3, 3, _, _, _, 2, 2, 2, _, _, 1],
    [1, _, _, _, _, _, 4, _, _, _, _, _, 2, _, _, 1],
    [1, _, _, _, _, _, 4, _, _, _, _, _, 2, _, _, 1],
    [1, _, _, 3, 3, 3, 3, _, _, _, _, _, _, _, _, 1],
    [1, _, _, _, _, _, _, _, _, _, _, _, _, _, _, 1],
    [1, _, _, _, 4, _, _, _, 4, _, _, _, _, _, _, 1],
    [1, 1, 1, 3, 1, 3, 1, 1, 1, 3, 1, 1, 3, 1, 1, 1],
];

export default class Map {
    constructor() {
        this.miniMap = miniMap;
        this.worldMap = {};
    }

    getMap() {
        for (let j = 0; j < this.miniMap.length; j++) {
            const row = miniMap[j];
            for (let i = 0; i < row.length; i++) {
                if (row[i]) {
                    this.worldMap[`${i},${j}`] = row[i];
                }
            }
        }
    }

    draw(ctx) {
        for (let pos of Object.keys(this.worldMap)) {
            const [i, j] = pos.split(',');

            ctx.strokeStyle = 'white';
            ctx.strokeRect(i * 100, j * 100, 100, 100);
        }
    }
}
