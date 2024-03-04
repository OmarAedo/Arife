document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('form[name="sign-up"]');
  const backButton = document.querySelector(".lastButtons .lastButton");
  const nextButton = document.querySelector(
    '.lastButtons .nav-cta[href="sucursal.html"]'
  );
  const confirmationDiv = document.getElementById("confirmacion");
  confirmationDiv.style.display = "none";
  function handleNextButtonClick(event) {
    confirmationDiv.style.display = "block";
    event.preventDefault();
  }
  nextButton.addEventListener("click", handleNextButtonClick);
});
