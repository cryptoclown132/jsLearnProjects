// Global Variables
export * from './app.js';

import { draw } from './draw.js';
import { update } from './update.js';
import { menu, endGameMenu } from './menu.js';

export let DIRECTION = {
    IDLE: 0,
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4
};
 
export let rounds = [5, 5, 3, 3, 2];
let colors = ['#1abc9c', '#2ecc71', '#3498db', '#8c52ff', '#9b59b6'];
 
// The ball object (The cube that bounces back and forth)
function ball(incrementedSpeed) {
    return {
            width: 18,
            height: 18,
            x: (this.canvas.width / 2) - 9,
            y: (this.canvas.height / 2) - 9,
            moveX: DIRECTION.IDLE,
            moveY: DIRECTION.IDLE,
            speed: incrementedSpeed || 7 
        };
}
// let Ball = {
//     new: function (incrementedSpeed) {
//         return {
//             width: 18,
//             height: 18,
//             x: (this.canvas.width / 2) - 9,
//             y: (this.canvas.height / 2) - 9,
//             moveX: DIRECTION.IDLE,
//             moveY: DIRECTION.IDLE,
//             speed: incrementedSpeed || 7 
//         };
//     }
// };
 
// The ai object (The two lines that move up and down)
let Ai = {
    new: function (side) {
        return {
            width: 18,
            height: 180,
            x: side === 'left' ? 150 : this.canvas.width - 150,
            y: (this.canvas.height / 2) - 35,
            score: 0,
            move: DIRECTION.IDLE,
            speed: 8
        };
    }
};

function initializeGame() {
    this.canvas = document.querySelector('canvas');
    this.context = this.canvas.getContext('2d');

    this.canvas.width = 1400;
    this.canvas.height = 1000;

    this.canvas.style.width = (this.canvas.width / 2) + 'px';
    this.canvas.style.height = (this.canvas.height / 2) + 'px';

    this.player = Ai.new.call(this, 'left');
    this.ai = Ai.new.call(this, 'right');
    // this.ball = Ball.new.call(this);
    this.ball = ball.call(this);

    this.ai.speed = 5;
    this.running = this.over = false;
    this.turn = this.ai;
    this.timer = this.round = 0;
    this.color = '#8c52ff';

    Pong.menu();
    Pong.keyEvents();
}













//*********loop */

function loop() {
    Pong.update();
    Pong.draw();

    // If the game is not over, draw the next frame.
    if (!Pong.over)
        requestAnimationFrame(Pong.loop);
}

function keyEvents() {
    document.addEventListener('keydown', function (key) {
        // Handle the 'Press any key to begin' function and start the game.
        if (Pong.running === false) {
            Pong.running = true;
            window.requestAnimationFrame(Pong.loop);
        }

        // Handle up arrow and w key events
        if (key.keyCode === 38 || key.keyCode === 87)
            Pong.player.move = DIRECTION.UP;

        // Handle down arrow and s key events
        if (key.keyCode === 40 || key.keyCode === 83)
            Pong.player.move = DIRECTION.DOWN;
    });

    // Stop the player from moving when there are no keys being pressed.
    document.addEventListener('keyup', function (key) {
        Pong.player.move = DIRECTION.IDLE; });
}

function resetTurn(victor, loser) {
    // this.ball = Ball.new.call(this, this.ball.speed);
    this.ball = ball.call(this, this.ball.speed);

    this.turn = loser;
    this.timer = (new Date()).getTime();

    victor.score++;
}

function turnDelayIsOver() {
    return ((new Date()).getTime() - this.timer >= 1000);
}

function generateRoundColor() {
    let newColor = colors[Math.floor(Math.random() * colors.length)];
    if (newColor === this.color)
        return Pong._generateRoundColor();
    return newColor;
}

export let Game = {
    initialize: initializeGame,
 
    endGameMenu: endGameMenu,
 
    menu: menu,
 
    // Update all objects (move the player, ai, ball, increment the score, etc.)
    update: update,
 
    // Draw the objects to the canvas element
    draw: draw,
 
    loop: loop,
 
    keyEvents: keyEvents,
 
    // Reset the ball location, the player turns and set a delay before the next round begins.
    _resetTurn: resetTurn,
 
    // Wait for a delay to have passed after each turn.
    _turnDelayIsOver: turnDelayIsOver,
 
    // Select a random color as the background of each level/round.
    _generateRoundColor: generateRoundColor
};
 
export let Pong = Object.assign({}, Game);
Pong.initialize();