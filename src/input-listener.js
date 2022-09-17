export default class InputListener {
    constructor(player) {
        this.player = player;

        document.addEventListener('keydown', (event) => {
            event.preventDefault();
            switch (event.key) {
                case 'w':
                    this.player.move('up');
                    break;
                case 's':
                    this.player.move('down');
                    break;
                case 'a':
                    this.player.move('left');
                    break;
                case 'd':
                    this.player.move('right');
                    break;
            }
        });

        document.addEventListener('keyup', (event) => {
            event.preventDefault();
            switch (event.key) {
                case 'w':
                    this.player.stop('up');
                    break;
                case 's':
                    this.player.stop('down');
                    break;
                case 'a':
                    this.player.stop('left');
                    break;
                case 'd':
                    this.player.stop('right');
                    break;
            }
        });

        document.addEventListener('mousemove', (event) => {
            this.player.rotate(event.movementX);
        });
    }
}
