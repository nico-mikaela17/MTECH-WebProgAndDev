// User must be able to create multiple lists of tasks.
// User must be able to edit, delete, and mark tasks.
// User must be able to clear tasks when they are complete.
// User must be able to view all tasks in a list.
// User must be able to search for specific tasks in the list.
// User must be able to save tasks for later viewing.
// User must be able to mark tasks as completed.
// User must be able to delete tasks from list.
// User must be able to customize task list view.
// App must be intuitive and easy to use.

let listInput = document.querySelector("#listsInput");
let addListBtn = document.querySelector("#add-list-btn");
let listGroup1 = document.querySelector("#list-group1");

//TODO: make sure to add an ID generator(?)

let lists = {
  1: {
    id: Math.floor(Math.random() * 100),
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
  2: {
    id: Math.floor(Math.random() * 100),
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
};
