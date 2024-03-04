function actualizarMapa() {
  var opcionSeleccionada = document.getElementById("opcion").value;
  var mapaIframe = document.getElementById("mapa-iframe");

  switch (opcionSeleccionada) {
    case "chincha":
      mapaIframe.src =
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3880.9467159190335!2d-76.13330492666927!3d-13.41562536889267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9110168813fe931d%3A0xa4f59e81c69bfb62!2sARIFE%20E.I.R.L!5e0!3m2!1ses!2spe!4v1707936734073!5m2!1ses!2spe";
      break;
    case "pisco":
      mapaIframe.src =
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.0163671152845!2d-76.20137772666028!3d-13.717458475250417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91106582315f5a25%3A0xdffe3c35a0b1689b!2sARIFE%20Pisco!5e0!3m2!1ses!2spe!4v1707941978807!5m2!1ses!2spe";

      break;
    default:
      mapaIframe.src = "";
  }
  var secondContainer = document.querySelector(".secondContainer");
  if (secondContainer) {
    secondContainer.style.height = opcionSeleccionada ? "80rem" : ""; // Restaura la altura original si no hay opción seleccionada
  }
  var mapa = document.getElementById("mapa");
  mapa.style.display = opcionSeleccionada ? "block" : "none";
  var options2 = document.querySelector(".options2");
  if (options2) {
    options2.style.height = opcionSeleccionada ? "90rem" : ""; // Ajusta el height según la opción seleccionada
  }
}
function validarCiudad(event) {
  var ciudadSeleccionada = document.getElementById("opcion").value;
  if (!ciudadSeleccionada) {
    alert("Por favor, seleccione una ciudad.");
    event.preventDefault(); // Detiene la acción predeterminada del evento
  }
}
