const pool = require('../../config/db');

// Controller to get all events a student is registered for or attended
const studentMyEvents = async (req, res) => {
    const { uid } = req.body;
    if (!uid) return res.status(400).json({ error: 'User ID (uid) is required.' });

    try {
        // Registered events (status = 'registered')
        const registeredQ = await pool.query(
            `SELECT e.* FROM events e
       JOIN registrations r ON e.id = r.event_id
       WHERE r.firebase_uid = $1 AND r.status = 'registered'`,
            [uid]
        );
        // Attended events (status = 'attended')
        const attendedQ = await pool.query(
            `SELECT e.* FROM events e
       JOIN registrations r ON e.id = r.event_id
       WHERE r.firebase_uid = $1 AND r.status = 'attended'`,
            [uid]
        );
        res.json({
            registeredEvents: registeredQ.rows,
            attendedEvents: attendedQ.rows
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error', detail: err.message });
    }
};

module.exports = studentMyEvents;
