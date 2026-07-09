fetch("http://localhost:5000/api/appointments")
    .then(response => response.json())
    .then(data => {
        const tbody = document.querySelector("#appointmentTable tbody");

        data.forEach(appointment => {
            const row = `
                <tr>
                    <td>${appointment.id}</td>
                    <td>${appointment.patient_id}</td>
                    <td>${appointment.doctor_id}</td>
                    <td>${appointment.appointment_date}</td>
                    <td>${appointment.appointment_time}</td>
                    <td>${appointment.status}</td>
                </tr>
            `;

            tbody.innerHTML += row;
        });
    })
    .catch(error => console.error(error));