class Zoo {
  constructor(address, entryFee, animals) {
    this.address = address;
    this.entryFee = entryFee;
    this.animals = animals;
    this.residentDiscount = 0.1;
    this.status = true;
  }
  hasAnimal(animal) {
    //should return a boolean of wether or not it has that animal
    return this.animals.some((a) => a === animal);
  }
  isOpen() {
    //should return a string containing the word 'YES' or 'NO', 'YES' if the zoo is open, and 'NO' if the zoo is closed
    if (this.status) {
      return "YES";
    } else {
      return "NO";
    }
  }
  //another way
  isOpen() {
    return this.status ? "YES" : "NO";
  }
  getResidentPrice() {
    //should return the entryFee price for a resident (use entryFee and residentDiscount to get result)
    return this.entryFee - this.entryFee * this.residentDiscount;
  }
}
