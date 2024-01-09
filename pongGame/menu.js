
import {
	Pong,
	Game
} from './app.js';

export * from './menu.js';

export function endGameMenu(text) {
    // Change the canvas font size and color
    Pong.context.font = '45px Courier New';
    Pong.context.fillStyle = this.color;

    // Draw the rectangle behind the 'Press any key to begin' text.
    Pong.context.fillRect(
        Pong.canvas.width / 2 - 350,
        Pong.canvas.height / 2 - 48,
        700,
        100
    );

    // Change the canvas color;
    Pong.context.fillStyle = '#ffffff';

    // Draw the end game menu text ('Game Over' and 'Winner')
    Pong.context.fillText(text,
        Pong.canvas.width / 2,
        Pong.canvas.height / 2 + 15
    );

    setTimeout(function () {     
        // Pong = Object.assign({}, Game);
        Pong.initialize();
    }, 3000);
}

export function menu(){
    // Draw all the Pong objects in their current state
    Pong.draw();

    // Change the canvas font size and color
    this.context.font = '50px Courier New';
    this.context.fillStyle = this.color;

    // Draw the rectangle behind the 'Press any key to begin' text.
    this.context.fillRect(
        this.canvas.width / 2 - 350,
        this.canvas.height / 2 - 48,
        700,
        100
    );

    // Change the canvas color;
    this.context.fillStyle = '#ffffff';

    // Draw the 'press any key to begin' text
    this.context.fillText('Press any key to begin',
        this.canvas.width / 2,
        this.canvas.height / 2 + 15
    );
}
