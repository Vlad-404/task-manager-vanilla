const tasksTable = document.getElementById('tasks-table');

let tasks = [
    {
        taskText: 'First Task',
        completed: true
    },
    {
        taskText: 'Second Task',
        completed: false
    },
    {
        taskText: 'Third Task',
        completed: false
    }
]

// Renders the tasks in HTML
showTasks = () => {
    tasksTable.innerHTML = '';
    tasksTable.classList.add('mb-4');

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

const refreshBtn = document.getElementById('refresh');
refreshBtn.addEventListener('click', showTasks);

// Adds the task
addTask = () => {
    let taskInput = document.getElementById('add-task');
    let newTask = taskInput.value;

    if (newTask == '') {
        alert('Please enter a name for your task!')
    } else {
        tasks.push(
            {
                taskText: newTask,
                completed: false
            }
        )
        taskInput.value = '';
        showTasks();
    }
}

const addBtn = document.getElementById('add-task-btn');
addBtn.addEventListener('click', addTask);

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
editTask = (grabbed) => {
    let taskId = grabbed.id.split('-')[1];
    grabbed.onclick = function() {
        return false;
      }
    let inputId = 'text-' + taskId;
    let editTaskInput = document.getElementById(inputId);

    editTaskInput.innerHTML = `
            <input id="edit-input" type="text" placeholder="Edit Task" value="${tasks[taskId].taskText}">
        `;

    grabbed.innerText = 'Cancel';
    grabbed.className = 'btn-grey';
    grabbed.id = 'cancel';
    let cancel = document.getElementById('cancel');
    cancel.addEventListener('click', showTasks);

    let disabledButtons = Array.from(document.getElementsByClassName('edit-btn'));    
    disabledButtons.forEach(button => {
        button.disabled = true;
    });
    
    let newText = document.getElementById('edit-input');
    editTaskInput.addEventListener('keypress', (event) => {
        event.defaultPrevented;

        if (event.code == 'Enter') {
            updateTask(taskId, newText.value);
        }
    })

    let updateButton = document.createElement('button');
    
    updateButton.innerText = 'Update';
    updateButton.classList.add('btn-blue', 'mx-1');
    updateButton.id = 'update-btn';
    cancel.after(updateButton);
    updateButton.addEventListener('click', updateTask(taskId, newText.value));
}

// Update Task
updateTask = (id, newText) => {
    if (newText == tasks[id].taskText) {
        return
    } else {
        tasks[id].taskText = newText;
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
    let oldTitle = document.getElementById('list-title');
     
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



showTasks();

for (let i=0; i<tasks.length; i++) {
    let allEditButtons = Array.from(document.getElementsByClassName('edit-btn'));
    // let cancelButton = document.getElementById(`cancel-${[i]}`);
    // console.log(cancelButton);
    allEditButtons.forEach(button => {
        button.addEventListener('click', () => {
            allEditButtons.forEach(b => {
                b.disabled = true;
            })
            let taskId = button.id.split('-')[1];
            let inputId = 'text-' + taskId;
            let editTaskInput = document.getElementById(inputId);
            let cancelButton = document.getElementById(`cancel-${taskId}`);
            let updateTaskButton = document.getElementById(`updatebtn-${taskId}`);
            button.classList.toggle('hide');
            cancelButton.classList.toggle('hide');
            updateTaskButton.classList.toggle('hide');


            editTaskInput.innerHTML = `
            <input id="edit-input" type="text" placeholder="Edit Task" value="${tasks[taskId].taskText}">
            `;

            cancelButton.addEventListener('click', () => {
                allEditButtons.forEach(b => {
                    b.disabled = false;
                })
                showTasks();
            })

            let newText = document.getElementById('edit-input');
            updateTaskButton.addEventListener('click', () => {
                if (newText.value == '') {
                    alert('New Task name cannot be empty!')
                } else if (newText.value == tasks[i].taskText) {
                    showTasks();
                } else {
                    updateTask(taskId, newText.value);
                }
            })

            newText.addEventListener('keyup', (e) => {
                e.preventDefault();
                console.log('Event: ' + e.code, 'Input field: ' + newText.value, 'Value from tasks: ' + tasks[taskId].taskText);

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

            // console.log(cancelButton);
        })
    });
}

// for (let i=0; i<4; i++) {
//     let allTestButtons = Array.from(document.getElementsByClassName('test-button'));
//     allTestButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             console.log(button.innerText);
//         })
//     });
// }

// allButtons.forEach(button => {
//     button.disabled = true;
// });

// var elements=document.getElementById('tasks-table').firstChild;
// let secondChild = elements.[2];
// console.log(secondChild);
// elements.item(n)

// var tables = document.getElementsByTagName('table');
// var firstTable = tables.item(1);
// console.log(firstTable);