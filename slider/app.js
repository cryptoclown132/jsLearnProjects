const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.nextBtn');
const prevBtn = document.querySelector('.prevBtn');

slides.forEach( (slide, index) => {
	slide.style.left = `${index * 100}%`;
});

let counter = 0;

nextBtn.addEventListener('click', () => {
	counter++;
	carousel();
});

prevBtn.addEventListener('click', () => {
	counter--;
	carousel();
});

function carousel() {
	nextBtn.style.display = getNextBtn();
	prevBtn.style.display = getPrevBtn();
	slides.forEach( slide => {
		slide.style.transform = `translateX(-${counter * 100}%)`;
	});
}

// function carousel() {
// 	if (counter === slides.length)
// 		counter = 0;
// 	if (counter < 0)
// 		counter = slides.length - 1;
// 	slides.forEach( slide => {
// 		slide.style.transform = `translateX(-${counter * 100}%)`;
// 	});
// }

function getNextBtn() {
	if (counter < slides.length - 1)
		return 'block';
	return 'none';
}

function getPrevBtn() {
	if (counter > 0)
		return 'block';
	return 'none';
}

prevBtn.style.display = getPrevBtn();
