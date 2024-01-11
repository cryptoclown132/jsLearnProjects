import {
	Pong,
	rounds,
	DIRECTION
} from './app.js';

import { drawArc } from './draw.js';

export * from './update.js';

export function update() {
    if (!this.over) {

        // If the ball collides with the bound limits - correct the x and y coords.
        checkBallCollision.call(this);

        // Move player if they player.move value was updated by a keyboard event
        checkPlayerMovement.call(this);

        // On new serve (start of each turn) move the ball to the correct side
        // and randomize the direction to add some challenge.
        checkNewServe.call(this);

        // If the player collides with the bound limits, update the x and y coords.
        checkPlayerCollision.call(this);

        // Move ball in intended direction based on moveY and moveX values
        checkBallMovement.call(this);

        // Handle ai (AI) UP and DOWN movement
       handleAiMovement.call(this);

        // Handle ai (AI) wall collision
        handleAiWallCollision.call(this);

        // Handle Player-Ball collisions
    	handlePlayerBallCollision.call(this);

        // Handle ai-ball collision
        handleAiBallCollision.call(this);
    }

    // Handle the end of round transition
    // Check to see if the player won the round.
    whoWon.call(this);
}

function handleAiBallCollision() {
	if (this.ball.x - this.ball.width <= this.ai.x && this.ball.x >= this.ai.x - this.ai.width) {
		if (this.ball.y <= this.ai.y + this.ai.height && this.ball.y + this.ball.height >= this.ai.y) {
			this.ball.x = (this.ai.x - this.ball.width);
			this.ball.moveX = DIRECTION.LEFT;
		}
	}
}


function handlePlayerBallCollision() {
	if (this.ball.x - this.ball.width <= this.player.x && this.ball.x >= this.player.x - this.player.width) {
		if (this.ball.y <= this.player.y + this.player.height && this.ball.y + this.ball.height >= this.player.y) {
			this.ball.x = (this.player.x + this.ball.width);
			this.ball.moveX = DIRECTION.RIGHT;
		}
	}
}

function handleAiWallCollision() {
	if (this.ai.y >= this.canvas.height - this.ai.height)
		this.ai.y = this.canvas.height - this.ai.height;
    else if (this.ai.y <= 0)
		this.ai.y = 0;
}	

function handleAiMovement() {
	if (this.ai.y > this.ball.y - (this.ai.height / 2)) {
		if (this.ball.moveX === DIRECTION.RIGHT)
			this.ai.y -= this.ai.speed / 1.5;
		else
			this.ai.y -= this.ai.speed / 4;
	}
	if (this.ai.y < this.ball.y - (this.ai.height / 2)) {
		if (this.ball.moveX === DIRECTION.RIGHT)
			this.ai.y += this.ai.speed / 1.5;
		else
			this.ai.y += this.ai.speed / 4;
	}
}

function checkBallMovement() {
	if (this.ball.moveY === DIRECTION.UP)
		this.ball.y -= (this.ball.speed / 1.5);
    else if (this.ball.moveY === DIRECTION.DOWN)
		this.ball.y += (this.ball.speed / 1.5);
    if (this.ball.moveX === DIRECTION.LEFT)
		this.ball.x -= this.ball.speed;
    else if (this.ball.moveX === DIRECTION.RIGHT)
		this.ball.x += this.ball.speed;
}

function checkPlayerCollision() {
	if (this.player.y <= 0)
		this.player.y = 0;
    else if (this.player.y >= (this.canvas.height - this.player.height))
		this.player.y = (this.canvas.height - this.player.height);
}

function checkNewServe() {
	if (Pong._turnDelayIsOver.call(this) && this.turn) {
		this.ball.moveX = this.turn === this.player ? DIRECTION.LEFT : DIRECTION.RIGHT;
		this.ball.moveY = [DIRECTION.UP, DIRECTION.DOWN][Math.round(Math.random())];
		this.ball.y = Math.floor(Math.random() * this.canvas.height - 200) + 200;
		this.turn = null;
	}
}

function checkPlayerMovement() {
	if (this.player.move === DIRECTION.UP)
		this.player.y -= this.player.speed;
    else if (this.player.move === DIRECTION.DOWN)
		this.player.y += this.player.speed;
}

function runLoop(runTime) {
    const startTime = new Date().getTime(); // Get the start time in milliseconds

    while (true) {
        const currentTime = new Date().getTime(); // Get the current time in milliseconds
        const elapsedTime = (currentTime - startTime) / 1000; // Calculate elapsed time in seconds
		
        if (elapsedTime >= runTime)
		{
			
            return true; // Exit the loop when one second has passed
		}
    }
}

function checkBallCollision() {
	if (this.ball.x <= 0)
	{
		// const startTime = new Date().getTime();
		// //drawArc.call(this, 7, this.ball.y + 7, 7, 'Red');
	
		// while (startTime + 1000 > new Date().getTime()) {
		// 	drawArc.call(this, 7, this.ball.y + 7, 7, 'Red');
		// 	requestAnimationFrame(Pong.loop);
		// 	drawArc.call(this, 7 * 2, this.ball.y + 7, 7 * 2, 'Red');
		// }
		
		// runLoop(1);
		Pong._resetTurn.call(this, this.ai, this.player);
	}
    if (this.ball.x >= this.canvas.width - this.ball.width)
		Pong._resetTurn.call(this, this.player, this.ai);
    if (this.ball.y <= 0)
		this.ball.moveY = DIRECTION.DOWN;
    if (this.ball.y >= this.canvas.height - this.ball.height)
		this.ball.moveY = DIRECTION.UP;
}

function whoWon() {
	if (this.player.score === rounds[this.round])
        playerWon.call(this);
    // Check to see if the ai/AI has won the round.
    else if (this.ai.score === rounds[this.round])
       aiWon.call(this);
}

function playerWon() {
	// Check to see if there are any more rounds/levels left and display the victory screen if
	// there are not.
	if (!rounds[this.round + 1]) {
		this.over = true;
		setTimeout(function () { Pong.endGameMenu('Winner!'); }, 1000);
	} else {
		// If there is another round, reset all the values and increment the round number.
		this.color = this._generateRoundColor();
		this.player.score = this.ai.score = 0;
		this.player.speed += 0.5;
		this.ai.speed += 1;
		this.ball.speed += 1;
		this.round += 1;

	}
}

function aiWon() {
	this.over = true;
    setTimeout(function () { Pong.endGameMenu('Game Over!'); }, 1000);
}