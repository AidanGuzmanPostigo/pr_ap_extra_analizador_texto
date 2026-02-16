"use strict";
const textoInput = document.querySelector("#inputTexto");
const analizar = document.querySelector("#btnAnalizar");
const resumen = document.querySelector("#txtResumen");
const error = document.querySelector("#mensaje");
const timeoutError = 2000;
const texto = textoInput.value;
init()
function init(){
    textoInput.addEventListener("keydown", (event) => {
    if(event.key == "Enter"){
        analizarInput();
    }
  });
  analizar.addEventListener("click", () => {
    analizarInput();
  });
}
function analizarInput(){
    if (texto.trim() === ""){
        mostrarMensaje("No se puede introducir un texto vacío.");
    } else if (texto === 2){
        
    }
}
function mostrarMensaje(texto) {
    error.innerHTML=`${texto}<br>`
    setTimeout(function(){
        limpiarMensaje();
    },timeoutError);
}
function limpiarMensaje() {
    error.textContent = "";
}

// ANTES DE ANALISIS ELIMINAR ESPACIOS SOBRANTES, VER QUE NO ESTÁ VACÍO, EVITAR ESPACIOS MULTIPLES, NO SER CASESENSITIVE
// TOTAL DE PALABRAS, TOTAL DE CARACTERES SIN ESPACIOS, PALABRA MÁS LARGA, PALABRA MÁS CORTA 
// PALABRAS ÚNICAS Y CONTAR CUANTAS VECES APARECE CADA PALABRA Y ORDENAR POR LONGITUD
// DETECTAR PALÍNDROMOS, HACER TOP 3 PALABRAS MÁS LARGAS Y GENERAR UNA FRASE RESUMEN.