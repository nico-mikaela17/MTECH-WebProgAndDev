let links = document.querySelectorAll("a");

//FOR EACH
links.forEach((link, index) => {
  link.classList.add(`link-${index + 1}`);
});

//REGULAR FOR LOOP
for (let i = 0; i < links.length; i++) {
  links[i].classList.add(`link-${i + 1}`);
}

//FOR...OF
let i = 1;
for (let item of links) {
  item.classList.add(`link-${i++}`);
}
