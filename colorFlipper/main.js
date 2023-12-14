const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];
const btn = document.getElementById("btn");
const color = document.querySelector(".color");

document.addEventListener("DOMContentLoaded", function () {
	const savedColor = localStorage.getItem("backgroundColor");
	if (savedColor) {
		document.body.style.backgroundColor = savedColor;
		color.textContent = savedColor;
	}
});

btn.addEventListener("click", function () {
	const randomNumber = getRandomNumber();
	document.body.style.backgroundColor = colors[randomNumber];
	color.textContent = colors[randomNumber];
	localStorage.setItem("backgroundColor", colors[randomNumber]);
});

function getRandomNumber() {
	return Math.floor(Math.random() * colors.length);
}
