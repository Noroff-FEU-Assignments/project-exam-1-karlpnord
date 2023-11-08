const hamIcon = document.querySelector("#hamburger-icon");
const navMenu = document.querySelector(".nav-bar__list");

hamIcon.onclick = function() {
   navMenu.classList.toggle("show-nav");
   hamIcon.classList.toggle("fa-xmark");
}