document.addEventListener("DOMContentLoaded", function() {
    const calendar = document.getElementById('calendar');
    const monthYear = document.getElementById('month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const appointmentForm = document.getElementById('appointment-form');
    const formCita = document.getElementById('form-cita');
    const cancelarBtn = document.getElementById('cancelar');
    const fechaInput = document.getElementById('fecha');
    const horaInput = document.getElementById('hora');
    const hours = ["11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let selectedDayElement = null;

    function loadCalendar(month, year) {
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        let table = '<table>';
        table += '<tr><th>Dom</th><th>Lun</th><th>Mar</th><th>Mié</th><th>Jue</th><th>Vie</th><th>Sáb</th></tr><tr>';

        // Rellenar días en blanco hasta el primer día del mes
        for (let i = 0; i < firstDay; i++) {
            table += '<td></td>';
        }

        // Rellenar los días del mes
        for (let day = 1; day <= lastDate; day++) {
            if ((day + firstDay - 1) % 7 === 0) {
                table += '</tr><tr>';
            }
            table += `<td data-day="${day}" data-month="${month + 1}" data-year="${year}">${day}</td>`;
        }

        table += '</tr></table>';
        calendar.innerHTML = table;

        // Mostrar el mes y el año actual
        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        monthYear.textContent = `${monthNames[month]} ${year}`;

        // Añadir eventos de clic a cada celda del calendario
        document.querySelectorAll('#calendar td').forEach(td => {
            td.addEventListener('click', function() {
                if (this.textContent !== '') {
                    // Resaltar el día seleccionado
                    if (selectedDayElement) {
                        selectedDayElement.classList.remove('selected');
                    }
                    this.classList.add('selected');
                    selectedDayElement = this;

                    const day = this.dataset.day;
                    const month = this.dataset.month;
                    const year = this.dataset.year;

                    // Mostrar formulario de agendación
                    fechaInput.value = `${year}-${month}-${day}`;
                    appointmentForm.style.display = 'block';
                }
            });
        });
    }

    formCita.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(formCita);
        formData.append('hora', document.getElementById('horario').value);

        fetch('agendar.php', {  // Asegúrate de que la ruta es correcta
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                appointmentForm.style.display = 'none';
                loadCalendar(currentMonth, currentYear);
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    cancelarBtn.addEventListener('click', function() {
        appointmentForm.style.display = 'none';
        if (selectedDayElement) {
            selectedDayElement.classList.remove('selected');
            selectedDayElement = null;
        }
    });

    prevMonthBtn.addEventListener('click', function() {
        currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        currentYear = currentMonth === 11 ? currentYear - 1 : currentYear;
        loadCalendar(currentMonth, currentYear);
    });

    nextMonthBtn.addEventListener('click', function() {
        currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
        currentYear = currentMonth === 0 ? currentYear + 1 : currentYear;
        loadCalendar(currentMonth, currentYear);
    });

    loadCalendar(currentMonth, currentYear);
});
