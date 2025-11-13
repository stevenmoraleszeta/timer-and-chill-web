"use strict";

const btnPlaySonido = document.querySelectorAll(".btn-play-sonido");
const imgBtnPlaySonido = document.querySelectorAll(".img-play-sonido");
const rangoVolumen = document.querySelectorAll(".volumen-sonido");
const sonido = document.querySelectorAll(".sonido");

let estadoPlaySonido = false;
let intervaloVolumen;

const reproducirSonido = num => {
    estadoPlaySonido = !(estadoPlaySonido);
    if (estadoPlaySonido) {
        imgBtnPlaySonido[num].setAttribute("src", "IMG/detener.png");
        sonido[num].play();
    } else {
        imgBtnPlaySonido[num].setAttribute("src", "IMG/play.png");
        sonido[num].pause();
    }
}

const cambiarVolumen = (num) => {
    intervaloVolumen = setInterval(() => {
        sonido[num].volume = rangoVolumen[num].value / 100;
    }, 100);
}


btnPlaySonido[0].addEventListener("click", () => {
    reproducirSonido(0);
});
rangoVolumen[0].addEventListener("mousedown", () => {
    cambiarVolumen(0);
})
rangoVolumen[0].addEventListener("mouseup", () => {
    clearInterval(intervaloVolumen);
})


btnPlaySonido[1].addEventListener("click", () => {
    reproducirSonido(1);
});
rangoVolumen[1].addEventListener("mousedown", () => {
    cambiarVolumen(1);
})
rangoVolumen[1].addEventListener("mouseup", () => {
    clearInterval(intervaloVolumen);
})


btnPlaySonido[2].addEventListener("click", () => {
    reproducirSonido(2);
});
rangoVolumen[2].addEventListener("mousedown", () => {
    cambiarVolumen(2);
})
rangoVolumen[2].addEventListener("mouseup", () => {
    clearInterval(intervaloVolumen);
})

btnPlaySonido[3].addEventListener("click", () => {
    reproducirSonido(3);
});
rangoVolumen[3].addEventListener("mousedown", () => {
    cambiarVolumen(3);
})
rangoVolumen[3].addEventListener("mouseup", () => {
    clearInterval(intervaloVolumen);
})

btnPlaySonido[4].addEventListener("click", () => {
    reproducirSonido(4);
});
rangoVolumen[4].addEventListener("mousedown", () => {
    cambiarVolumen(4);
})
rangoVolumen[4].addEventListener("mouseup", () => {
    clearInterval(intervaloVolumen);
})

btnPlaySonido[5].addEventListener("click", () => {
    reproducirSonido(5);
});
rangoVolumen[5].addEventListener("mousedown", () => {
    cambiarVolumen(5);
})
rangoVolumen[5].addEventListener("mouseup", () => {
    clearInterval(intervaloVolumen);
})