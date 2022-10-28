
document.querySelector(".menu_ham").addEventListener('click', animarBarras);

var linea1 = document.querySelector(".line1__menu_ham");
var linea2 = document.querySelector(".line2__menu_ham");
var linea3 = document.querySelector(".line3__menu_ham");
var navbar = document.querySelector(".navebar");

function animarBarras() {
    linea1.classList.toggle("activeLine1__menu_ham");
    linea2.classList.toggle("activeLine2__menu_ham");
    linea3.classList.toggle("activeLine3__menu_ham");
    navbar.classList.toggle("activenavbar");
}
