function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let shapesStack = [];
document.querySelector("#canvas").addEventListener("mousemove", (e) => {
  const x = e.offsetX;
  const y = e.offsetY;

  shapesStack = [{ x, y }, ...shapesStack];

  renderInputs();
});

document.querySelector("#undo").addEventListener("click", () => {
  shapesStack = shapesStack.slice(1);

  renderInputs();
});

function renderInputs() {
  let html = "";

  shapesStack.forEach(({ x, y }) => {
    html += `<div class="circle" style="
    position: absolute;
    top: ${y}px; 
    left: ${x}px; 
    background-color: black;      
    border-radius: 50%;
    height: 50px;
    width: 50px;
"></div>`;
  });
  document.querySelector("#canvas").innerHTML = html;
}
