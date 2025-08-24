const pool = require('../../config/db');

// Get all information related to a user from all tables

const getUserInfo = async (req, res) => {
    // Accept uid from params or body
    const uid = req.params.uid || req.body.uid;
    if (!uid) return res.status(400).json({ error: 'User ID (uid) is required.' });

    try {
        // 1. Profile
        const profileQ = await pool.query('SELECT * FROM profiles WHERE firebase_uid = $1', [uid]);
        if (profileQ.rows.length === 0) return res.status(404).json({ error: 'User not found.' });
        const profile = profileQ.rows[0];

        // 2. Events created by user (if admin)
        const createdEventsQ = await pool.query('SELECT * FROM events WHERE created_by = $1', [uid]);

        // 3. Registrations (events user registered for)
        const registrationsQ = await pool.query('SELECT * FROM registrations WHERE firebase_uid = $1', [uid]);

        // 4. Certificates
        const certificatesQ = await pool.query('SELECT * FROM certificates WHERE firebase_uid = $1', [uid]);

        // 5. Feedback
        const feedbackQ = await pool.query('SELECT * FROM feedback WHERE firebase_uid = $1', [uid]);

        // 6. Notifications
        const notificationsQ = await pool.query('SELECT * FROM notifications WHERE firebase_uid = $1', [uid]);

        // 7. Event views
        const eventViewsQ = await pool.query('SELECT * FROM event_views WHERE firebase_uid = $1', [uid]);

        // 8. Attendance scans (as admin or attendee)
        const attendanceScansQ = await pool.query('SELECT * FROM attendance_scans WHERE scanned_by = $1 OR registration_id IN (SELECT id FROM registrations WHERE firebase_uid = $1)', [uid]);

        // 9. Chatbot logs
        const chatbotLogsQ = await pool.query('SELECT * FROM chatbot_logs WHERE firebase_uid = $1', [uid]);

        res.json({
            profile,
            createdEvents: createdEventsQ.rows,
            registrations: registrationsQ.rows,
            certificates: certificatesQ.rows,
            feedback: feedbackQ.rows,
            notifications: notificationsQ.rows,
            eventViews: eventViewsQ.rows,
            attendanceScans: attendanceScansQ.rows,
            chatbotLogs: chatbotLogsQ.rows
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error', detail: err.message });
    }
};

module.exports = getUserInfo;
