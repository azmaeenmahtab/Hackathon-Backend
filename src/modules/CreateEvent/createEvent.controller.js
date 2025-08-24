const pool = require('../../config/db');

// Controller to create a new event using uid from body
const createEvent = async (req, res) => {
    const { uid, title, description, category, location_id, image_url, start_at, end_at, registration_deadline, max_capacity, is_cancelled } = req.body;
    if (!uid) return res.status(400).json({ error: 'User ID (uid) is required.' });
    if (!title || !start_at || !end_at) return res.status(400).json({ error: 'Title, start_at, and end_at are required.' });

    try {
        // Check for duplicate event (same title, start time, and location)
        const duplicateQuery = `SELECT * FROM public.events WHERE LOWER(title) = LOWER($1) AND start_at = $2 AND location_id = $3 AND is_cancelled = false;`;
        const duplicateResult = await pool.query(duplicateQuery, [title, start_at, location_id]);
        if (duplicateResult.rowCount > 0) {
            return res.status(400).json({ error: 'An event with the same title, start time, and location already exists.' });
        }

        // Insert the new event
        const insertQuery = `INSERT INTO public.events (title, description, category, location_id, image_url, start_at, end_at, registration_deadline, max_capacity, created_by, is_cancelled, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,NOW(),NOW()) RETURNING *;`;
        const values = [title, description, category, location_id, image_url, start_at, end_at, registration_deadline, max_capacity, uid, is_cancelled || false];
        const result = await pool.query(insertQuery, values);
        res.status(201).json({ message: 'Event created successfully', event: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error', detail: err.message });
    }
};

module.exports = createEvent;
