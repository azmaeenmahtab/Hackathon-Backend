const pool = require('../../config/db');

const createEventController = async (req, res) => {
    try {
        if (req.body.role !== "admin") {
            return res.status(403).json({
                status: false,
                message: "Only Admin can create events."
            });
        }

        const {
            title,
            description,
            category,
            location_id,
            image_url,
            start_at,
            end_at,
            registration_deadline,
            max_capacity,
            created_by,
            is_cancelled
        } = req.body;

        const duplicateQuery = `
            SELECT * FROM public.events 
            WHERE LOWER(title) = LOWER($1) 
              AND start_at = $2 
              AND location_id = $3
              AND is_cancelled = false;
        `;
        const duplicateResult = await pool.query(duplicateQuery, [title, start_at, location_id]);

        if (duplicateResult.rowCount > 0) {
            return res.status(400).json({
                status: false,
                message: "An event with the same title, start time, and location already exists."
            });
        }

        const query = `
            INSERT INTO public.events (
                title,
                description,
                category,
                location_id,
                image_url,
                start_at,
                end_at,
                registration_deadline,
                max_capacity,
                created_by,
                is_cancelled,
                created_at,
                updated_at
            ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,NOW(),NOW())
            RETURNING *;
        `;

        const values = [
            title,
            description,
            category,
            location_id,
            image_url,
            start_at,
            end_at,
            registration_deadline,
            max_capacity,
            created_by,
            is_cancelled || false
        ];

        const result = await pool.query(query, values);

        res.status(201).json({
            status: true,
            message: "Event created successfully",
            data: result.rows[0]
        });

    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

//DELETE EVENT
const deleteEventController = async (req, res) => {
    try {
        if (req.body.role !== "admin") {
            return res.status(403).json({
                status: false,
                message: "Only Admin can delete events."
            });
        }

        const { id } = req.params; // Event ID from URL

        const query = `DELETE FROM public.events WHERE id = $1 RETURNING *;`;
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ status: false, message: "Event not found" });
        }

        res.status(200).json({
            status: true,
            message: "Event deleted successfully",
            data: result.rows[0]
        });

    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};



//UPDATE EVENT
const updateEventController = async (req, res) => {
    try {
        if (req.body.role !== "admin") {
            return res.status(403).json({
                status: false,
                message: "Only Admin can update events."
            });
        }

        const { id } = req.params; // Event ID from URL
        const {
            title,
            description,
            category,
            location_id,
            image_url,
            start_at,
            end_at,
            registration_deadline,
            max_capacity,
            is_cancelled
        } = req.body;

        const query = `
            UPDATE public.events
            SET
                title = COALESCE($1, title),
                description = COALESCE($2, description),
                category = COALESCE($3, category),
                location_id = COALESCE($4, location_id),
                image_url = COALESCE($5, image_url),
                start_at = COALESCE($6, start_at),
                end_at = COALESCE($7, end_at),
                registration_deadline = COALESCE($8, registration_deadline),
                max_capacity = COALESCE($9, max_capacity),
                is_cancelled = COALESCE($10, is_cancelled),
                updated_at = NOW()
            WHERE id = $11
            RETURNING *;
        `;

        const values = [
            title,
            description,
            category,
            location_id,
            image_url,
            start_at,
            end_at,
            registration_deadline,
            max_capacity,
            is_cancelled,
            id
        ];

        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ status: false, message: "Event not found" });
        }

        res.status(200).json({
            status: true,
            message: "Event updated successfully",
            data: result.rows[0]
        });

    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

//GET EVENT BY ID
const getEventByIdController = async (req, res) => {
    try {
        if (req.body.role !== "admin") {
            return res.status(403).json({
                status: false,
                message: "Only Admin can access events."
            });
        }

        const { id } = req.params;

        const query = `SELECT * FROM public.events WHERE id = $1;`;
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                status: false,
                message: "Event not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Event retrieved successfully",
            data: result.rows[0]
        });

    } catch (error) {
        console.error("Error fetching event:", error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

//GET ALL EVENT
const getAllEventsController = async (req, res) => {
    try {
        if (req.body.role !== "admin") {
            return res.status(403).json({
                status: false,
                message: "Only Admin can access events."
            });
        }

        const { category, upcoming } = req.query;

        let query = `SELECT * FROM public.events WHERE 1=1`;
        const values = [];
        let index = 1;

        if (category) {
            query += ` AND category = $${index}`;
            values.push(category);
            index++;
        }

        if (upcoming === "true") {
            query += ` AND start_at > NOW()`;
        }

        query += ` ORDER BY start_at ASC;`;

        const result = await pool.query(query, values);

        res.status(200).json({
            status: true,
            message: "Events retrieved successfully",
            data: result.rows
        });

    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

module.exports = {
    deleteEventController,
    createEventController,
    getEventByIdController,
    getAllEventsController,
    updateEventController
};