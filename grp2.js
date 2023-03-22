// localStorage global object that can store data on local machine
// has limit of 5mb: is a key-value storage system
/* methods include: localStorage.setItem()- sets new key value pair
localStorage.getItem()- gets value of key
localStorage.removeItem()- removes kety value pair
localStorage.claer()- clears all the key value pairs
*/


// On app load, get all tasks from localStorage and pop an alert
window.onload = loadTasks;
window.onload(alert("Welcome to your TO-DO LIST app!"));
// On form submit add task, ie clicking add button
document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
  addTask();
});
// fuction to load already present tasks ie already on the list
function loadTasks() {
  // check if localStorage has any tasks
  // if not then return an empty list
  if (localStorage.getItem("tasks") == null) return;

  // Get the tasks from localStorage and convert it to an array
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  // Loop through the tasks and add them to the list
  tasks.forEach(task => {
    const list = document.querySelector("ul");
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? "checked" : ""}>
          <input type="text" value="${task.task}" class="task ${task.completed ? "completed" : ""}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
          <button onclick="removeTask(this)">&minus;</button>`;
    list.insertBefore(li, list.children[0]);
  });
}

// creating a new task
function addTask() {
  const task = document.querySelector("form input");
  const list = document.querySelector("ul");
  // return if task is empty
  if (task.value === "") {
    alert("Please add a task!");
    return false;
  }
  // check if task already exists in the local storage
  if (document.querySelector(`input[value="${task.value}"]`)) {
    alert("Task is already on the list!");
    return false;
  }

  // add task to local storage
  localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: task.value, completed: false }]));

  // create list item, add innerHTML and append to ul
  const li = document.createElement("li");
  li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check-add">
      <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
      <button onclick="removeTask(this)">&minus;</button>`;

  list.insertBefore(li, list.children[0]); //ie add at the top of the list at index 0
  // clear input field when task has been submitted
  task.value = "";
}

// if the task has been done and is checked
function taskComplete(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach(task => {
    if (task.task === event.nextElementSibling.value) {
      task.completed = !task.completed;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.nextElementSibling.classList.toggle("completed");
  event.nextElementSibling.classList.toggle("checked");

}
// function to delete a task from the list
function removeTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach(task => {
    if (task.task === event.parentNode.children[1].value) {
      // delete task
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.parentElement.remove();
}

// store current task to track changes
var currentTask = null;

// get current task
function getCurrentTask(event) {
  currentTask = event.value;
}

// edit the task and update local storage
function editTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  // check if task is empty
  if (event.value === "") {
    alert("Task is empty!");
    event.value = currentTask;
    return;
  }
  // task already exist
  tasks.forEach(task => {
    if (task.task === event.value) {
      alert("Task already exist!");
      event.value = currentTask;
      return;
    }
  });
  // update task
  tasks.forEach(task => {
    if (task.task === currentTask) {
      task.task = event.value;
    }
  });
  // update local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}