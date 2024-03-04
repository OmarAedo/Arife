document.addEventListener("DOMContentLoaded", function () {
  const cancelButton = document.querySelector('a[href="sucursal.html"]');
  const confirmationDiv = document.getElementById("confirmacion");
  confirmationDiv.style.display = "none";
  function handleCancelButtonClick(event) {
    confirmationDiv.style.display = "block";
    event.preventDefault();
  }
  cancelButton.addEventListener("click", handleCancelButtonClick);
});
