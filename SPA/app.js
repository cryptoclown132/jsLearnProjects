//reload needs to fixed

let currentStateIndex = 0;


let state = { 
  bodyText: `<H1>Home</H1>
  <button id="game-button">Game</button>
  <button id="chat-button">Chat</button>
  <button id="tournament-button">Tournament</button>
  <button id="task-button">Task</button>
  <script src="app.js"></script>`,
  currPage : "home",
//   idxState : 0
};

// Change the look of your app based on state
function render() {
	document.body.innerHTML = state.bodyText;
}

// Set initial state and render app for the first time
(function initialize() {
  window.history.replaceState(state, null, "");
  render(state);
})();

// Update state, history, and user interface
function handleButtonClick(url) {
	window.history.pushState(state, null, url);
	render(state);
}

// Tell your browser to give you old state and re-render on back
window.onpopstate = function (event) {
	if (event.state)
		state = event.state;
	let stateJson = JSON.stringify(event.state);

	if (event.state.currPage == "task")
	{
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
		window.history.replaceState(state, null, "");
		console.log("inside if");
	}
	console.log(taskList);
	console.log(event.state.currPage);
	  // Log the JSON string
	//   console.log('Navigated to state:', stateJson);
  render(state);
};

function homePage() {
	state.bodyText = `<H1>Home</H1>
				<button id="game-button">Game</button>
				<button id="chat-button">Chat</button>
				<button id="tournament-button">Tournament</button>
				<button id="task-button">Task</button>
				<script src="app.js"></script>`;
	currentStateIndex++;
	state.currPage = "home";
	handleButtonClick("")
}

function gamePage() {
	state.bodyText = `<H1>Game</H1>
				<button id="home-button">Home</button>
				<button id="chat-button">Chat</button>
				<button id="tournament-button">Tournament</button>
				<button id="task-button">Task</button>
				<script src="app.js"></script>`;
	currentStateIndex++;
	state.currPage = "game";
	handleButtonClick("game")
}

function chatPage() {
	state.bodyText = `<H1>Chat</H1>
				<button id="home-button">Home</button>
				<button id="game-button">Game</button>
				<button id="tournament-button">Tournament</button>
				<button id="task-button">Task</button>
				<script src="app.js"></script>`;
	currentStateIndex++;
	state.currPage = "chat";
	handleButtonClick("")
}

function tournamentPage() {
	state.bodyText = `<H1>Tournament</H1>
				<button id="home-button">Home</button>
				<button id="game-button">Game</button>
				<button id="chat-button">Chat</button>
				<button id="task-button">Task</button>
				<script src="app.js"></script>`;
	currentStateIndex++;
	state.currPage = "tournament";
	handleButtonClick("tournament")///tournament
}

function taskPage(buttonId) {
	if (buttonId == "addtask-button")
	{
		addTask();
		// var elementToUpdate = document.getElementById('taskList');
    	// elementToUpdate.textContent = taskList;
		// return;
	}
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
	if (buttonId == "addtask-button") {
		// replaceAllHistory(state);
		window.history.replaceState(state, null, "");
		state.currPage = "task";
		render(state);
	}
	else {
		handleButtonClick("")///task
		state.currPage = "task";
	}
}

function replaceAllHistory(state) {
	for (var i = history.length - 1; i >= 0; i--) {
        history.go(-i);
		if (history.state.currPage == "task")
			history.replaceState(state, null, "");
    }
	for (var i = 0; i < history.length - 1; i++) {
        history.go(i);
		// if (history.state.currPage == "task")
		// 	history.replaceState(state, null, "");
    }
}

document.addEventListener('DOMContentLoaded', function() {
	document.addEventListener('click', function(event) {
		if (event.target.tagName === 'BUTTON') {
			let buttonId = event.target.id;

			if (buttonId == "home-button")
				homePage();
			else if (buttonId == "game-button")
				gamePage();
			else if (buttonId == "chat-button")
				chatPage();
			else if (buttonId == "tournament-button")
				tournamentPage();
			else if (buttonId == "task-button" || buttonId == "addtask-button")
				taskPage(buttonId);
		}
	});
});

let taskList = localStorage.getItem('taskList') || "";

function addTask() {
	let taskName = document.getElementById('taskInput').value;

	if (taskName.trim() !== '') {
		taskList += "<li>" + taskName + "</li>";
		localStorage.setItem('taskList', taskList);
	}
}
