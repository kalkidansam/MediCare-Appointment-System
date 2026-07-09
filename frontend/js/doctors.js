fetch("http://localhost:5000/api/doctors")
  .then(response => response.json())
  .then(data => {
    const tbody = document.querySelector("#doctorTable tbody");

    data.forEach(doctor => {
      const row = `
        <tr>
          <td>${doctor.id}</td>
          <td>${doctor.specialization}</td>
          <td>${doctor.phone}</td>
          <td>${doctor.experience}</td>
        </tr>
      `;

      tbody.innerHTML += row;
    });
  })
  .catch(error => console.error(error));