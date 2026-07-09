require("dotenv").config();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
console.log("JWT_SECRET =", process.env.JWT_SECRET);


const register = async (req, res) => {
    try {
        const { full_name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users (full_name, email, password)
            VALUES (?, ?, ?)
        `;

        db.query(
            sql,
            [full_name, email, hashedPassword],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        success: false,
                        message: "Server error"
                    });
                }

                res.status(201).json({
                    success: true,
                    message: "User registered successfully"
                });
            }
        );

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const sql = "SELECT * FROM users WHERE email = ?";

        db.query(sql, [email], async (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Server error"
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            const user = result[0];

            const isMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid password"
                });
            }
console.log("JWT_SECRET =", process.env.JWT_SECRET);
            const token = jwt.sign(
                {
                    id: user.id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "7d"
                }
            );

            res.status(200).json({
                success: true,
                token
            });

        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    register,
    login
};