// controllers/admin/softDeleteEvent.js
const pool = require('../../config/db');

const softDeleteEvent = async (req, res) => {
    const { eventId } = req.params;
    const { uid } = req.body;

    if (!eventId || !uid) {
        return res.status(400).json({ error: "Event ID and UID are required" });
    }

    try {
        // 1. Check if user is an active admin
        const adminRes = await pool.query(
            `SELECT * FROM profiles WHERE firebase_uid = $1 AND role = 'admin' AND is_active = true`,
            [uid]
        );
        if (adminRes.rows.length === 0) {
            return res.status(403).json({ error: "Unauthorized: not an admin" });
        }

        // 2. Check if event exists
        const eventRes = await pool.query(
            `SELECT * FROM events WHERE id = $1`,
            [eventId]
        );
        if (eventRes.rows.length === 0) {
            return res.status(404).json({ error: "Event not found" });
        }

        // 3. Soft delete: set is_cancelled = true
        await pool.query(
            `UPDATE events SET is_cancelled = true, updated_at = NOW() WHERE id = $1`,
            [eventId]
        );

        res.status(200).json({ message: "Event cancelled successfully (soft delete)" });
    } catch (err) {
        console.error("Soft delete error:", err);
        res.status(500).json({ error: "Database error", detail: err.message });
    }
};

module.exports = softDeleteEvent;
