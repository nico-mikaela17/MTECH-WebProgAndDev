let isPlayerOne = true;

const cells = Array.from(document.querySelectorAll("td"));

cells.forEach(function (cellItem) {
  cellItem.addEventListener("click", function handleClick(e) {
    const element = e.target;
    const circleHtml = getNewCircleElement();

    element.appendChild(circleHtml);

    isPlayerOne = !isPlayerOne;
  });
  function getNewCircleElement() {
    const newCircleElement = document.createElement("div");
    const colorCssClass = isPlayerOne ? "red" : "blue";
  
    newCircleElement.classList.add("circle");
    newCircleElement.classList.add(colorCssClass);
  
    return newCircleElement;
  }
});


