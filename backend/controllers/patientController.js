const db = require("../config/db");


const createPatient = (req, res) => {
    const {
        full_name,
        age,
        gender,
        phone,
        email,
        address
    } = req.body;

    const sql = `
        INSERT INTO patients
        (full_name, age, gender, phone, email, address)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [full_name, age, gender, phone, email, address],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                success: true,
                message: "Patient created successfully"
            });
        }
    );
};


const getPatients = (req, res) => {
    db.query(
        "SELECT * FROM patients",
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.status(200).json(result);
        }
    );
};

module.exports = {
    createPatient,
    getPatients
};