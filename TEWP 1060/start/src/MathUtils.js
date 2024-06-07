class MathUtils {
  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    if (this.isNumeric(a) && this.isNumeric(b)) {
      return a - b;
    } else {
      throw new Error(`Either ${a} or ${b} is not a number`);
    }
  }

  isNumeric(n) {
    return typeof n === "number";
  }

  average(...numbers) {
    let sum = 0;
    numbers.forEach((current) => {
      if (this.isNumeric(current)) {
        sum += current;
      } else {
        throw new Error(`${current} is not a number`);
      }
    });
    return sum / numbers.lenght;
  }
}
