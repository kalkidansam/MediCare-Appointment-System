const db = require("../config/db");
const createDoctor = (req, res) => {
const { user_id, specialization, phone, experience } = req.body;

const sql = `
INSERT INTO doctors
(user_id, specialization, phone, experience)
VALUES (?, ?, ?, ?)
`;

db.query(
    sql,
    [user_id, specialization, phone, experience],
    (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            success: true,
            message: "Doctor created successfully"
        });
}
);
 };


const getDoctors = (req, res) => {
    db.query(
        "SELECT * FROM doctors",
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.status(200).json(result);
        }
    );
};


const getDoctor = (req, res) => {
    const { id } = req.params;

    db.query(
        "SELECT * FROM doctors WHERE id=?",
        [id],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.status(200).json(result);
        }
    );
};


const updateDoctor = (req, res) => {
    const { id } = req.params;

    const {
        full_name,
        specialization,
        phone,
        email,
        experience
    } = req.body;

    const sql = `
        UPDATE doctors
        SET full_name=?,
            specialization=?,
            phone=?,
            email=?,
            experience=?
        WHERE id=?
    `;

    db.query(
        sql,
        [
            full_name,
            specialization,
            phone,
            email,
            experience,
            id
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.status(200).json({
                success: true,
                message: "Doctor updated successfully"
            });
        }
    );
};

const deleteDoctor = (req, res) => {
    const { id } = req.params;

    db.query(
        "DELETE FROM doctors WHERE id=?",
        [id],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.status(200).json({
                success: true,
                message: "Doctor deleted successfully"
            });
        }
    );
};

module.exports = {
    createDoctor,
    getDoctors,
    getDoctor,
    updateDoctor,
    deleteDoctor
};