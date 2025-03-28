document.addEventListener("DOMContentLoaded", () => {
    const inputBox = document.getElementById("input-box");
    const listContainer = document.getElementById("list-container");
    const addButton = document.getElementById("add-btn");

    // Load tasks from localStorage
    function loadTasks() {
        listContainer.innerHTML = localStorage.getItem("tasks") || "";
        attachEventListeners();
    }

    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem("tasks", listContainer.innerHTML);
    }

    // Add new task
    function addTask() {
        let taskText = inputBox.value.trim();
        if (!taskText) {
            alert("You must write something!");
            return;
        }

        // Prevent duplicate tasks
        if ([...listContainer.children].some(li => li.textContent.slice(0, -1) === taskText)) {
            alert("Task already exists!");
            inputBox.value = "";
            return;
        }

        // Create list item
        const li = document.createElement("li");
        li.textContent = taskText;

        // Create delete button
        const span = document.createElement("span");
        span.innerHTML = "\u00d7"; // '×' symbol for delete
        li.appendChild(span);

        // Append to list
        listContainer.appendChild(li);

        // Clear input
        inputBox.value = "";

        // Save tasks & attach event listeners
        saveTasks();
        attachEventListeners();
    }

    // Attach event listeners to all list items
    function attachEventListeners() {
        document.querySelectorAll("#list-container li").forEach(li => {
            li.onclick = () => {
                li.classList.toggle("checked");
                saveTasks();
            };
        });

        document.querySelectorAll("#list-container li span").forEach(span => {
            span.onclick = (e) => {
                e.stopPropagation();
                span.parentElement.remove();
                saveTasks();
            };
        });
    }

    // Add event listener for button click
    addButton.addEventListener("click", addTask);

    // Add event listener for pressing "Enter"
    inputBox.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Load saved tasks on page load
    loadTasks();
});
