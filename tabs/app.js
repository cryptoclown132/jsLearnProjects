const btns = document.querySelectorAll('.tab-btn');
const about = document.querySelector('.about');
const articles = document.querySelectorAll('.content');

about.addEventListener('click', function(e){
	const id = e.target.dataset.id;

	if (id) {
		removeBtnActive();
		addBtnActive(e);
		removeArticleActive();
		addArticleActive(id);
	}
});

function addBtnActive(e){
	e.target.classList.add('active');
}

function addArticleActive(id){
	const element = document.getElementById(id);
	element.classList.add('active');
}

function removeBtnActive(){
	btns.forEach(function(btn){
		btn.classList.remove('active');
	});
}

function removeArticleActive(){
	articles.forEach(function(article){
		article.classList.remove('active');
	});
}
