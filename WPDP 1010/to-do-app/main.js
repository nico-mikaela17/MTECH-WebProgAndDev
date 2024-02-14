let lists = [
  {
    id: Math.floor(Math.random() * 10000),
    name: "School",
    todos: [
      {
        text: "To-do app",
        completed: false,
      },
      {
        text: "Golf Score App",
        completed: false,
      },
      {
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
        text: "Dishes",
        completed: false,
      },
      {
        text: "Mop",
        completed: false,
      },
      {
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
        text: "Go to Germany + Spain",
        completed: false,
      },
      {
        text: "Finish MTECH",
        completed: false,
      },
      {
        text: "Olivia Rodrigo concert",
        completed: false,
      },
    ],
  },
];

const deleteItem = (id) => {
  // const found = lists.find((item) => item.id === id);
  // console.log(found)
  lists = lists.filter((item) => item.id !== id);
  renderList();
}


function renderList() {
  //displaying the lists we have
  let groupOfLists = document.querySelector("#lists");
  groupOfLists.innerHTML = "";
  lists.forEach((listItem) => {
    //indivitual list item
    let singleListItem = document.createElement("li");

    singleListItem.innerHTML = `<div class= "list-group-item">
    <li> ${listItem.name}</li> 
    <i class="fa-solid fa-trash-can" id="deleteListBtn" onclick="deleteItem(${listItem.id})"></i>
    </div>`;

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
    name: "2024",
    todos: [
      {
        text: "Go to Germany + Spain",
        completed: false,
      },
      {
        text: "Finish MTECH",
        completed: false,
      },
      {
        text: "Olivia Rodrigo concert",
        completed: false,
      },
    ],
  });
  renderList();
}


// User must be able to delete lists of tasks.
function removeList(){
// let deleteListBtn = document.querySelector('#deleteListBtn')

}






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
// User must be able to view all tasks in a list.
// User must be able to search for specific tasks in the list.
// User must be able to save tasks for later viewing.
// User must be able to mark tasks as completed.
// User must be able to delete tasks from list.
// User must be able to customize task list view.
// App must be intuitive and easy to use.
