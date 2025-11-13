"use strict";

const btnDiaNoche = document.querySelector(".btn-dia-noche");
const imgBtnDiaNoche = document.querySelector(".img-btn-dia-noche");

let estadoDiaNoche = true;

// Color theme definitions
const temaDia = {
    fondo: "#f5ffcb",
    btnsReloj: "#516091",
    btnDiaNoche: "#eef3ad",
    header: "#74b3c1",
    fondoReloj: "#eef3ad",
    segundero: "#75b79e",
    botonesModificar: "#516091"
};

const temaNoche = {
    fondo: "#516091",
    btnsReloj: "#abebbe",
    btnDiaNoche: "#516091",
    header: "#6a8caf",
    fondoReloj: "#6a8caf",
    segundero: "#eef3ad",
    botonesModificar: "#eef3ad"
};

/**
 * Apply day theme
 */
const aplicarTemaDia = () => {
    btnDiaNoche.style.gridColumn = "1/2";
    imgBtnDiaNoche.setAttribute("src", "IMG/sol.png");
    imgBtnDiaNoche.setAttribute("alt", "Day mode");
    
    document.documentElement.style.setProperty("--color-fondo", temaDia.fondo);
    document.documentElement.style.setProperty("--color-btns-reloj", temaDia.btnsReloj);
    document.documentElement.style.setProperty("--color-btn-dia-noche", temaDia.btnDiaNoche);
    document.documentElement.style.setProperty("--color-header", temaDia.header);
    document.documentElement.style.setProperty("--color-fondo-reloj", temaDia.fondoReloj);
    document.documentElement.style.setProperty("--color-segundero", temaDia.segundero);
    document.documentElement.style.setProperty("--color-bontones-modificar-hora", temaDia.botonesModificar);
};

/**
 * Apply night theme
 */
const aplicarTemaNoche = () => {
    btnDiaNoche.style.gridColumn = "3/4";
    imgBtnDiaNoche.setAttribute("src", "IMG/luna.png");
    imgBtnDiaNoche.setAttribute("alt", "Night mode");
    
    document.documentElement.style.setProperty("--color-fondo", temaNoche.fondo);
    document.documentElement.style.setProperty("--color-btns-reloj", temaNoche.btnsReloj);
    document.documentElement.style.setProperty("--color-btn-dia-noche", temaNoche.btnDiaNoche);
    document.documentElement.style.setProperty("--color-header", temaNoche.header);
    document.documentElement.style.setProperty("--color-fondo-reloj", temaNoche.fondoReloj);
    document.documentElement.style.setProperty("--color-segundero", temaNoche.segundero);
    document.documentElement.style.setProperty("--color-bontones-modificar-hora", temaNoche.botonesModificar);
};

/**
 * Toggle between day and night mode
 */
const alternarTema = () => {
    estadoDiaNoche = !estadoDiaNoche;
    if (estadoDiaNoche) {
        aplicarTemaDia();
    } else {
        aplicarTemaNoche();
    }
};

// Initialize theme toggle
btnDiaNoche.addEventListener("click", alternarTema);

// Apply initial theme
aplicarTemaDia();