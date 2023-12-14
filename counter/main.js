
let count = 0;
const value = document.querySelector("#value");
const btns = document.querySelectorAll(".btn");

document.addEventListener("DOMContentLoaded", function () {
	const savedCount = localStorage.getItem("count");
	if (savedCount) {
		value.style.color = localStorage.getItem("color");
		count = savedCount;
		value.textContent = count;
	}
});

btns.forEach(function (btn) {
	btn.addEventListener("click", function (e) {
		const currentOperation = e.currentTarget.classList;
		if (currentOperation.contains("decrease"))
			count--;
		else if (currentOperation.contains("increase"))
			count++;
		else
			count = 0;
		if (count > 0)
			value.style.color = "green";
		else if (count < 0)
			value.style.color = "red";
		else
			value.style.color = "black";
		if (count % 15 === 0 && count !== 0 && count < 0)
			alert("Your broke, your fucking poor!");
		value.textContent = count;
		localStorage.setItem("count", count);
		localStorage.setItem("color", value.style.color);
	});
});
