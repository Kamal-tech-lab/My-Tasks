let theInput = document.querySelector(".add-task input");

let theAddBtton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");

let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");
let deleteAllBtn = document.querySelector(".delete-all");
let finishAllBtn = document.querySelector(".finish-all");

window.onload = function () {
  theInput.focus();
};
deleteAllBtn.onclick = deleteAllTasks;
finishAllBtn.onclick = finishAllTasks;
theAddBtton.onclick = function () {
  if (theInput.value.trim() === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please Write A Task First!",
    });
  } else {
    if (hh()) return;

    let noTasksMsg = document.querySelector(".no-tasks-message");
    if (document.body.contains(document.querySelector(".no-tasks-message"))) {
      noTasksMsg.remove();
    }

    let mainSpan = document.createElement("span");
    let deleteElement = document.createElement("span");
    let text = document.createTextNode(theInput.value);
    let deleteText = document.createTextNode("Delete");
    mainSpan.appendChild(text);
    mainSpan.className = "task-box";
    deleteElement.appendChild(deleteText);
    deleteElement.className = "delete";

    mainSpan.appendChild(deleteElement);
    tasksContainer.appendChild(mainSpan);

    theInput.value = "";

    theInput.focus();
    saveTasks();
    calculateTasks();
  }
};

document.addEventListener("click", function (e) {
  if (e.target.className === "delete") {
    e.target.parentNode.remove();
    saveTasks();
    if (tasksContainer.childElementCount === 0) {
      createNoTasks();
    }
  }
  if (e.target.classList.contains("task-box")) {
    e.target.classList.toggle("finished");
  }
  saveTasks();
  calculateTasks();
});

function createNoTasks() {
  let msgSpan = document.createElement("span");
  let megText = document.createTextNode("Notasks To Show");
  msgSpan.appendChild(megText);
  msgSpan.className = "no-tasks-message";
  tasksContainer.appendChild(msgSpan);
}

function calculateTasks() {
  tasksCount.innerHTML = document.querySelectorAll(
    ".tasks-content .task-box",
  ).length;
  tasksCompleted.innerHTML = document.querySelectorAll(
    ".tasks-content .finished",
  ).length;
}

function hh() {
  let exists = false;
  document.querySelectorAll(".task-box").forEach(function (task) {
    if (task.firstChild.textContent === theInput.value.trim()) {
      exists = true;
    }
  });

  if (exists) {
    Swal.fire({
      icon: "warning",
      title: "Exists",
      text: "This Task Already Exists!",
    });
    return exists;
  }
}
// [3] Delete All Tasks
function deleteAllTasks() {
  document.querySelectorAll(".task-box").forEach(function (task) {
    task.remove();
  });
  if (!document.querySelector(".no-tasks-message")) {
    createNoTasks();
  }
  saveTasks();
  calculateTasks();
}

// [4] Finish All Tasks
function finishAllTasks() {
  document.querySelectorAll(".task-box").forEach(function (task) {
    task.classList.add("finished");
  });
  saveTasks();
  calculateTasks();
}

// [5] Add Tasks To Local Storage
function saveTasks() {
  let tasks = [];
  document.querySelectorAll(".task-box").forEach(function (task) {
    tasks.push({
      text: task.firstChild.textContent,
      finished: task.classList.contains("finished"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
  let saved = JSON.parse(localStorage.getItem("tasks")) || [];

  if (saved.length > 0) {
    document.querySelector(".no-tasks-message").remove();

    saved.forEach(function (value) {
      let mainSpan = document.createElement("span");
      let deleteElement = document.createElement("span");
      mainSpan.appendChild(document.createTextNode(value.text));
      mainSpan.className = "task-box";
      if (value.finished) {
        mainSpan.classList.add("finished");
      }
      deleteElement.appendChild(document.createTextNode("Delete"));
      deleteElement.className = "delete";
      mainSpan.appendChild(deleteElement);
      tasksContainer.appendChild(mainSpan);
    });
  }
  calculateTasks();
}
loadTasks();
