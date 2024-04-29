let control = process.argv[2].toLowerCase();
console.log(control);

for (i = 1; i < 11; i++) {
  let even = i * 2;
  if (control === "even") {
    console.log(`${i}: counting: ${even}`);
  } else if (control === "odd") {
    console.log(`${i}: counting: ${even - 1}`);
  }
}
