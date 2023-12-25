
window.addEventListener('load', initalize);

function initalize() {
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const list_el = document.querySelector("#tasks");
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    storedTasks.forEach(task => createTaskElement(task, list_el));
    form.addEventListener('submit', (e) => updateTaskElementList(e, input, list_el));
}

function updateTaskElementList(e, input, list_el) {
    e.preventDefault();
    const task = input.value;

    if (!task) {
        alert('Please enter a task');
        return;
    }
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    createTaskElement(task, list_el);
    input.value = '';
}

function createTaskElement(task, list_el) {
	const task_el = document.createElement('div');
	task_el.classList.add('task');
	const task_input_el = createTaskInputElement(task);
	const task_content_el = createTaskContentElement(task);
	const task_actions_el = createTaskActionButtons();
	task_content_el.appendChild(task_input_el);
	task_el.appendChild(task_content_el);
	task_el.appendChild(task_actions_el);
	list_el.appendChild(task_el);
	callActionButtons(task_actions_el, task, task_el, list_el, task_input_el);
}

function	callActionButtons(task_actions_el, task, task_el, list_el, task_input_el) {
	const task_edit_el = task_actions_el.querySelector('.edit');
	task_edit_el.addEventListener('click', (e) => {
		task = editTaskElement(task, task_edit_el, task_input_el);
	});
	const task_delete_el = task_actions_el.querySelector('.delete');
	task_delete_el.addEventListener('click', (e) => {
		deleteTaskElement(task, task_el, list_el);
	});
}

function editTaskElement(task, task_edit_el, task_input_el) {
	if (task_edit_el.innerText.toLowerCase() == 'edit') {
		task_edit_el.innerText = 'Save';
		task_input_el.removeAttribute('readonly');
		task_input_el.focus();
	}
	else {
		const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
		const index = tasks.indexOf(task);
		if (index !== -1) {
			tasks[index] = task_input_el.value;
			localStorage.setItem('tasks', JSON.stringify(tasks));
		}
		task_input_el.setAttribute('readonly', 'readonly');
		task_edit_el.innerText = 'Edit';
		task = task_input_el.value;
	}
	return task;
}

function deleteTaskElement(task, task_el, list_el) {
	const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	const updatedTasks = tasks.filter(t => t !== task);
	localStorage.setItem('tasks', JSON.stringify(updatedTasks));
	list_el.removeChild(task_el);
}

function	createTaskContentElement(task) {
	const task_content_el = document.createElement('div');
    task_content_el.classList.add('content');
	return task_content_el;
}

function	createTaskInputElement(task) {
	const task_input_el = document.createElement('input');
    task_input_el.classList.add('text');
    task_input_el.type = 'text';
    task_input_el.value = task;
    task_input_el.setAttribute('readonly', 'readonly');
	return task_input_el;
}

function	createTaskActionButtons() {
	const task_actions_el = document.createElement('div');
    task_actions_el.classList.add('actions');
	const task_edit_el = createEditButton();
    const task_delete_el = createDeleteButton();
    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);
	return task_actions_el;
}

function createEditButton() {
    const task_edit_el = document.createElement('button');
    task_edit_el.classList.add('edit');
    task_edit_el.innerText = 'Edit';
    return task_edit_el;
}

function createDeleteButton() {
    const task_delete_el = document.createElement('button');
    task_delete_el.classList.add('delete');
    task_delete_el.innerText = 'Delete';
    return task_delete_el;
}
