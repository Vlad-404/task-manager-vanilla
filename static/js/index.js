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

showTasks = () => {
    tasksTable.innerHTML = '';
    tasksTable.classList.add('mb-4');

    for ( let i=0; i < tasks.length; i++) {
        var task = tasksTable.insertRow(i)
        task.id = 'task-' + i
        task.innerHTML = `
            <td><input type="checkbox"></td>
            <td class="text-left">${tasks[i].taskText}</td>
            <td><button class="btn-blue">Edit</button></td>
            <td><button class="btn-red">Remove</button></td>
        `
    }
    // console.log(tasksTable);
}

const refreshBtn = document.getElementById('refresh');
refreshBtn.addEventListener('click', showTasks);

showTasks();
