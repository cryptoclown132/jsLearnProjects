const btn= document.querySelector('.switch-btn');
const video= document.querySelector('.video-container');
const preloader= document.querySelector('.preloader');

btn.addEventListener('click', function() {
	if (!btn.classList.contains('slide'))
		pauseVideo();
	else
		playVideo();
});

function pauseVideo() {
	btn.classList.add('slide');
	video.pause();
}

function playVideo() {
	btn.classList.remove('slide');
	video.play();
}

window.addEventListener('load', function() {
	preloader.classList.add('hide-preloader');
});
