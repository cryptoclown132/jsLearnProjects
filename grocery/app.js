const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

let editElement;
let editFlag = false;
let editID = "";

window.addEventListener('DOMContentLoaded', setupItems);

form.addEventListener('submit', handleItem)

clearBtn.addEventListener('click', clearGroceryList);

function setupItems() {
	let items = getLocalStorage();
	
	if (items.length > 0) {
		items.forEach( item => {
			createListItem(item.id, item.value);
		});
		container.classList.add('show-container');
	}
}

function handleItem(e) {
	e.preventDefault();
	const value = grocery.value;
	const id = new Date().getTime().toString();
	
	if (value && !editFlag)
		addNewItem(id, value);
	else if (value && editFlag)
		editListItem(id, value);
	else
		displayAlert('please enter value', 'danger');
}

function addNewItem(id, value) {
	createListItem(id, value);
	addListItem(id, value);
}

function createListItem(id, value) {
	const element = createGroceryItem(id, value);
	const deleteBtn = element.querySelector('.delete-btn');
	const editBtn = element.querySelector('.edit-btn');
	
	deleteBtn.addEventListener('click', deleteItem);
	editBtn.addEventListener('click', editItem);
	list.appendChild(element);
}

function addListItem(id, value) {
	displayAlert('item added to the list', 'success');
	container.classList.add('show-container');
	addToLocalStorage(id, value);
	setBacktoDefault();
}

function editListItem(id, value) {
	editElement.innerHTML = value;
	displayAlert('value changed', 'success');
	editLocalStorage(editID, value);
	setBacktoDefault();
}

function createGroceryItem(id, value) {
	const element = document.createElement('article');
	const attr = document.createAttribute('data-id');
		
	element.classList.add('grocery-item');
	attr.value = id;
	element.setAttributeNode(attr);
	element.innerHTML = `<p class="title">${value}</p><divclass="btn-container">
	<button type="button" class="edit-btn"><i class="fas fa-edit"></i></button>
	<button type="button" class="delete-btn">
	<i class="fas fa-trash"></i></button></div>`;	
	return element;
}

function deleteItem(e) {
	const element = e.currentTarget.parentElement.parentElement;
	const id = element.dataset.id;
	
	list.removeChild(element);
	if (list.children.length === 0)
		container.classList.remove('show-container');
	displayAlert('item removed', 'danger');
	setBacktoDefault();
	removeFromLocalStorage(id);
}

function editItem(e) {
	const element = e.currentTarget.parentElement.parentElement;

	editElement = e.currentTarget.parentElement.previousElementSibling;
	grocery.value = editElement.innerHTML;
	editFlag = true;
	editID = element.dataset.id;
	submitBtn.textContent = 'edit';
}

function clearGroceryList() {
	const groceryItems = document.querySelectorAll('.grocery-item');

	if (groceryItems.length > 0) {
		groceryItems.forEach( item => {
			list.removeChild(item);
		});
	}
	container.classList.remove("show-container");
	displayAlert('empty list', 'danger');
	setBacktoDefault();
	localStorage.removeItem('list');
}

function addToLocalStorage(id, value) {
	const groceryItem = {id, value};
	let items = getLocalStorage();

	items.push(groceryItem);
	localStorage.setItem('list', JSON.stringify(items));
}

function removeFromLocalStorage(id) {
	let items = getLocalStorage();

	items = items.filter( item => {
		if (item.id !== id)
			return item;
	});
	localStorage.setItem('list', JSON.stringify(items));
}	

function editLocalStorage(id, value) {
	let items = getLocalStorage();

	items = items.map( item => {
		if (item.id === id)
			item.value = value;
		return item;
	});
	localStorage.setItem('list', JSON.stringify(items));
}

function getLocalStorage() {
	if (localStorage.getItem('list'))
		return JSON.parse(localStorage.getItem('list'));
	return [];
}

function setBacktoDefault() {
	grocery.value = '';
	editFlag = false;
	editID = '';
	submitBtn.textContent = 'submit';
}

function displayAlert(text, action) {
	alert.textContent = text;
	alert.classList.add(`alert-${action}`);
	setTimeout(function() {
		alert.textContent = '';
		alert.classList.remove(`alert-${action}`);
	}, 1000)
}
