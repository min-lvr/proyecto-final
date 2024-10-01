// Espera a que todo el contenido del DOM esté cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", function() {
    // Selecciona los elementos HTML que serán utilizados
    const calendar = document.getElementById('calendar');
    const monthYear = document.getElementById('month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const appointmentForm = document.getElementById('appointment-form');
    const fechaInput = document.getElementById('fecha');
    const horaInput = document.getElementById('hora');
    const horarioSelect = document.getElementById('horario');
    const cancelarBtn = document.getElementById('cancelar');
    const formCita = document.getElementById('form-cita');

    // Variables para el mes y año actuales
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let unavailableTimes = {}; // Almacena las horas que ya están ocupadas

    // Función para cargar el calendario según el mes y año dados
    function loadCalendar(month, year) {
        // Obtener el primer día del mes y el último día
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        // Comienza a crear la tabla del calendario
        let table = '<table>';
        table += '<tr><th>Dom</th><th>Lun</th><th>Mar</th><th>Mié</th><th>Jue</th><th>Vie</th><th>Sáb</th></tr><tr>';

        // Rellenar los días vacíos antes del primer día del mes
        for (let i = 0; i < firstDay; i++) {
            table += '<td></td>';
        }

        // Rellenar los días del mes
        for (let day = 1; day <= lastDate; day++) {
            // Salta a una nueva fila cada 7 días
            if ((day + firstDay - 1) % 7 === 0) {
                table += '</tr><tr>';
            }
            let dateKey = `${year}-${month + 1}-${day}`; // Formato de fecha
            let isUnavailable = unavailableTimes[dateKey] ? 'unavailable' : ''; // Comprueba si la fecha está ocupada
            table += `<td data-day="${day}" data-month="${month + 1}" data-year="${year}" data-date="${dateKey}" class="${isUnavailable}">${day}</td>`;
        }

        table += '</tr></table>';
        calendar.innerHTML = table; // Muestra el calendario en el HTML

        // Muestra el mes y año actual en la cabecera
        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        monthYear.textContent = `${monthNames[month]} ${year}`;

        // Añade el evento click a los días del calendario
        document.querySelectorAll('#calendar td').forEach(td => {
            td.addEventListener('click', function() {
                if (this.textContent !== '' && !this.classList.contains('unavailable')) {
                    handleDayClick(this.dataset.day, this.dataset.month, this.dataset.year, this);
                }
            });
        });
    }

    // Maneja el clic en un día del calendario
    function handleDayClick(day, month, year, element) {
        // Quita la clase 'selected' de cualquier día previamente seleccionado
        document.querySelectorAll('#calendar td.selected').forEach(td => {
            td.classList.remove('selected');
        });
    
        // Añade la clase 'selected' al día actual
        element.classList.add('selected');
    
        // Muestra el formulario de cita
        appointmentForm.style.display = 'block';
        fechaInput.value = `${year}-${month}-${day}`; // Establece la fecha seleccionada en el formulario
    
        // Vacía y carga las horas disponibles en el selector de horario
        horarioSelect.innerHTML = '<option value="">Seleccione una hora</option>';
        ['11:00', '13:00', '14:00', '15:00', '16:00', '17:00'].forEach(hora => {
            if (!unavailableTimes[`${fechaInput.value}-${hora}`]) {
                horarioSelect.innerHTML += `<option value="${hora}">${hora}</option>`;
            }
        });
    }

    // Actualiza el campo de hora cuando se selecciona una en el formulario
    horarioSelect.addEventListener('change', function() {
        horaInput.value = this.value;
    });

    // Maneja el clic en el botón de cancelar para ocultar el formulario
    cancelarBtn.addEventListener('click', function() {
        appointmentForm.style.display = 'none';
    });

    // Envía el formulario de cita y maneja la respuesta
    formCita.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

        const formData = new FormData(formCita); // Crea un objeto FormData con los datos del formulario

        fetch('procesar_cita.php', {
            method: 'POST',
            body: formData // Envía los datos al servidor
        })
        .then(response => response.text()) // Convierte la respuesta en texto
        .then(data => {
            alert(data); // Muestra la respuesta al usuario
            unavailableTimes[`${fechaInput.value}-${horaInput.value}`] = true; // Marca la hora como ocupada
            appointmentForm.style.display = 'none'; // Oculta el formulario
            loadCalendar(currentMonth, currentYear); // Recarga el calendario
        })
        .catch(error => console.error('Error:', error)); // Muestra el error en la consola si ocurre alguno
    });

    // Maneja el cambio al mes anterior
    prevMonthBtn.addEventListener('click', function() {
        currentMonth = currentMonth === 0 ? 11 : currentMonth - 1; // Cambia al mes anterior
        currentYear = currentMonth === 11 ? currentYear - 1 : currentYear; // Ajusta el año si es necesario
        loadCalendar(currentMonth, currentYear); // Recarga el calendario
    });

    // Maneja el cambio al mes siguiente
    nextMonthBtn.addEventListener('click', function() {
        currentMonth = currentMonth === 11 ? 0 : currentMonth + 1; // Cambia al mes siguiente
        currentYear = currentMonth === 0 ? currentYear + 1 : currentYear; // Ajusta el año si es necesario
        loadCalendar(currentMonth, currentYear); // Recarga el calendario
    });

    // Carga inicial del calendario
    loadCalendar(currentMonth, currentYear);
});
