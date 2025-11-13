"use strict";

const btnPlaySonido = document.querySelectorAll(".btn-play-sonido");
const imgBtnPlaySonido = document.querySelectorAll(".img-play-sonido");
const rangoVolumen = document.querySelectorAll(".volumen-sonido");
const sonido = document.querySelectorAll(".sonido");

// Track playing state for each sound individually
const estadosPlaySonido = new Array(sonido.length).fill(false);
const intervalosVolumen = new Array(sonido.length).fill(null);

/**
 * Toggle play/pause for a specific sound
 * @param {number} index - Index of the sound to toggle
 */
const reproducirSonido = (index) => {
    const audio = sonido[index];
    const img = imgBtnPlaySonido[index];
    const isPlaying = estadosPlaySonido[index];

    try {
        if (isPlaying) {
            audio.pause();
            img.setAttribute("src", "IMG/play.png");
            estadosPlaySonido[index] = false;
        } else {
            audio.play().catch(error => {
                console.error(`Error playing sound ${index}:`, error);
            });
            img.setAttribute("src", "IMG/detener.png");
            estadosPlaySonido[index] = true;
        }
    } catch (error) {
        console.error(`Error toggling sound ${index}:`, error);
    }
};

/**
 * Update volume for a specific sound
 * @param {number} index - Index of the sound
 */
const actualizarVolumen = (index) => {
    const audio = sonido[index];
    const slider = rangoVolumen[index];
    if (audio && slider) {
        audio.volume = slider.value / 100;
    }
};

/**
 * Initialize event listeners for all sounds
 */
const inicializarSonidos = () => {
    btnPlaySonido.forEach((btn, index) => {
        // Play/pause button
        btn.addEventListener("click", () => {
            reproducirSonido(index);
        });

        // Volume slider - use input event instead of setInterval for better performance
        const slider = rangoVolumen[index];
        if (slider) {
            // Set initial volume
            actualizarVolumen(index);

            // Update volume on input (more efficient than setInterval)
            slider.addEventListener("input", () => {
                actualizarVolumen(index);
            });

            // Handle touch events for mobile
            slider.addEventListener("touchmove", () => {
                actualizarVolumen(index);
            });
        }

        // Handle audio ended event
        const audio = sonido[index];
        if (audio) {
            audio.addEventListener("ended", () => {
                estadosPlaySonido[index] = false;
                imgBtnPlaySonido[index].setAttribute("src", "IMG/play.png");
            });

            // Handle audio errors
            audio.addEventListener("error", (e) => {
                console.error(`Audio error for sound ${index}:`, e);
                estadosPlaySonido[index] = false;
                imgBtnPlaySonido[index].setAttribute("src", "IMG/play.png");
            });
        }
    });
};

// Initialize when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializarSonidos);
} else {
    inicializarSonidos();
}