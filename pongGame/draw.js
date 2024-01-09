import {
	Pong,
	rounds
} from './app.js'

export * from './draw.js';
//*****draw */

export function draw() {
	// Clear the Canvas
	clearCanvas.call(this);

	// Set the fill style to black
	this.context.fillStyle = this.color;

	// Draw the background
	drawBackground.call(this);

	// Set the fill style to white (For the paddles and the ball)
	this.context.fillStyle = '#ffffff';

	// Draw the Player
	drawPlayer.call(this);

	// Draw the Ai
	drawAi.call(this);

	// Draw the Ball
	drawBall.call(this);

	// Draw the net (Line in the middle)
	drawNet.call(this);

	// Set the default canvas font and align it to the center
	this.context.font = '100px Courier New';
	this.context.textAlign = 'center';

	// Draw the players score (left)
	drawPlayerScore.call(this);

	// Draw the paddles score (right)
	drawPaddleScore.call(this);

	// Change the font size for the center score text
	this.context.font = '30px Courier New';

	// Draw the winning score (center)
	drawWinningScore.call(this);

	// Change the font size for the center score value
	this.context.font = '40px Courier';

	// Draw the current round number
	drawRoundNum.call(this);
}

function clearCanvas() {
	this.context.clearRect(
		0,
		0,
		this.canvas.width,
		this.canvas.height
	);
}

function drawBackground() {
	this.context.fillRect(
		0,
		0,
		this.canvas.width,
		this.canvas.height
	);
}

function drawPlayer() {
	this.context.fillRect(
		this.player.x,
		this.player.y,
		this.player.width,
		this.player.height
	);
}

function drawAi() {
	this.context.fillRect(
		this.ai.x,
		this.ai.y,
		this.ai.width,
		this.ai.height 
	);
}

function drawBall() {
	if (Pong._turnDelayIsOver.call(this)) {
		this.context.fillRect(
			this.ball.x,
			this.ball.y,
			this.ball.width,
			this.ball.height
		);
	}
}

function drawNet() {
	this.context.beginPath();
	this.context.setLineDash([7, 15]);
	this.context.moveTo((this.canvas.width / 2), this.canvas.height - 140);
	this.context.lineTo((this.canvas.width / 2), 140);
	this.context.lineWidth = 10;
	this.context.strokeStyle = '#ffffff';
	this.context.stroke();
}

function drawPlayerScore() {
	this.context.fillText(
		this.player.score.toString(),
		(this.canvas.width / 2) - 300,
		200
	);
}

function drawPaddleScore() {
	this.context.fillText(
		this.ai.score.toString(),
		(this.canvas.width / 2) + 300,
		200
	);
}

function drawWinningScore() {
	this.context.fillText(
		'Round ' + (Pong.round + 1),
		(this.canvas.width / 2),
		35
	);
}

function drawRoundNum() {
	this.context.fillText(
		rounds[Pong.round] ? rounds[Pong.round] : rounds[Pong.round - 1],
		(this.canvas.width / 2),
		100
	);
}