// src/modules/auth/controllers/signup.controller.js
const pool = require('../../config/db');

const SignUp = async (req, res) => {
    // Frontend sends Firebase user info in req.user and role in req.body
    const { uid, email, name, picture } = req.user || {};
    const { role } = req.body;
    console.log("Signup request for UID:", uid, "Email:", email, "Role:", role);
    // Validate required fields
    if (!uid) {
        return res.status(400).json({ error: "User ID (uid) is required." });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
        return res.status(400).json({ error: "A valid email is required." });
    }
    if (!role || typeof role !== "string" || role.trim().length === 0) {
        return res.status(400).json({ error: "Role is required for signup." });
    }

    try {
        // Check if user already exists
        const check = await pool.query("SELECT * FROM profiles WHERE firebase_uid = $1 OR email = $2", [
            uid,
            email,
        ]);
        if (check.rows.length > 0) {
            return res.status(400).json({ error: "User already exists." });
        }

        // Insert user into DB
        const insert = await pool.query(
            `INSERT INTO profiles (firebase_uid, email, name, photo_url, updated_at, role)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [uid, email, name || "", picture || "", new Date().toISOString(), role]
        );

        res.json({ message: "Signup successful", user: insert.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error", detail: err.message });
    }
};

module.exports = SignUp;
