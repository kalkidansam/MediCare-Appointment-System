const API_URL = "http://localhost:5000/api/patients";


async function loadPatients() {
    try {
        const response = await fetch(API_URL);
        const patients = await response.json();

        const tableBody = document.getElementById("patientTableBody");
        tableBody.innerHTML = "";

        patients.forEach(patient => {
            const row = `
                <tr>
                    <td>${patient.id}</td>
                    <td>${patient.user_id}</td>
                    <td>${patient.age}</td>
                    <td>${patient.gender}</td>
                    <td>${patient.phone}</td>
                    <td>${patient.address}</td>
                </tr>
            `;

            tableBody.innerHTML += row;
        });

    } catch (error) {
        console.error("Error loading patients:", error);
    }
}


document.getElementById("patientForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const patientData = {
        user_id: document.getElementById("user_id").value,
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(patientData)
        });

        const result = await response.json();

        alert(result.message || "Patient added successfully");

        document.getElementById("patientForm").reset();
        loadPatients();

    } catch (error) {
        console.error("Error adding patient:", error);
    }
});

loadPatients();