"use strict";

const btnDiaNoche = document.querySelector(".btn-dia-noche");
const imgBtnDiaNoche = document.querySelector(".img-btn-dia-noche");

let estadoDiaNoche = true;

btnDiaNoche.addEventListener("click", () => {
    estadoDiaNoche = !(estadoDiaNoche);
    if (estadoDiaNoche) {
        btnDiaNoche.style = "grid-column: 1/2";
        imgBtnDiaNoche.setAttribute("src", "img/sol.png");
        document.documentElement.style.setProperty("--color-fondo", "#f5ffcb");
        document.documentElement.style.setProperty("--color-btns-reloj", "#516091");
        document.documentElement.style.setProperty("--color-btn-dia-noche", "#eef3ad");
        document.documentElement.style.setProperty("--color-header", "#74b3c1");
        document.documentElement.style.setProperty("--color-fondo-reloj", "#eef3ad");
        document.documentElement.style.setProperty("--color-segundero", "#75b79e");
        document.documentElement.style.setProperty("--color-bontones-modificar-hora", "#516091");
    } else {
        btnDiaNoche.style = "grid-column: 3/4";
        imgBtnDiaNoche.setAttribute("src", "img/luna.png");
        document.documentElement.style.setProperty("--color-fondo", "#516091");
        document.documentElement.style.setProperty("--color-btns-reloj", "#abebbe");
        document.documentElement.style.setProperty("--color-btn-dia-noche", "#516091");
        document.documentElement.style.setProperty("--color-header", "#6a8caf");
        document.documentElement.style.setProperty("--color-fondo-reloj", "#6a8caf");
        document.documentElement.style.setProperty("--color-segundero", "#eef3ad");
        document.documentElement.style.setProperty("--color-bontones-modificar-hora", "#eef3ad");
    }
});