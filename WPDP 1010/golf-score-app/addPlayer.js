//TODO:include ES6 Modules
export function addNewPlayer() {
  //name
  let name = document.querySelector("#name");
  let playerRow = document.createElement("tr");
  let playerName = document.createElement("th");
  playerRow.appendChild(playerName);
  playerName.textContent = name.value.toUpperCase();

  //first 9
  for (let i = 1; i < 10; i++) {
    let holeNumbers = document.createElement("td");
    holeNumbers.textContent = 0;

    let editCommentDisplay = document.createElement("div");
    editCommentDisplay.classList.add("hidden", "editCommentDisplay");

    let holeNumInput = document.createElement("input");
    holeNumInput.classList.add("hidden", "holeNumInput");
    holeNumInput.type = "Number";
    holeNumInput.placeholder = "Score";
    holeNumInput.textContent = name.text;

    let saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.classList.add("hidden", "saveBtn");

    editCommentDisplay.appendChild(holeNumInput);
    editCommentDisplay.appendChild(saveBtn);
    holeNumbers.appendChild(editCommentDisplay);

    holeNumbers.addEventListener("click", () => {

      editCommentDisplay.classList.remove("hidden");
      holeNumInput.classList.remove("hidden");
      saveBtn.classList.remove("hidden");
    });
    saveBtn.addEventListener("click", () => {
      holeNumbers.textContent = holeNumInput.value;
      holeNumInput.classList.add("hidden");
      saveBtn.classList.add("hidden");
      // scores.push = holeNumInput.value;
      // saveToLocalStorage();
    });
    playerRow.appendChild(holeNumbers);
  }

  //out
  let out = document.createElement("th");
  out.textContent = 0;

  let outeditCommentDisplay = document.createElement("div");
  outeditCommentDisplay.classList.add("hidden", "editCommentDisplay");

  let outHoleNumInput = document.createElement("input");
  outHoleNumInput.classList.add("hidden", "holeNumInput");
  outHoleNumInput.type = "Number";
  outHoleNumInput.placeholder = "Score";
  outHoleNumInput.textContent = name.text;

  let outSaveBtn = document.createElement("button");
  outSaveBtn.textContent = "Save";
  outSaveBtn.classList.add("hidden", "saveBtn");

  outeditCommentDisplay.appendChild(outHoleNumInput);
  outeditCommentDisplay.appendChild(outSaveBtn);
  out.appendChild(outeditCommentDisplay);

  out.addEventListener("click", () => {

    outeditCommentDisplay.classList.remove("hidden");
    outHoleNumInput.classList.remove("hidden");
    outSaveBtn.classList.remove("hidden");
  });
  outSaveBtn.addEventListener("click", () => {
    out.textContent = outHoleNumInput.value;
    outHoleNumInput.classList.add("hidden");
    outSaveBtn.classList.add("hidden");
  });
  playerRow.appendChild(out);

  //10-18
  for (let i = 10; i < 19; i++) {
    let holeNumbers = document.createElement("td");
    holeNumbers.textContent = 0;

    let editCommentDisplay = document.createElement("div");
    editCommentDisplay.classList.add("hidden", "editCommentDisplay");

    let holeNumInput = document.createElement("input");
    holeNumInput.classList.add("hidden", "holeNumInput");
    holeNumInput.type = "Number";
    holeNumInput.placeholder = "Score";
    holeNumInput.textContent = name.text;

    let saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.classList.add("hidden", "saveBtn");

    editCommentDisplay.appendChild(holeNumInput);
    editCommentDisplay.appendChild(saveBtn);
    holeNumbers.appendChild(editCommentDisplay);

    holeNumbers.addEventListener("click", () => {

      editCommentDisplay.classList.remove("hidden");
      holeNumInput.classList.remove("hidden");
      saveBtn.classList.remove("hidden");
    });
    saveBtn.addEventListener("click", () => {
      holeNumbers.textContent = holeNumInput.value;
      holeNumInput.classList.add("hidden");
      saveBtn.classList.add("hidden");
      // scores.push = holeNumInput.value;
      // saveToLocalStorage();
    });
    playerRow.appendChild(holeNumbers);
  }

  //in
  let inScore = document.createElement("th");
  inScore.textContent = 0;

  let inEditCommentDisplay = document.createElement("div");
  inEditCommentDisplay.classList.add("hidden", "editCommentDisplay");

  let inHoleNumInput = document.createElement("input");
  inHoleNumInput.classList.add("hidden", "holeNumInput");
  inHoleNumInput.type = "Number";
  inHoleNumInput.placeholder = "Score";
  inHoleNumInput.textContent = name.text;

  let inSaveBtn = document.createElement("button");
  inSaveBtn.textContent = "Save";
  inSaveBtn.classList.add("hidden", "saveBtn");

  inScore.addEventListener("click", () => {

    inEditCommentDisplay.classList.remove("hidden");
    inHoleNumInput.classList.remove("hidden");
    inSaveBtn.classList.remove("hidden");
  });
  inSaveBtn.addEventListener("click", () => {
    inScore.textContent = inHoleNumInput.value;
    inHoleNumInput.classList.add("hidden");
    inSaveBtn.classList.add("hidden");
  });
  inEditCommentDisplay.appendChild(inHoleNumInput);
  inEditCommentDisplay.appendChild(inSaveBtn);
  inScore.appendChild(inEditCommentDisplay);
  playerRow.appendChild(inScore);

  //total
  let total = document.createElement("th");
  total.textContent = 0;

  let totalEditCommentDisplay = document.createElement("div");
  totalEditCommentDisplay.classList.add("hidden", "editCommentDisplay");

  let totalHoleNumInput = document.createElement("input");
  totalHoleNumInput.classList.add("hidden", "holeNumInput");
  totalHoleNumInput.type = "Number";
  totalHoleNumInput.placeholder = "Score";
  totalHoleNumInput.textContent = name.text;

  let totalSaveBtn = document.createElement("button");
  totalSaveBtn.textContent = "Save";
  totalSaveBtn.classList.add("hidden", "saveBtn");

  total.addEventListener("click", () => {

    totalEditCommentDisplay.classList.remove("hidden");
    totalHoleNumInput.classList.remove("hidden");
    totalSaveBtn.classList.remove("hidden");
  });
  totalSaveBtn.addEventListener("click", () => {
    total.textContent = totalHoleNumInput.value;
    totalHoleNumInput.classList.add("hidden");
    totalSaveBtn.classList.add("hidden");
  });
  totalEditCommentDisplay.appendChild(totalHoleNumInput);
  totalEditCommentDisplay.appendChild(totalSaveBtn);
  total.appendChild(totalEditCommentDisplay);
  playerRow.appendChild(total);

  let table = document.querySelector(".table");
  table.appendChild(playerRow);
}
