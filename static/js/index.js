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
                <td><input type="checkbox" checked="true"></td>
                <td class="text-left text-faded">${tasks[i].taskText} (done)</td>
                <td><button class="btn-blue">Edit</button></td>
                <td><button id="remove-${i}" class="btn-red" onClick="removeTask(this.id.split('-')[1])">Remove</button></td>
            `
        } else {
            task.innerHTML = `
                <td><input type="checkbox"></td>
                <td class="text-left">${tasks[i].taskText}</td>
                <td><button class="btn-blue">Edit</button></td>
                <td><button id="remove-${i}" class="btn-red" onClick="removeTask(this.id.split('-')[1])">Remove</button></td>
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
removeTask = (taskId) => {
    tasks.splice(taskId, 1);
    showTasks();
}

showTasks();
