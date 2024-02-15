let input1 = document.querySelector("#input1");
let input2 = document.querySelector("#input2");
let createBtn = document.querySelector("#createBtn");
let displayDiv = document.querySelector("#tableDisplay");

function createTable() {
  let value1 = Number(input1.value);
  let value2 = Number(input2.value);
  let table = document.createElement("table");

  for (let i = 0; i < value1; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < value2; j++) {
      let column = document.createElement("td");

      row.appendChild(column);
    }
    table.appendChild(row);
  }

  console.log(value1, value2);

  displayDiv.innerHTML = "";
  displayDiv.appendChild(table);
}
createTable();

createBtn.addEventListener("click", createTable);
