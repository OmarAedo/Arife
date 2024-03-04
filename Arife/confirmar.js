document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('form[name="sign-up"]');
  const backButton = document.querySelector(".lastButtons .lastButton");
  const nextButton = document.querySelector(
    '.lastButtons .nav-cta[href="sucursal.html"]'
  );
  const confirmationDiv = document.getElementById("confirmacion");
  confirmationDiv.style.display = "none";
  function validateForm() {
    const inputs = form.querySelectorAll('input[type="text"]');
    let formIsValid = true;

    inputs.forEach((input) => {
      if (input.required && input.value.trim() === "") {
        formIsValid = false;
      }
    });

    return formIsValid;
  }

  // Función para manejar el clic en el botón de siguiente
  function handleNextButtonClick(event) {
    // Mostrar el div de confirmación si el formulario es válido
    if (validateForm()) {
      confirmationDiv.style.display = "block";
      // Evitar el comportamiento predeterminado de redireccionamiento del botón
      event.preventDefault();
    } else {
      event.preventDefault();
      alert(
        "Por favor, complete todos los campos obligatorios antes de continuar."
      );
    }
  }

  // Agregar el evento de clic al botón de siguiente
  nextButton.addEventListener("click", handleNextButtonClick);
});
