const tasksTable = document.getElementById('tasks-table');

let taskList = [
    // {
    //     taskText: 'First Task',
    //     completed: true
    // },
    // {
    //     taskText: 'Second Task',
    //     completed: false
    // },
    // {
    //     taskText: 'Third Task',
    //     completed: false
    // }
]

// Stores the tasks in browsers local storage
// saveList = () => {
//     if (localStorage.getItem('allTasks')) {
//         localStorage.setItem('allTasks', '[]');
//     }
// }
// Gets the stored tasks
// let tasks = JSON.parse(localStorage.getItem('myTasks') || '[]');

// Renders the tasks in HTML
showTasks = () => {
    tasksTable.innerHTML = '';
    tasksTable.classList.add('mb-4');
    let tasks = JSON.parse(localStorage.getItem('myTasks'));

    if (localStorage.getItem('myTasks') == null) {
        localStorage.setItem('myTasks', '[]');
    } else {
        for (let i=0; i < tasks.length; i++) {
            var task = tasksTable.insertRow(i)
            task.id = 'task-' + i

            if (tasks[i].completed == true) {
                task.innerHTML = `
                    <td><input type="checkbox" checked="true" id="check-${i}" onClick="toggle(this)"></td>
                    <td id="text-${i}" class="text-left text-faded">${tasks[i].taskText} (done)</td>
                    <td>
                        <button id="edit-${i}" class="btn-blue edit-btn">Edit</button>
                        <button id="cancel-${i}" class="btn-grey mx-1 hide">Cancel</button>
                        <button id="updatebtn-${i}" class="btn-blue mx-1 hide">Update</button>
                    </td>
                    <td><button id="remove-${i}" class="btn-red" onClick="removeTask(this)">Remove</button></td>
                `
            } else {
                task.innerHTML = `
                    <td><input type="checkbox" id="check-${i}" onClick="toggle(this)"></td>
                    <td id="text-${i}" class="text-left">${tasks[i].taskText}</td>
                    <td>
                        <button id="edit-${i}" class="btn-blue edit-btn">Edit</button>
                        <button id="cancel-${i}" class="btn-grey mx-1 hide">Cancel</button>
                        <button id="updatebtn-${i}" class="btn-blue mx-1 hide">Update</button>
                    </td>
                    <td><button id="remove-${i}" class="btn-red" onClick="removeTask(this)">Remove</button></td>
                `
            }
        }
    }
    editTask();
}

const refreshBtn = document.getElementById('refresh');
refreshBtn.addEventListener('click', showTasks);

// Saves the Task
let taskInput = document.getElementById('add-task');
// let newTask = taskInput.value;

saveTask = () => {
    // Gets the tasks from localStorage and creates an array of them
    let tasks = JSON.parse(localStorage.getItem('myTasks'));
    tasks.push(
        {
            taskText: taskInput.value,
            completed: false
        }
    )
    taskInput.value = '';   // this one just empties the input field in HTML
    // Updates the task list in localStorage
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    // Renders the task in HTML - this works fine
    showTasks();
}

// Adds the task
addTask = () => {
    // Creates local storage variable if none present
    if (localStorage.getItem('myTasks') == null) {
        localStorage.setItem('myTasks', '[]');
    }

    // Gets the task name and pushes it into local storage
    if (taskInput.value == '') {
        alert('Please enter a name for your task!')
    } else {
        saveTask();
    }
}

const addBtn = document.getElementById('add-task-btn');
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keyup', (e) => {
    e.preventDefault();
     
    if (e.code == 'Enter') {
        if (taskInput.value == '') {
            alert('Please enter a name for your task!')
        } else {
            saveTask();
        }
    } else if (e.code == 'Escape') {
        taskInput.value = '';
    }
})

// Removes all tasks
removeAll = () => {
    tasks = [];
    showTasks();
}

const removeAllBtn = document.getElementById('remove-all');
removeAllBtn.addEventListener('click', removeAll);

// Removes a single task
removeTask = (grabbed) => {
    let taskId = grabbed.id.split('-')[1];
    tasks.splice(taskId, 1);
    showTasks();
}

// Toggle Task
toggle = (grabbed) => {
    let taskId = grabbed.id.split('-')[1];
    let oldStatus = tasks[taskId].completed;
    tasks[taskId].completed = !oldStatus;
    showTasks();
}

// Toggle all tasks
toggleAll = () => {
    for (let i=0; i<tasks.length; i++) {
        if (tasks[i].completed == true) {
            tasks[i].completed = false;
        } else {
            tasks[i].completed = true;
        }
    }

    showTasks();
}

const toggleAllButton = document.getElementById('toggle-all');
toggleAllButton.addEventListener('click', toggleAll);

// Toggle all as finished/unfinished
allToOneStatus = () => {
    for (let i=0; i<tasks.length; i++) {
        let tasksLength = Number(tasks.length - 1);
        if (tasks[tasksLength].completed == true) {
            tasks[i].completed = false;
        } else {
            tasks[i].completed = true;
        }
    }

    showTasks();
}

const allToOne = document.getElementById('all-to-one-status');
allToOne.addEventListener('click', allToOneStatus);

// Edit task:
// Accept input
editTask = () => {
    let allEditButtons = Array.from(document.getElementsByClassName('edit-btn'));
    allEditButtons.forEach(button => {
        button.addEventListener('click', () => {
            allEditButtons.forEach(b => {
                b.classList.toggle('hide');
            })
            let taskId = button.id.split('-')[1];
            let inputId = 'text-' + taskId;
            let editTaskInput = document.getElementById(inputId);
            let cancelButton = document.getElementById(`cancel-${taskId}`);
            let updateTaskButton = document.getElementById(`updatebtn-${taskId}`);
            cancelButton.classList.toggle('hide');
            updateTaskButton.classList.toggle('hide');


            editTaskInput.innerHTML = `
                <input id="edit-input" type="text" placeholder="Edit Task" value="${tasks[taskId].taskText}">
            `;

            cancelButton.addEventListener('click', () => {
                showTasks();
            })

            let newText = document.getElementById('edit-input');
            updateTaskButton.addEventListener('click', () => {
                if (newText.value == '') {
                    alert('New Task name cannot be empty!')
                } else if (newText.value == tasks[taskId].taskText) {
                    showTasks();
                } else {
                    updateTask(taskId, newText.value);
                }
            })

            newText.addEventListener('keyup', (e) => {
                e.preventDefault();

                if (e.code == 'Enter') {
                    if (newText.value == '') {
                        alert('New Task name cannot be empty!')
                    } else if (newText.value == tasks[taskId].taskText) {
                        showTasks();
                    } else {
                        updateTask(taskId, newText.value);
                    }
                } else if (e.code == 'Escape') {
                    showTasks();
                }
            })
        })
    });
}

// Update Task
updateTask = (id, newText) => {
    if (newText == tasks[id].taskText) {
        return
    } else {
        tasks[id].taskText = newText;
        tasks[id].completed = false;
        showTasks();
    }
}

// Changes the Task manager title
// Toggles the visibility for change title input field and buttons
toggleTitleToolsVisibility =  () => {
    document.getElementById('edit-title-div').classList.toggle('hide');
    document.getElementById('change-title-link').classList.toggle('hide');
}

let changeTitleLink = document.getElementById('change-title-link');
changeTitleLink.style.cursor = "pointer"
changeTitleLink.addEventListener('click', toggleTitleToolsVisibility);


let titleInput = document.getElementById('title-input');

// Adds functionality to cancel and change buttons
document.getElementById('title-cancel').addEventListener('click', () => {
    titleInput.value = '';
    toggleTitleToolsVisibility();
})

document.getElementById('title-update').addEventListener('click', () => {
    if (titleInput.value == '') {
        alert('Please enter a new name for your list or click cancel')
    } else {
        updateTitle(titleInput.value);
    }
})

// Ads escape and enter key events for title input field
titleInput.addEventListener('keyup', (e) => {
    e.preventDefault();
     
    if (e.code == 'Enter') {
        if (titleInput.value == '') {
            alert('Please enter a new name for your list or click cancel')
        } else {
            updateTitle(titleInput.value);
        }
    } else if (e.code == 'Escape') {
        toggleTitleToolsVisibility();
    }
})

// Updates task list title
updateTitle = (newTitle) => {
    document.getElementById('list-title').innerText = newTitle;
    titleInput.value = '';
    toggleTitleToolsVisibility();
}

editTask();
showTasks();

// var elements=document.getElementById('tasks-table').firstChild;
// let secondChild = elements.[2];
// console.log(secondChild);
// elements.item(n)

// var tables = document.getElementsByTagName('table');
// var firstTable = tables.item(1);
// console.log(firstTable);