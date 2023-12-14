//add new person
//delete person
//textbox should not be stretched over article


let reviews = JSON.parse(localStorage.getItem('reviews')) || [
	{
	  id: 1,
	  name: 'Sara Jones',
	  job: 'web developer',
	  img: 'https://www.course-api.com/images/people/person-1.jpeg',
	  text: "Sara Jones is a skilled web developer who brings innovation and precision to the digital realm. With a knack for coding and a passion for creating seamless online experiences, Sara is adept at turning ideas into functional and visually appealing websites. Her commitment to staying current with the latest technologies ensures that she delivers cutting-edge solutions, making Sara a valuable asset in the fast-paced world of web development.",
	},
	{
	  id: 2,
	  name: 'Anna Johnson',
	  job: 'web designer',
	  img: 'https://www.course-api.com/images/people/person-2.jpeg',
	  text: 'Anna Johnson is a talented web designer whose creative flair and technical expertise converge to craft visually stunning and user-friendly online experiences. With a keen eye for design aesthetics and a deep understanding of the latest web development trends, Anna seamlessly transforms concepts into captivating websites. Her passion for staying ahead in the dynamic world of digital design ensures that she brings innovative solutions to every project. Anna\'s dedication to delivering top-notch web designs makes her a valuable asset in the ever-evolving landscape of online presence.',
	},
	{
	  id: 3,
	  name: 'Peter Jones',
	  job: 'intern',
	  img: 'https://www.course-api.com/images/people/person-4.jpeg',
	  text: 'Peter Jones, a dynamic intern, is eager to contribute his fresh perspective and enthusiasm to the team. As he navigates the realms of his job, Peter\'s commitment and eagerness make him a promising addition to any project.',
	},
	{
	  id: 4,
	  name: 'Bill Anderson',
	  job: 'the boss',
	  img: 'https://www.course-api.com/images/people/person-3.jpeg',
	  text: 'He is the boss',
	},
];

const img = document.getElementById('person-img');
const author = document.getElementById('author');
const job = document.getElementById('job');
const info = document.getElementById('info');

const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const randomBtn = document.querySelector('.random-btn');
const addPersonBtn = document.querySelector('.add-person-btn');
const submitBtn = document.querySelector('.submit');

let currentPerson = 0;

window.addEventListener('DOMContentLoaded', function() {
	showPerson();
});

function showPerson() {
	const person = reviews[currentPerson];
	img.src = person.img;
	author.textContent = person.name;
	job.textContent = person.job;
	info.textContent = person.text;
}

prevBtn.addEventListener('click', function() {
	if (--currentPerson < 0)
		currentPerson = reviews.length - 1;
	showPerson();
});

nextBtn.addEventListener('click', function() {
	if (++currentPerson > reviews.length - 1)
		currentPerson = 0;
	showPerson();
});

randomBtn.addEventListener('click', function() {
	currentPerson = Math.floor(Math.random() * reviews.length);
	showPerson();
});


addPersonBtn.addEventListener('click', function(e) {
	window.location.href = 'addPerson.html'; 

	window.location.href = 'addPerson.html'; 

	const name = document.getElementById('author').value;
	const job = document.getElementById('profession').value;
	const img = document.getElementById('img').value;
	const text = document.getElementById('info').value;
  
	const newPerson = {
	  id: reviews.length + 1, // Generate a unique id
	  name: name,
	  job: job,
	  img: img,
	  text: text,
	};
	reviews.push(newPerson);
  
	// Save the updated reviews array to local storage
	localStorage.setItem('reviews', JSON.stringify(reviews));
	console.log(newPerson);
	window.location.href = 'index.html';
});

// submitBtn.addEventListener('click', function(event) {
//   event.preventDefault(); // Prevent the default form submission behavior

//   window.location.href = 'addPerson.html'; 

//   const name = document.getElementById('author').value;
//   const job = document.getElementById('profession').value;
//   const img = document.getElementById('img').value;
//   const text = document.getElementById('info').value;

//   const newPerson = {
//     id: reviews.length + 1, // Generate a unique id
//     name: name,
//     job: job,
//     img: img,
//     text: text,
//   };
//   reviews.push(newPerson);

//   // Save the updated reviews array to local storage
//   localStorage.setItem('reviews', JSON.stringify(reviews));
//   console.log(newPerson);
//   window.location.href = 'index.html';
// });
