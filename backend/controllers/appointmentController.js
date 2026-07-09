const db = require("../config/db");


const createAppointment = (req, res) => {
    const {
        patient_id,
        doctor_id,
        appointment_date,
        appointment_time,
        status
    } = req.body;

    const sql = `
        INSERT INTO appointments
        (
            patient_id,
            doctor_id,
            appointment_date,
            appointment_time,
            status
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            patient_id,
            doctor_id,
            appointment_date,
            appointment_time,
            status || "Pending"
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                success: true,
                message: "Appointment created successfully"
            });
        }
    );
};


const getAppointments = (req, res) => {
    const sql = `
        SELECT
    appointments.*,
    patients.id AS patient_id,
    doctors.id AS doctor_id
FROM appointments
JOIN patients
    ON appointments.patient_id = patients.id
JOIN doctors
    ON appointments.doctor_id = doctors.id
    `;

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json(result);
    });
};

module.exports = {
    createAppointment,
    getAppointments
};