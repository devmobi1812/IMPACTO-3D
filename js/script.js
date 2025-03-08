'use strict';

document.addEventListener("DOMContentLoaded", function (){
    document.querySelector("#boton-menu").addEventListener("click", mostrarMenu);

    function mostrarMenu(){
        document.querySelector("#menu").classList.toggle("show");
    }
});