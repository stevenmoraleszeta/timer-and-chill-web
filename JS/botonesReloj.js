"use strict";

// Constants
const MAX_HOURS = 99;
const MAX_MINUTES = 59;
const MAX_SECONDS = 59;
const TIMER_INTERVAL = 1000;

// DOM elements
const tiempoTimerPrin = document.querySelector(".timer-principal__tiempo").children;
const btnModificar = document.querySelector(".btn-modificar");
const btnPlay = document.querySelector(".btn-play");
const imgBtnModificar = document.querySelector(".img-btn-modificar");
const imgBtnPlay = document.querySelector(".img-btn-play");
const filaMasTiempo = document.querySelector(".timer-principal__mas-tiempo");
const filaMenosTiempo = document.querySelector(".timer-principal__menos-tiempo");
const btnReset = document.querySelector(".btn-reset");

// State
let horas = 0;
let mins = 0;
let secs = 0;
let estadoModificar = false;
let estadoPlay = false;
let timer = null;

/**
 * Request notification permission
 */
const solicitarPermisoNotificacion = async () => {
    if ("Notification" in window && Notification.permission === "default") {
        try {
            await Notification.requestPermission();
        } catch (error) {
            console.warn("Notification permission request failed:", error);
        }
    }
};

/**
 * Show notification when timer completes
 */
const mostrarNotificacion = () => {
    if ("Notification" in window && Notification.permission === "granted") {
        try {
            new Notification("Fin Del Temporizador", {
                body: "¡El tiempo ha terminado!",
                icon: "IMG/reloj.png",
                tag: "timer-complete"
            });
        } catch (error) {
            console.warn("Failed to show notification:", error);
        }
    }
};

/**
 * Format time value with leading zero
 * @param {number} value - Time value to format
 * @returns {string} Formatted time string
 */
const formatearTiempo = (value) => {
    return value > 9 ? value.toString() : `0${value}`;
};

/**
 * Update timer display
 */
const actualizarDisplay = () => {
    tiempoTimerPrin[0].textContent = formatearTiempo(horas);
    tiempoTimerPrin[2].textContent = formatearTiempo(mins);
    tiempoTimerPrin[3].textContent = formatearTiempo(secs);
};

/**
 * Stop the timer
 */
const detenerTimer = () => {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    estadoPlay = false;
    imgBtnPlay.setAttribute("src", "IMG/play.png");
};

/**
 * Start edit mode
 */
const modificarTiempo = () => {
    imgBtnModificar.setAttribute("src", "IMG/guardar.png");
    filaMasTiempo.style.display = "grid";
    filaMenosTiempo.style.display = "grid";
};

/**
 * Exit edit mode
 */
const guardarTiempo = () => {
    imgBtnModificar.setAttribute("src", "IMG/boligrafo.png");
    filaMasTiempo.style.display = "none";
    filaMenosTiempo.style.display = "none";
};

/**
 * Countdown timer function
 */
const cuentaRegresiva = () => {
    timer = setInterval(() => {
        if (secs === 0) {
            if (mins === 0) {
                if (horas === 0) {
                    detenerTimer();
                    mostrarNotificacion();
                    return;
                } else {
                    horas--;
                    mins = MAX_MINUTES;
                    secs = MAX_SECONDS;
                }
            } else {
                mins--;
                secs = MAX_SECONDS;
            }
        } else {
            secs--;
        }
        actualizarDisplay();
    }, TIMER_INTERVAL);
};

/**
 * Initialize time adjustment buttons
 */
const inicializarBotonesTiempo = () => {
    // Increase buttons
    filaMasTiempo.children[0].addEventListener("click", () => {
        horas = horas < MAX_HOURS ? horas + 1 : 0;
        actualizarDisplay();
    });

    filaMasTiempo.children[1].addEventListener("click", () => {
        mins = mins < MAX_MINUTES ? mins + 1 : 0;
        actualizarDisplay();
    });

    filaMasTiempo.children[2].addEventListener("click", () => {
        secs = secs < MAX_SECONDS ? secs + 1 : 0;
        actualizarDisplay();
    });

    // Decrease buttons
    filaMenosTiempo.children[0].addEventListener("click", () => {
        horas = horas > 0 ? horas - 1 : MAX_HOURS;
        actualizarDisplay();
    });

    filaMenosTiempo.children[1].addEventListener("click", () => {
        mins = mins > 0 ? mins - 1 : MAX_MINUTES;
        actualizarDisplay();
    });

    filaMenosTiempo.children[2].addEventListener("click", () => {
        secs = secs > 0 ? secs - 1 : MAX_SECONDS;
        actualizarDisplay();
    });
};

/**
 * Initialize all event listeners
 */
const inicializar = () => {
    // Request notification permission on load
    solicitarPermisoNotificacion();

    // Initialize time adjustment buttons
    inicializarBotonesTiempo();

    // Edit button
    btnModificar.addEventListener("click", () => {
        estadoModificar = !estadoModificar;
        if (estadoModificar) {
            modificarTiempo();
        } else {
            guardarTiempo();
        }
    });

    // Play/pause button
    btnPlay.addEventListener("click", () => {
        if (horas || mins || secs) {
            estadoPlay = !estadoPlay;
            if (estadoPlay) {
                imgBtnPlay.setAttribute("src", "IMG/detener.png");
                cuentaRegresiva();
            } else {
                detenerTimer();
            }
        }
    });

    // Reset button
    btnReset.addEventListener("click", () => {
        // Stop timer if running
        detenerTimer();
        // Reset time
        horas = 0;
        mins = 0;
        secs = 0;
        actualizarDisplay();
    });

    // Initialize display
    actualizarDisplay();
};

// Initialize when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializar);
} else {
    inicializar();
}