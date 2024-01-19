// const button = document.querySelector("button");
let state = { 
  bodyText: `<H1>Home</H1>
  <button id="game-button">Game</button>
  <button id="chat-button">Chat</button>
  <button id="tournament-button">Tournament</button>
  <button id="task-button">Task</button>
  <script src="app.js"></script>`
};


// Change the look of your app based on state
function render() {
	document.body.innerHTML = state.bodyText;
}
// Set initial state and render app for the first time
(function initialize() {
  window.history.replaceState(state, null, "");
  console.log(state);
  render(state);
})();

// Update state, history, and user interface
function handleButtonClick(buttonId) {
	
	window.history.pushState(state, null, "");
	render(state);
}

// Tell your browser to give you old state and re-render on back
window.onpopstate = function (event) {
  if (event.state) { state = event.state; }
  render(state);
};

document.addEventListener('DOMContentLoaded', function() {
	document.addEventListener('click', function(event) {
		if (event.target.tagName === 'BUTTON') {
			// Button is clicked
			let buttonId = event.target.id;
			console.log(buttonId);
			if (buttonId == "home-button")
			{
				state.bodyText = `<H1>Home</H1>
				<button id="game-button">Game</button>
				<button id="chat-button">Chat</button>
				<button id="tournament-button">Tournament</button>
				<button id="task-button">Task</button>
				<script src="app.js"></script>`;
			}
			else if (buttonId == "game-button")
			{
				state.bodyText = `<H1>Game</H1>
				<button id="home-button">Home</button>
				<button id="chat-button">Chat</button>
				<button id="tournament-button">Tournament</button>
				<button id="task-button">Task</button>
				<script src="app.js"></script>`;
			}
			else if (buttonId == "chat-button")
			{
				state.bodyText = `<H1>Chat</H1>
				<button id="home-button">Home</button>
				<button id="game-button">Game</button>
				<button id="tournament-button">Tournament</button>
				<button id="task-button">Task</button>
				<script src="app.js"></script>`;
			}
			else if (buttonId == "tournament-button")
			{
				state.bodyText = `<H1>Tournament</H1>
				<button id="home-button">Home</button>
				<button id="game-button">Game</button>
				<button id="chat-button">Chat</button>
				<button id="task-button">Task</button>
				<script src="app.js"></script>`;
			}
			else if (buttonId == "task-button" || buttonId == "addtask-button")
			{
				if (buttonId == "addtask-button")
					addTask();
				state.bodyText = `<H1>Task</H1>
				<button id="home-button">Home</button>
				<button id="game-button">Game</button>
				<button id="chat-button">Chat</button>
				<button id="tournament-button">Tournament</button>
				<label for="taskInput">New Task:</label>
				<input type="text" id="taskInput" placeholder="Enter task name">
				<button id="addtask-button">Add Task</button>
				<ul id="taskList">`
				+ taskList +
									
				`</ul>
				<script src="app.js"></script>`;
			}
			handleButtonClick(buttonId);
		}
	});
});

let taskList = "";

function addTask() {

	// Get the input value
	var taskName = document.getElementById('taskInput').value;

	if (taskName.trim() !== '')
		taskList += "<li>" + taskName + "</li>";
}