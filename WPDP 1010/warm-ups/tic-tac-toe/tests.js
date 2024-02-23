function adder(x, y) {
  return x + y;
}

describe("on initial load", function () {
  it("on the page should have a table element", function () {
    const tableElement = document.querySelector("table");
    console.log(tableElement);
    expect(tableElement).toBeTruthy();
  });

  it("on the page should have a table element with 3 rows", function () {
    const tableElement = document.querySelector("table");
    const rows = Array.from(tableElement.querySelectorAll("tr"));
    const expected = 3;
    const actual = rows.length;
    expect(actual).toBe(expected);
  });

  it("on the page should have a table element with 3 rows", function () {
    const tableElement = document.querySelector("table");
    const rows = Array.from(tableElement.querySelectorAll("tr"));

    rows.forEach(function (rowElementItem) {
      const cellElements = Array.from(rowElementItem.querySelectorAll("td"));
      const expected = 3;
      const actual = cellElements.length;

      expect(actual).toBe(expected);
    });
  });
});

describe("it should handle players turns", function () {
  it("should show show a red circle when you click a square", () => {
    const firstCell = document.querySelector("tr").querySelector("td");

    firstCell.click();

    const circleElement = firstCell.querySelector(".red");
    expect(circleElement).toBeTruthy();
  });

  it("should show show a blue circle when there is a second click", () => {
    const secondCell = document.querySelector("tr:nth-child(2)").querySelector("td");

    secondCell.click();

    const circleElement = secondCell.querySelector(".blue");
    expect(circleElement).toBeTruthy();
  });
});
