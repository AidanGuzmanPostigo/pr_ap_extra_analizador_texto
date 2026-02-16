"use strict";
const textoInput = document.querySelector("#inputTexto");
const analizar = document.querySelector("#btnAnalizar");
const lista = document.querySelector("#listaPalabras");
const resumen = document.querySelector("#txtResumen");
const limpiar = document.querySelector("#btnLimpiar");
const error = document.querySelector("#mensaje");
const timeoutError = 2000;
init()
function init(){
    textoInput.addEventListener("keydown", (event) => {
    if(event.key == "Enter"){
        analizarInput();
        textoInput.value = "";
        textoInput.focus();
    }
  });
  analizar.addEventListener("click", () => {
    analizarInput();
    textoInput.value = "";
    textoInput.focus();
  });
  limpiar.addEventListener("click", () => {
    limpiarTodo();
  });
}
function analizarInput(){
    let texto = textoInput.value.trim().toLowerCase();
    if (texto === ""){
        mostrarMensaje("No se puede introducir un texto vacío.");
        return;
    }
    texto = texto.split(/\s+/);
    ordenarPalabras(texto);
}
function render(texto){
    pintarLista(texto);
    pintarResumen(texto);
}
function pintarLista(texto) {
    lista.innerHTML = "";
    for(let i = 0; i<texto.length;i++){
        const singleWord = document.createElement("li");
        singleWord.textContent = texto[i];
        lista.appendChild(singleWord);
    }
}
function pintarResumen(texto) {
    if (texto.length == 0){
        resumen.innerHTML = "Aún no hay palabras.";
    } else {
        resumen.innerHTML = `Total de palabras: ${texto.length}<br>Total de caracteres: ${contarCaracteres(texto)}<br>Palabra más grande: ${texto[0]}<br>Palabra más pequeña: ${texto[texto.length-1]}<br>Palabras con más de 5 letras: ${palabrasCon5Letras(texto)}`;
    }
}
function contarCaracteres(texto){
    let count = 0;
    for(let i = 0; i<texto.length;i++){
        count+= texto[i].length;
    }
    return count;
}
function palabrasCon5Letras(texto){
    let count = 0;
    for (let i = 0; i< texto.length;i++){
        if (texto[i].length > 5){
            count++;
        }
    }
    return count;
}
function ordenarPalabras(texto) {
  texto.sort((a,b) => b.length-a.length);
  render(texto);
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
function limpiarTodo(){
    resumen.innerHTML = "No has introducido nada";
    lista.innerHTML = "";
    textoInput.value = "";
    textoInput.focus();
}
// PALABRAS ÚNICAS Y CONTAR CUANTAS VECES APARECE CADA PALABRA
// DETECTAR PALÍNDROMOS, HACER TOP 3 PALABRAS MÁS LARGAS Y GENERAR UNA FRASE RESUMEN.