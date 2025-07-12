let inputEl = document.querySelector(".input-el");
let taskList = document.getElementById("task-list");
let completedEl = document.getElementById("complete-el");
let uncompletedEl = document.getElementById("ulcomplete-el");

let tasks = [];

function AddItem() {
    let value = inputEl.value.trim();
    if (value === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        text: value,
        completed: false
    };

    tasks.push(task);
    inputEl.value = "";
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = ""; // Clear list

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        // Task Text
        const span = document.createElement("span");
        span.textContent = task.text;
        if (task.completed) {
            span.classList.add("completed-task");
        }

        span.addEventListener("click", () => {
            task.completed = !task.completed;
            renderTasks();
        });

        // Delete Button
        const delBtn = document.createElement("div");
        delBtn.textContent = "Delete";
        delBtn.className = "delete";
        delBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            renderTasks();
        });

        // Edit Button
        const editBtn = document.createElement("div");
        editBtn.textContent = "Edit";
        editBtn.className = "edit";
        editBtn.addEventListener("click", () => {
            const newText = prompt("Edit your task:", task.text);
            if (newText !== null && newText.trim() !== "") {
                task.text = newText.trim();
                renderTasks();
            }
        });

        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    });

    updateCounts();
}

function updateCounts() {
    const completedCount = tasks.filter(task => task.completed).length;
    const uncompletedCount = tasks.length - completedCount;

    completedEl.textContent = completedCount;
    uncompletedEl.textContent = uncompletedCount;
}
