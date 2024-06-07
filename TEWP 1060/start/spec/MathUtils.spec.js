describe("MathUtils", () => {
  let mathUtils;

  beforeEach(() => {
    mathUtils = new MathUtils();
  });

  describe("add", () => {
    it("should add 2 numbers", () => {
      expect(mathUtils.add(1, 2)).toBe(3);
      expect(mathUtils.add(2, 4)).toBe(6);
    });
    it("should work with negative numbers", () => {
      expect(mathUtils.add(-1, -2)).toBe(-3);
      expect(mathUtils.add(-2, -4)).toBe(-6);
    });
    it("should work with strings", () => {
      expect(mathUtils.add("not", "numbers")).toBe("notnumbers");
    });
  });

  describe("subtract", () => {
    it("should subtract two numbers", () => {
      expect(mathUtils.subtract(2, 1)).toEqual(1);
    });
    it("should throw an error with non-numbers", () => {
      expect(() => {
        mathUtils.subtract("not", "numbers");
      }).toThrow();
      expect(() => {
        mathUtils.subtract(1, false);
      }).toThrow(new Error(`Either 1 or false is not a number`));
    });
  });
  describe("average", () => {
    it("should work with multiple inputs", () => {
      expect(mathUtils.average(2, 4)).toBe(3);
      expect(mathUtils.average(1, 3, 5)).toBe(3);
    });
  });
});
