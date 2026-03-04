const pool = require('../../config/db');

// Controller to load all events created by a specific user (admin)
const loadAllEvents = async (req, res) => {
    const { uid } = req.body;
    if (!uid) return res.status(400).json({ error: 'User ID (uid) is required.' });

    try {
        // Fetch all events created by this user
        const eventsQ = await pool.query('SELECT * FROM events WHERE created_by = $1', [uid]);
        res.json(eventsQ.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error', detail: err.message });
    }
};

module.exports = loadAllEvents;
