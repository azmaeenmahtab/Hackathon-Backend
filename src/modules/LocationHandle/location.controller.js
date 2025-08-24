const pool = require('../../config/db');

// Controller to create or find a location by name
const createOrFindLocation = async (req, res) => {
    const { name, room, campus, capacity } = req.body;
    if (!name) return res.status(400).json({ error: 'Location name is required.' });
    try {
        // Try to find existing location by name
        const findQ = await pool.query('SELECT * FROM locations WHERE name = $1', [name]);
        if (findQ.rows.length > 0) return res.json(findQ.rows[0]);
        // Create new location
        const insertQ = await pool.query(
            'INSERT INTO locations (name, room, campus, capacity) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, room || null, campus || null, capacity || null]
        );
        res.json(insertQ.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Database error', detail: err.message });
    }
};

module.exports = createOrFindLocation;
