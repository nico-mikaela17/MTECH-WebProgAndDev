let lists = [
  {
    id: Math.floor(Math.random() * 10000),
    name: "School",
    todos: [
      {
        id: Math.floor(Math.random() * 10000),
        text: "To-do app",
        completed: false,
      },
      {
        id: Math.floor(Math.random() * 10000),
        text: "Golf Score App",
        completed: false,
      },
      {
        id: Math.floor(Math.random() * 10000),
        text: "Team JS App",
        completed: false,
      },
    ],
  },
  {
    id: Math.floor(Math.random() * 10000),
    name: "Home",
    todos: [
      {
        id: Math.floor(Math.random() * 10000),
        text: "Dishes",
        completed: false,
      },
      {
        id: Math.floor(Math.random() * 10000),
        text: "Mop",
        completed: false,
      },
      {
        id: Math.floor(Math.random() * 10000),
        text: "Laundry",
        completed: false,
      },
    ],
  },
  {
    id: Math.floor(Math.random() * 10000),
    name: "2024",
    todos: [
      {
        id: Math.floor(Math.random() * 10000),
        text: "Go to Germany + Spain",
        completed: false,
      },
      {
        id: Math.floor(Math.random() * 10000),
        text: "Finish MTECH",
        completed: false,
      },
      {
        id: Math.floor(Math.random() * 10000),
        text: "Olivia Rodrigo concert",
        completed: false,
      },
    ],
  },
];

let currentListId = lists?.[0]?.id ?? "";

// let todos = JSON.parse(localStorage.getItem("lists")) ?? [];
// console.log("todos", todos);
// function saveListToLocalStorage() {
//   const listAsString = JSON.stringify(todos);
//   localStorage.setItem("lists", listAsString);
// }

//TODO: User must be able to view all list.
function renderList() {
  let groupOfLists = document.querySelector("#lists");
  groupOfLists.innerHTML = "";

  lists.forEach((listItem) => {
    //indivitual list item
    let singleListItem = document.createElement("li");
    singleListItem.classList.add("list-group-item");
    singleListItem.textContent = `${listItem.name}`;
    singleListItem.setAttribute("data-todoListId", listItem.id);
    singleListItem.addEventListener("click", makeActive);
    function makeActive() {
      //will have only one active item at a time
      document.querySelector(".activeItem")?.classList.remove("activeItem");
      singleListItem.classList.toggle("activeItem");
      currentListId = listItem.id;
      renderTasks();
    }

    let deleteIcon = document.createElement("button");
    deleteIcon.classList.add("deleteIcon", "zoomDelete");
    deleteIcon.innerHTML = `<i class="fa-solid fa-trash-can" onclick="removeList(${listItem.id})" data-delete="zoom"></i>`;

    singleListItem.appendChild(deleteIcon);
    groupOfLists.appendChild(singleListItem);
  });
  let highlightedListItem = document.querySelector(
    `[data-todolistid="${currentListId}"]`
  );

  document.querySelector(".activeItem")?.classList.remove("activeItem");
  highlightedListItem.classList.add("activeItem");
}
renderList();

//TODO: User must be able to create multiple lists.
let listsInput = document.querySelector("#listsInput");
let addListBtn = document.querySelector("#add-list-btn");

//Make button work
addListBtn.addEventListener("click", addList);
//What does the button do when clicked?
function addList() {
  const id = Math.floor(Math.random() * 10000);
  lists.push({
    id,
    name: listsInput.value,
    todos: [],
  });
  currentListId = id;
  // saveListToLocalStorage();
  renderList();
  renderTasks();
}

//TODO: User must be able to delete lists of tasks.
function removeList(id) {
  lists = lists.filter((item) => item.id !== id);
  currentListId = lists?.[0]?.id ?? "";

  // saveListToLocalStorage();
  renderList();
  renderTasks();
}

//TODO: User must be able to view all tasks in the current list.
function renderTasks() {
  let currentList = lists.find((listItem) => listItem.id === currentListId);

  let groupOfTasks = document.querySelector("#tasksList");

  let header = document.createElement("div");
  header.classList.add("taskHeader");
  let currentListTitle = document.querySelector("#current-list-name");
  currentListTitle.textContent = currentList?.name ?? "";

  // TODO:User must be able to clear tasks when they are complete.
  let clearCompletedTasksBtn = document.createElement("button");
  clearCompletedTasksBtn.textContent = "CLEAR DONE";
  clearCompletedTasksBtn.addEventListener("click", clearCompletedTasks);
  function clearCompletedTasks() {
    currentList.todos = currentList.todos.filter(
      (todo) => todo.completed != true
    );
    renderTasks();
  }

  groupOfTasks.innerHTML = "";
  header.appendChild(currentListTitle);
  header.appendChild(clearCompletedTasksBtn);
  groupOfTasks.appendChild(header);

  (currentList?.todos ?? []).forEach((todo) => {
    //indivitual list item
    let singleTodoItem = document.createElement("li");
    let singleTodoItemDiv = document.createElement("div");

    let singleTodoItemInput = document.createElement("input");
    singleTodoItemInput.classList.add("form-check-input", "me-3");
    singleTodoItemInput.type = "checkbox";
    singleTodoItemInput.value = "";

    let singleTodoItemLabel = document.createElement("label");
    singleTodoItemLabel.innerHTML = `class="form-check-label list-group-item" `;

    singleTodoItemLabel.textContent = todo.text;
    singleTodoItemInput.addEventListener("click", makeComplete);

    //TODOUser must be able to mark tasks as completed.
    function makeComplete() {
      singleTodoItemLabel.classList.toggle("taskComplete");
      todo.completed = !todo.completed;

      // if (singleTodoItemInput.classList.contains === "taskComplete") {
      //   ;

      //}
    }

    let actionDiv = document.createElement("div");
    actionDiv.classList.add("actionDiv");
    //edit button
    let editTasktBtn = document.createElement("button"); //delete button
    editTasktBtn.classList.add("editIcon");
    editTasktBtn.innerHTML = '<i class="fa-solid fa-pen "></i>';

    let editCommentDisplay = document.createElement("div");

    let todoTextarea = document.createElement("textarea");
    todoTextarea.style.backgroundColor = "#edf6f9";
    todoTextarea.style.border = "none";
    todoTextarea.style.borderRadius = "5px";

    todoTextarea.classList.add("hidden");

    let saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.classList.add("hidden", "saveBtn");

    editTasktBtn.onclick = function () {
      todoTextarea.classList.toggle("hidden");
      saveBtn.classList.toggle("hidden");

      todoTextarea.textContent = todo.text;
      editCommentDisplay.classList.toggle("hidden");
      // saveBtn.classList.toggle("hidden");
    };

    saveBtn.addEventListener("click", () => {
      singleTodoItemLabel.textContent = todoTextarea.value;
      todoTextarea.classList.add("hidden");
      saveBtn.classList.add("hidden");
      // editComment(todo.id, todoTextarea.value);
    });

    editCommentDisplay.appendChild(editTasktBtn);
    // editCommentDisplay.appendChild(saveBtn)

    let deleteIcon = document.createElement("button");
    deleteIcon.classList.add("deleteIcon");
    deleteIcon.innerHTML = `<i class="fa-solid fa-trash-can" onclick="removeTask(${todo.id})"></i>`;

    singleTodoItemDiv.appendChild(singleTodoItemInput);
    singleTodoItemDiv.appendChild(singleTodoItemLabel);
    actionDiv.appendChild(editTasktBtn);
    actionDiv.appendChild(deleteIcon);

    singleTodoItem.appendChild(singleTodoItemDiv);
    singleTodoItem.appendChild(actionDiv);

    groupOfTasks.appendChild(singleTodoItem);

    groupOfTasks.append(editCommentDisplay);
    groupOfTasks.append(todoTextarea);
    groupOfTasks.append(saveBtn);
  });
}
renderTasks();

let taskInput = document.querySelector("#taskInput");

let addTaskBtn = document.querySelector("#add-task-btn");
addTaskBtn.addEventListener("click", addTask);

//TODO: User must be able to add tasks
function addTask() {
  const id = Math.floor(Math.random() * 10000);
  let currentList = lists.find((listItem) => listItem.id === currentListId);
  currentList?.todos.push({
    id,
    text: taskInput.value,
    completed: false,
  });

  // currentListId = id;

  // saveListToLocalStorage();
  renderList();
  renderTasks();
}

// TODO: User must be able to delete tasks from list.
//Users can delete tasks and lists without needing to complete them first
function removeTask(id) {
  let currentList = lists.find((listItem) => listItem.id === currentListId);

  currentList.todos = currentList.todos.filter((todo) => todo.id !== id);
  renderTasks();
}

// FIXME:Users can edit tasks
//Use local storage to store all user data (list names, tasks in each list, etc)
//Deleting tasks and/or clearing all completed tasks/lists is animated (+2 points)
