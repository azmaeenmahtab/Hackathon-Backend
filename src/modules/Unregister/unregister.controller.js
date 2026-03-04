// unregister.controller.js
const pool = require('../../config/db');

const unregisterEvent = async (req, res) => {
    const { uid } = req.body;
    const { event_id } = req.params;

    if (!uid) return res.status(400).json({ error: "User ID (uid) is required." });
    if (!event_id) return res.status(400).json({ error: "Event ID is required." });

    try {
        // Check if the registration exists
        const check = await pool.query(
            `SELECT * FROM registrations WHERE firebase_uid = $1 AND event_id = $2`,
            [uid, event_id]
        );

        if (check.rowCount === 0) {
            return res.status(404).json({ error: "Registration not found." });
        }

        // Update status to 'cancelled'
        await pool.query(
            `UPDATE registrations SET status = 'cancelled', registered_at = NOW() WHERE firebase_uid = $1 AND event_id = $2`,
            [uid, event_id]
        );

        res.json({ message: "Successfully unregistered from event." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error", detail: err.message });
    }
};

module.exports = unregisterEvent;
