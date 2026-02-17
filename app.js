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
    let texto = textoInput.value.trim().toLowerCase();
    let aux="";
    texto = analizarInput(texto);
    texto = ordenarPalabras(texto);
    aux = contarRepeticiones(texto);
    texto = eliminarRepetidas(texto);
    render(texto,aux);
    textoInput.value = "";
    textoInput.focus();
  });
  limpiar.addEventListener("click", () => {
    limpiarTodo();
  });
}
function analizarInput(texto){
    if (texto === ""){
        mostrarMensaje("No se puede introducir un texto vacío.");
        return;
    }
    return texto.split(/\s+/);
}
function render(texto, aux){
    pintarLista(aux);
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
        resumenTexto(texto);
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
  return texto;
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
function resumenTexto(texto){
    resumen.innerHTML = `Total de palabras: ${texto.length}<br>Total de caracteres: ${contarCaracteres(texto)}<br>Palabra más grande: ${texto[0]}<br>Palabra más pequeña: ${texto[texto.length-1]}<br>Palabras con más de 5 letras: ${palabrasCon5Letras(texto)}<br>Palabras que son palíndromas: ${detectarPalindromos(texto)}<br>${topLongitud(texto)}`;
}
function topLongitud(texto){
    return `Top 3 palabras más largas: ${texto[0]}, ${(texto[1] === undefined)?"":texto[1]}, ${(texto[2] === undefined)?"":texto[2]}.<br>`
}
function detectarPalindromos(texto){
    let result="";
    let aux="";
    for (let i = 0; i<texto.length;i++){
        for (let j = 0; j<texto[i].length;j++){
            aux+= texto[i][(texto[i].length-1)-j];
        }
        if (aux == texto[i]){
            result+=(texto[i])+",";
        }
        aux = "";
    }
    if (result == ""){
        return "Ninguna";
    } else {
        return result;
    }
}
function eliminarRepetidas(texto){
    return [...new Set(texto)];
}
function contarRepeticiones(texto){
    let aux = [];
    let aux2 = "";
    let copia = [...texto];
    let contador = 1;
    for (let i = 0; i<copia.length;i++){
        aux2 = copia[i]
        if (aux2 != ""){
            for (let j=i;j<copia.length-1;j++){
            if (aux2 == copia[j+1]){
                contador++
                copia[j+1] = "";
            }
        }
        aux.push(`${aux2 + " --> " + contador}`)
        contador = 1;
        }
    }
    return aux;
}
// CONTAR CUANTAS VECES APARECE CADA PALABRA