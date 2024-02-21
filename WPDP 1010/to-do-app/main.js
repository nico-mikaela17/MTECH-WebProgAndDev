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

  let clearCompletedTasksBtn = document.createElement("button");
  clearCompletedTasksBtn.textContent = "CLEAR DONE";

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

    //FIXME: User must be able to mark tasks as completed.
    function makeComplete() {
      singleTodoItemLabel.classList.toggle("taskComplete");
      if (singleTodoItemInput.classList === "taskComplete") {
        console.log(lists);

        // todo.completed = true;
      }
    }

    let deleteIcon = document.createElement("button");
    deleteIcon.classList.add("deleteIcon");
    deleteIcon.innerHTML = `<i class="fa-solid fa-trash-can" onclick="removeTask(${todo.id})"></i>`;

    singleTodoItemDiv.appendChild(singleTodoItemInput);
    singleTodoItemDiv.appendChild(singleTodoItemLabel);
    singleTodoItem.appendChild(singleTodoItemDiv);
    singleTodoItem.appendChild(deleteIcon);

    groupOfTasks.appendChild(singleTodoItem);
  });
}
renderTasks();

let taskInput = document.querySelector("#taskInput");

let addTaskBtn = document.querySelector("#add-task-btn");
addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const id = Math.floor(Math.random() * 10000);
  let currentList = lists.find((listItem) => listItem.id === currentListId);
  currentList?.todos.push({
    id,
    text: taskInput.value,
    completed: false,
  });

  // currentListId = id;

  console.log(currentList.todos);
  // saveListToLocalStorage();
  renderList();
  renderTasks();
}

// TODO: User must be able to delete tasks from list.
function removeTask(id) {
  let currentList = lists.find((listItem) => listItem.id === currentListId);

  currentList.todos = currentList.todos.filter((todo) => todo.id !== id);
  renderTasks();
}

// User must be able to edit, delete, and mark tasks.
// User must be able to clear tasks when they are complete.
// User must be able to search for specific tasks in the list.
// User must be able to save tasks for later viewing.
// User must be able to customize task list view.
// App must be intuitive and easy to use.
