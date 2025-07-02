const taskinput = document.getElementById('task-input')
const tasklist = document.getElementById('tasklist')
const addtask = document.getElementById('addtask')
const allbtn = document.getElementById('all')
const activebtn = document.getElementById('active')
const completedbtn = document.getElementById('completed')

let task = JSON.parse(localStorage.getItem('task')) || []
console.log(task)

// show all tasks
function showTasks() {
    tasklist.innerHTML = "";
    for (let i = 0; i < task.length; i++) {
        const li = document.createElement('li');
        li.textContent = task[i].text;
        if (task[i].completed) li.classList.add("checked");

        const span = document.createElement('span');
        span.innerHTML = "\u274c";
        li.appendChild(span);

        tasklist.appendChild(li);
    }
}

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem('task', JSON.stringify(task));
}

// Add task
addtask.addEventListener("click", () => {
    event.preventDefault()
    if (taskinput.value === "") {
        alert("You must write something")
        return
    }
    task.push({ text: taskinput.value, completed: false })
    taskinput.value = ""
    saveTasks()
    showTasks()
})

//complete or checked
tasklist.addEventListener("click", (e) => {
    const items = document.querySelectorAll('#tasklist li')
    const index = Array.from(items).indexOf(e.target.closest('li'))

    if (e.target.tagName === "LI") {
        task[index].completed = !task[index].completed
    } else if (e.target.tagName === "SPAN") {
        task.splice(index, 1)
    }
    saveTasks()
    showTasks()
})

// Display all task
allbtn.addEventListener("click", () => {
    const task = document.getElementsByTagName('li')
    for (let i = 0; i < task.length; i++) {
        task[i].style.display = "list-item"
    }
})

// Display active task
activebtn.addEventListener("click", () => {
    const task = document.getElementsByTagName('li')
    for (let i = 0; i < task.length; i++) {
        if (task[i].classList.contains("checked")) {
            task[i].style.display = "none";
        } else {
            task[i].style.display = "list-item";
        }
    }
})

//Display completed task
completedbtn.addEventListener("click", () => {
    const task = document.getElementsByTagName('li')
    for (let i = 0; i < task.length; i++) {
        if (task[i].classList.contains("checked")) {
            task[i].style.display = "list-item";
        } else {
            task[i].style.display = "none";
        }
    }
})

showTasks()