"use strict";

const tiempoTimerPrin = document.querySelector(".timer-principal__tiempo").children;
const btnModificar = document.querySelector(".btn-modificar");
const btnPlay = document.querySelector(".btn-play");
const imgBtnModificar = document.querySelector(".img-btn-modificar");
const imgBtnPlay = document.querySelector(".img-btn-play");
const filaMasTiempo = document.querySelector(".timer-principal__mas-tiempo");
const filaMenosTiempo = document.querySelector(".timer-principal__menos-tiempo");
const btnestadoReset = document.querySelector(".btn-reset");

let horas = 0,
    mins = 0,
    secs = 0;
let estadoModificar = false,
    estadoPlay = false;
var timer;

//Botones Para Modificar Tiempo
const modificarTiempo = () => {
    imgBtnModificar.setAttribute("src", "img/guardar.png")
    filaMasTiempo.style = "display:grid"
    filaMenosTiempo.style = "display:grid"
}

filaMasTiempo.children[0].addEventListener("click", () => {
    (horas < 99) ? horas++ : horas = 0;
    tiempoTimerPrin[0].innerHTML = (horas > 9) ? horas : `0${horas}`;
});

filaMasTiempo.children[1].addEventListener("click", () => {
    (mins < 59) ? mins++ : mins = 0;
    tiempoTimerPrin[2].innerHTML = (mins > 9) ? mins : `0${mins}`;;
});

filaMasTiempo.children[2].addEventListener("click", () => {
    (secs < 59) ? secs++ : secs = 0;
    tiempoTimerPrin[3].innerHTML = (secs > 9) ? secs : `0${secs}`;;
});

filaMenosTiempo.children[0].addEventListener("click", () => {
    (horas > 0) ? horas-- : horas = 99;
    tiempoTimerPrin[0].innerHTML = (horas > 9) ? horas : `0${horas}`;
});

filaMenosTiempo.children[1].addEventListener("click", () => {
    (mins > 0) ? mins-- : mins = 59;
    tiempoTimerPrin[2].innerHTML = (mins > 9) ? mins : `0${mins}`;;
});

filaMenosTiempo.children[2].addEventListener("click", () => {
    (secs > 0) ? secs-- : secs = 59;;
    tiempoTimerPrin[3].innerHTML = (secs > 9) ? secs : `0${secs}`;;
});

const guardarTiempo = () => {
    imgBtnModificar.setAttribute("src", "img/boligrafo.png")
    filaMasTiempo.style = "display:none"
    filaMenosTiempo.style = "display:none"
}

btnModificar.addEventListener("click", () => {
    estadoModificar = !(estadoModificar);
    if (estadoModificar) modificarTiempo();
    else guardarTiempo();
})

const cuentaRegresiva = () => {
    timer = setInterval(() => {
        if (secs == 0) {
            if (mins == 0) {
                if (horas == 0) {
                    estadoPlay = false;
                    imgBtnPlay.setAttribute("src", "img/play.png");
                    new Notification("Fin Del Temporizador");
                    clearInterval(timer);
                } else {
                    horas--;
                    mins = 59;
                    secs = 59;
                }
            } else {
                mins--;
                secs = 59;
            }
        } else {
            secs--;
        }
        tiempoTimerPrin[0].innerHTML = (horas > 9) ? horas : `0${horas}`;
        tiempoTimerPrin[2].innerHTML = (mins > 9) ? mins : `0${mins}`;;
        tiempoTimerPrin[3].innerHTML = (secs > 9) ? secs : `0${secs}`;;
    }, 1000);
}

btnPlay.addEventListener("click", () => {
    if (horas || mins || secs) {
        estadoPlay = !(estadoPlay);
        if (estadoPlay) {
            imgBtnPlay.setAttribute("src", "img/detener.png");
            cuentaRegresiva();
        } else {
            imgBtnPlay.setAttribute("src", "img/play.png");
            clearInterval(timer);
        }
    }
})

btnestadoReset.addEventListener("click", () => {
    horas = 0, mins = 0, secs = 0;
    tiempoTimerPrin[0].innerHTML = (horas > 9) ? horas : `0${horas}`;
    tiempoTimerPrin[2].innerHTML = (mins > 9) ? mins : `0${mins}`;;
    tiempoTimerPrin[3].innerHTML = (secs > 9) ? secs : `0${secs}`;;
    console.log(horas);
});