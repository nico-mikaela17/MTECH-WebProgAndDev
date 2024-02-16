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

function renderList() {
  //displaying the lists we have
  let groupOfLists = document.querySelector("#lists");
  groupOfLists.innerHTML = "";
  lists.forEach((listItem) => {
    //indivitual list item
    let singleListItem = document.createElement("li");
    singleListItem.classList.add("list-group-item");
    singleListItem.textContent = `${listItem.name}`;
    singleListItem.addEventListener("click", makeActive);
    function makeActive() {
      singleListItem.classList.toggle("activeItem");
    }

    let deleteIcon = document.createElement("button");
    deleteIcon.classList.add("deleteIcon");
    deleteIcon.innerHTML = `<i class="fa-solid fa-trash-can" onclick="removeList(${listItem.id})"></i>`;

    singleListItem.appendChild(deleteIcon);
    groupOfLists.appendChild(singleListItem);
  });
}
renderList();

// User must be able to create multiple lists of tasks.
let listsInput = document.querySelector("#listsInput");
let addListBtn = document.querySelector("#add-list-btn");

//MAKE BUTTON WORK
addListBtn.addEventListener("click", addList);

//WHAT DOES THE BUTTON DO?
function addList() {
  lists.push({
    id: Math.floor(Math.random() * 10000),
    name: listsInput.value,
    todos: [],
  });
  renderList();
  // if(name= ""){
  //   !renderList()
  // }
}

// User must be able to delete lists of tasks.
function removeList(id) {
  // const found = lists.find((item) => item.id === id);
  // console.log(found)
  lists = lists.filter((item) => item.id !== id);
  renderList();
}

// User must be able to view all tasks in a list.
function renderTasks() {
  //displaying the current list\

  let groupOfTasks = document.querySelector("#tasksList");

  let currentListTitle = document.querySelector("#current-list-name");
  currentListTitle.textContent = lists.name;

  groupOfTasks.innerHTML = "";
  lists.forEach((todo) => {
    //indivitual list item
    let singleTodoItem = document.createElement("li");
    let singleTodoItemDiv = document.createElement("div");

    let singleTodoItemInput = document.createElement("input");
    singleTodoItemInput.classList.add("form-check-input", "me-1");
    singleTodoItemInput.type = "checkbox";
    singleTodoItemInput.value = "";

    let singleTodoItemLabel = document.createElement("label");
    singleTodoItemLabel.innerHTML = `
  
    class="form-check-label list-group-item"
    for="firstCheckbox"`;

    singleTodoItemLabel.textContent = `${lists.name}`;
    singleTodoItem.addEventListener("click", makeActive);
    function makeActive() {
      singleTodoItem.classList.toggle("activeItem");
    }

    let deleteIcon = document.createElement("button");
    deleteIcon.classList.add("deleteIcon");
    deleteIcon.innerHTML = `<i class="fa-solid fa-trash-can" onclick="removeList(${todo.id})"></i>`;

    groupOfTasks.appendChild(currentListTitle);

    singleTodoItemDiv.appendChild(singleTodoItemInput);
    singleTodoItemDiv.appendChild(singleTodoItemLabel);
    singleTodoItem.appendChild(singleTodoItemDiv);
    singleTodoItem.appendChild(deleteIcon);

    groupOfTasks.appendChild(singleTodoItem);
  });
}
renderTasks();

// //ADD TODO
// function addTodo() {
//   // get the todo text from the todo input box
//   const text = document.getElementById('taskInput').value;
//   if(text) {
//     currentList.todos.push({
//       text: text,
//       completed: false
//     })
//     render();
//   }
//   console.log('todo added!')
//  }

// User must be able to edit, delete, and mark tasks.
// User must be able to clear tasks when they are complete.
// User must be able to search for specific tasks in the list.
// User must be able to save tasks for later viewing.
// User must be able to mark tasks as completed.
// User must be able to delete tasks from list.
// User must be able to customize task list view.
// App must be intuitive and easy to use.
