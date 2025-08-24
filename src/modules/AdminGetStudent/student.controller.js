const pool = require('../../config/db');

//GET ALL STUDENTS
const getAllStudentsController = async (req, res) => {
    try {
        // Check if user is admin
        if (req.body.role !== "admin") {
            return res.status(403).json({
                status: false,
                message: "Only Admin can access student profiles."
            });
        }

        const query = `SELECT firebase_uid, email, name, photo_url, university, is_active, created_at, updated_at
                       FROM public.profiles
                       WHERE role = 'student'
                       ORDER BY created_at ASC;`;

        const result = await pool.query(query);

        res.status(200).json({
            status: true,
            message: "Student profiles retrieved successfully",
            data: result.rows
        });

    } catch (error) {
        console.error("Error fetching student profiles:", error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

module.exports = { getAllStudentsController };
