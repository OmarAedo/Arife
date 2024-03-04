const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

let date = new Date();
date.setDate(1); // Establecer el día como el primer día del mes
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

const renderCalendar = () => {
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentDay = today.getDate();

  const monthElement = document.getElementById("month");
  const yearElement = document.getElementById("year");
  const daysElement = document.querySelector(".days");

  monthElement.textContent = monthNames[month];
  yearElement.textContent = year;

  daysElement.innerHTML = ""; // Limpiar días anteriores

  for (let i = 0; i < firstDayOfMonth; i++) {
    const emptyDayElement = document.createElement("div");
    emptyDayElement.classList.add("empty-day");
    daysElement.appendChild(emptyDayElement);
  }

  for (let i = 1; i <= lastDayOfMonth; i++) {
    let dayOfMonth = i;
    let dayOfWeek = (firstDayOfMonth + i - 1) % 7;

    const date = new Date(year, month, dayOfMonth);
    const dayClass =
      date <= today ||
      (month === currentMonth &&
        year === currentYear &&
        dayOfMonth === currentDay)
        ? "past-day"
        : "";

    const dayElement = document.createElement("div");
    dayElement.textContent = dayOfMonth;
    dayElement.className = `day ${dayClass}`;

    // Agregar evento de clic a todos los días
    dayElement.onclick = function () {
      handleDayClick(this); // 'this' hace referencia al día clickeado
    };

    daysElement.appendChild(dayElement);
  }
};

// Función para manejar la selección de día
// Función para manejar la selección de día
const handleDayClick = (clickedDay) => {
  const today = new Date();
  const selectedDate = new Date(year, month, clickedDay.textContent);

  // Verificar si el día seleccionado es anterior al día de hoy
  if (selectedDate < today) {
    // Si es anterior, no hacer nada
    return;
  }

  // Obtener el día de la semana del día seleccionado (0 para domingo, 1 para lunes, ..., 6 para sábado)
  const dayOfWeek = selectedDate.getDay();

  // Verificar si el día seleccionado es sábado (6) o domingo (0)
  if (dayOfWeek === 6 || dayOfWeek === 0) {
    // Si es sábado o domingo, no hacer nada
    return;
  }

  const selectedDay = document.querySelector(".selected-day");
  if (selectedDay) {
    // Desmarcar el día previamente seleccionado
    selectedDay.classList.remove("selected-day");
    selectedDay.style.backgroundColor = ""; // Restaurar el fondo del día previamente seleccionado
  }

  // Marcar el nuevo día
  clickedDay.classList.add("selected-day");
  clickedDay.style.backgroundColor = "#58a3b2"; // Cambiar fondo del día seleccionado

  // Mostrar el div HorarioGeneral cuando se selecciona un día
  const horarioGeneralDiv = document.querySelector(".HorarioGeneral");
  horarioGeneralDiv.style.display = "block";

  // Desplazar la página hacia arriba
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const moveDate = (direction) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  if (direction === "prev") {
    // Verificar si estás en el mes actual
    if (currentYear === year && currentMonth === month) {
      // No permitir retroceder más allá del mes actual
      return;
    }

    month--;
    if (month < 0) {
      month = 11;
      year--;
    }
  } else if (direction === "next") {
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
  }
  renderCalendar();
};

renderCalendar();

const handleTimeSlotClick = (selectedTimeSlot) => {
  // Show the FechaHoraAsesor div when a time slot is selected
  const fechaHoraAsesorDiv = document.querySelector(".FechaHoraAsesor");
  fechaHoraAsesorDiv.style.display = "block";

  // Remove 'selected-horario' class from previously selected horario
  const previouslySelected = document.querySelector(".selected-horario");
  if (previouslySelected) {
    previouslySelected.classList.remove("selected-horario");
  }

  // Add 'selected-horario' class to the currently selected horario
  selectedTimeSlot.classList.add("selected-horario");

  // Get the selected time slot text content
  const selectedTime = selectedTimeSlot.textContent;

  // Get the selected date
  const selectedDateElement = document.querySelector(".selected-day");
  const selectedDate = selectedDateElement.textContent;

  // Get the selected month
  const selectedMonthElement = document.getElementById("month");
  const selectedMonth = selectedMonthElement.textContent;

  // Update the content of the FechaHoraAsesor div with the selected month, date, and time slot
  const fechaHoraText = document.querySelector(".fechayHora");

  // Wrap the date in a span and apply styles
  fechaHoraText.innerHTML = `<ion-icon name="calendar-outline"></ion-icon> Fecha y hora de su
  cita: <div style ="font-weight: 300; font-size: 1.5rem; margin-top: 2rem; margin-left: 2.5rem;" >${selectedMonth} <span class="date" style="font-size: 1.5rem;">${selectedDate}</span> - <span class="time-slot">${selectedTime}</span></div>`;
};

document.querySelectorAll(".horario").forEach((item) => {
  item.addEventListener("click", (event) => {
    handleTimeSlotClick(item);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const selectElement = document.getElementById("opcion");
  const asesorElement = document.querySelector(".Asesor");

  selectElement.addEventListener("change", function () {
    const selectedOption =
      selectElement.options[selectElement.selectedIndex].text;
    asesorElement.innerHTML = `<ion-icon name="person-circle-outline"></ion-icon>  Asesor: <div style = "font-weight: 300;font-size: 1.5rem; margin-top: 2rem; margin-left: 2.5rem;">${selectedOption}</div>`;
  });
});

// Función para validar que se haya seleccionado una opción en el formulario
function validarOpcion(event) {
  // Obtener el valor seleccionado del select de asesores
  var opcionSeleccionada = document.getElementById("opcion").value;

  // Obtener el día seleccionado
  const selectedDay = document.querySelector(".selected-day");

  // Obtener el horario seleccionado
  const horarioSeleccionado = document.querySelector(".selected-horario");

  // Verificar si no se ha seleccionado una opción de asesor
  if (opcionSeleccionada === "") {
    // Mostrar un mensaje de alerta o realizar alguna acción indicando que se debe seleccionar una opción
    alert("Por favor selecciona un asesor antes de continuar");
    // Prevenir el comportamiento predeterminado del enlace (evitar que se vaya a la siguiente página)
    event.preventDefault();
    return;
  }

  // Verificar si no se ha seleccionado una fecha
  if (!selectedDay) {
    alert("Por favor selecciona una fecha antes de continuar");
    event.preventDefault();
    return;
  }

  // Verificar si no se ha seleccionado un horario
  if (!horarioSeleccionado) {
    alert("Por favor selecciona un horario antes de continuar");
    event.preventDefault();
    return;
  }
}

// Listener para validar al hacer clic en el enlace de "Siguiente"
document
  .getElementById("siguienteLink")
  .addEventListener("click", validarOpcion);
