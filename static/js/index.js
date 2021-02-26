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
                <td><button id="edit-${i}" class="btn-blue edit-btn" onClick="editTask(this)">Edit</button></td>
                <td><button id="remove-${i}" class="btn-red" onClick="removeTask(this)">Remove</button></td>
            `
        } else {
            task.innerHTML = `
                <td><input type="checkbox" id="check-${i}" onClick="toggle(this)"></td>
                <td id="text-${i}" class="text-left">${tasks[i].taskText}</td>
                <td><button id="edit-${i}" class="btn-blue edit-btn" onClick="editTask(this)">Edit</button></td>
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

        if (event.keyCode == 13) {
            updateTask(taskId, newText.value);
        }
    })

    let updateButton = document.createElement('button');
    
    updateButton.innerText = 'Update';
    updateButton.classList.add('btn-blue', 'mx-1');
    updateButton.id = 'update-btn';
    cancel.after(updateButton);
    // console.log(updateButton);
    updateButton.addEventListener('click', updateTask(taskId, newText.value));
}
//updateTask(taskId, newText.value)

// Update Task
updateTask = (id, newText) => {
    console.log(id, newText);
    if (newText == tasks[id].taskText) {
        return
    } else {
        tasks[id].taskText = newText;
        showTasks();
    }
}

// Changes the Task manager title


showTasks();

// var elements=document.getElementById('tasks-table').firstChild;
// let secondChild = elements.[2];
// console.log(secondChild);
// elements.item(n)

// var tables = document.getElementsByTagName('table');
// var firstTable = tables.item(1);
// console.log(firstTable);