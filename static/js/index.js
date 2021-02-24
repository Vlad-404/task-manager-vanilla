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
                <td><button class="btn-red">Remove</button></td>
            `
        } else {
            task.innerHTML = `
                <td><input type="checkbox"></td>
                <td class="text-left">${tasks[i].taskText}</td>
                <td><button class="btn-blue">Edit</button></td>
                <td><button class="btn-red">Remove</button></td>
            `
        }
    }
    // console.log(tasksTable);
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
        showTasks();
    }
}

const addBtn = document.getElementById('add-task-btn');
addBtn.addEventListener('click', addTask);

showTasks();
