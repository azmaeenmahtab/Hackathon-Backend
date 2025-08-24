const pool = require('../../config/db');

// Controller to register a student for a global event
const GlobalEventRegister = async (req, res) => {
    const { uid } = req.body;
    const event_id = req.params.event_id;

    if (!uid || !event_id) {
        return res.status(400).json({ error: "firebase_uid and event_id are required" });
    }

    const firebase_uid = uid;
    console.log("Registering user:", firebase_uid, "for event:", event_id);

    try {
        // 1. Validate user exists
        const userRes = await pool.query(
            `SELECT * FROM profiles WHERE firebase_uid = $1 AND is_active = true`,
            [firebase_uid]
        );
        if (userRes.rows.length === 0) {
            return res.status(404).json({ error: "User not found or inactive" });
        }

        // 2. Validate event exists
        const eventRes = await pool.query(
            `SELECT * FROM events WHERE id = $1 AND is_cancelled = false`,
            [event_id]
        );
        if (eventRes.rows.length === 0) {
            return res.status(404).json({ error: "Event not found or cancelled" });
        }

        const event = eventRes.rows[0];
        const now = new Date();

        // 3. Check registration deadline
        if (event.registration_deadline && now > new Date(event.registration_deadline)) {
            return res.status(400).json({ error: "Registration deadline has passed" });
        }

        // 4. Check capacity
        if (event.max_capacity) {
            const countRes = await pool.query(
                `SELECT COUNT(*) FROM registrations WHERE event_id = $1 AND status = 'registered'`,
                [event_id]
            );
            if (parseInt(countRes.rows[0].count, 10) >= event.max_capacity) {
                return res.status(400).json({ error: "Event capacity reached" });
            }
        }

        // 5. Check existing registration (any status)
        const existsRes = await pool.query(
            `SELECT * FROM registrations WHERE firebase_uid = $1 AND event_id = $2`,
            [firebase_uid, event_id]
        );

        if (existsRes.rows.length > 0) {
            const reg = existsRes.rows[0];
            if (reg.status === 'registered') {
                return res.status(400).json({ error: "Already registered for this event" });
            }

            // Update cancelled or no_show registration to registered
            const updateRes = await pool.query(
                `UPDATE registrations 
                 SET status = 'registered', registered_at = NOW() 
                 WHERE id = $1 
                 RETURNING *`,
                [reg.id]
            );

            return res.status(200).json({
                message: "Re-registered successfully",
                registration: updateRes.rows[0],
            });
        }

        // 6. Insert new registration if no previous record
        const insertRes = await pool.query(
            `INSERT INTO registrations (firebase_uid, event_id, status) 
             VALUES ($1, $2, 'registered') RETURNING *`,
            [firebase_uid, event_id]
        );

        res.status(201).json({
            message: "Registered successfully",
            registration: insertRes.rows[0],
        });

    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ error: "Database error", detail: err.message });
    }
};

module.exports = GlobalEventRegister;
