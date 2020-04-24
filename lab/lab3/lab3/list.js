/* Todo js */

'use strict';

// Let's get the elements we need to add tasks
const taskForm = document.querySelector('#taskForm')
const tasks = document.querySelector('#tasks')

taskForm.addEventListener('submit', addTask)

function addTask(e) {
	
	e.preventDefault(); // prevent default form action

	console.log('Adding a task')

	// get data from form
	const taskName = document.querySelector('#tName').value

	console.log(taskName)

	// create the DOM elements
	const tableRow = document.createElement('tr')
	const taskLabel = document.createElement('td')
	const taskText = document.createTextNode(taskName)

	taskLabel.appendChild(taskText)
	tableRow.appendChild(taskLabel)

	const buttons = document.createElement('td')

	const editButton = document.createElement('button')
	editButton.className = 'edit'
	editButton.appendChild(document.createTextNode('edit'))
	buttons.appendChild(editButton)

	const removeButton = document.createElement('button')
	removeButton.className = 'done'
	removeButton.appendChild(document.createTextNode('done'))
	buttons.appendChild(removeButton)

	tableRow.appendChild(buttons)

	tasks.appendChild(tableRow)

}

tasks.addEventListener('click', modifyTask)

function modifyTask(e) {
	if (e.target.classList.contains('done')) {
		console.log('done')
		// remove the task
		const taskToRemove = e.target.parentElement.parentElement
		
		tasks.removeChild(taskToRemove)
	} else if (e.target.classList.contains('edit')) {
		console.log('edit')
		
		if (e.target.innerText === 'edit') {
			addTaskTextBox(e.target.parentElement.parentElement)
			// change the button text to 'save'
			e.target.innerText = 'save'
		} else {
			removeTaskTextBox(e.target.parentElement.parentElement)
			// change the button text to 'edit'
			e.target.innerText = 'edit'
		}
    }
    if (e.target.classList.contains('down')) {
		console.log('down')
		// remove the task
        const taskToMove = e.target.parentElement.parentElement
        tasks.removeChild(taskToMove);
		tasks.appendChild(taskToMove);
	}
}

function addTaskTextBox(task) {
	const textBox = document.createElement('input')
	textBox.type = 'text'
	const taskText = task.firstElementChild
	console.log(taskText)
	textBox.value = taskText.innerText
	taskText.before(textBox)
	task.removeChild(taskText)
}

function removeTaskTextBox(task) {
	const taskLabel = document.createElement('td')
	const textBox = task.firstElementChild
	console.log(textBox)
	const taskText = document.createTextNode(textBox.value)
	taskLabel.appendChild(taskText)
	textBox.before(taskLabel)
	task.removeChild(textBox)
}
