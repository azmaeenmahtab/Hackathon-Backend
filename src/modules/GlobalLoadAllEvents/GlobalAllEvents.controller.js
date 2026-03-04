const pool = require('../../config/db');

// Controller to get all events from all admins
const getAllEvents = async (req, res) => {
    try {
        const eventsQ = await pool.query('SELECT * FROM events');
        res.json(eventsQ.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error', detail: err.message });
    }
};

module.exports = getAllEvents;
