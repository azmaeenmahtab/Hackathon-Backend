const pool = require('../../config/db');

// Fetch all events created by the admin, total registrations, and total certificates issued for those events
const adminStats = async (req, res) => {
    const { uid } = req.body;
    if (!uid) return res.status(400).json({ error: 'User ID (uid) is required.' });

    try {
        // 1. All events created by this admin
        const eventsQ = await pool.query('SELECT * FROM events WHERE created_by = $1', [uid]);
        const events = eventsQ.rows;
        const eventIds = events.map(e => e.id);

        let totalRegistrations = 0;
        let totalCertificates = 0;
        let registrations = [];
        let certificates = [];

        if (eventIds.length > 0) {
            // 2. All registrations in these events
            const regArrQ = await pool.query(
                'SELECT * FROM registrations WHERE event_id = ANY($1)',
                [eventIds]
            );
            registrations = regArrQ.rows;
            totalRegistrations = registrations.length;

            // 3. All certificates issued in these events
            const certArrQ = await pool.query(
                'SELECT * FROM certificates WHERE event_id = ANY($1)',
                [eventIds]
            );
            certificates = certArrQ.rows;
            totalCertificates = certificates.length;
        }

        res.json({
            events,
            totalRegistrations,
            registrations,
            totalCertificates,
            certificates
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error', detail: err.message });
    }
};

module.exports = adminStats;
