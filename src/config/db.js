// Load environment variables
require('dotenv').config();
// Supabase setup


const { Pool } = require("pg");
require("dotenv").config();


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
<<<<<<< HEAD
    ssl: false
=======
    ssl:false 
>>>>>>> ffe57b79adfc219b9a7f5f5f59d1885d3bc35b81
});

// Test the database connection and log the result
pool.connect()
    .then(client => {
        console.log('Database connected successfully!');
        client.release();
    })
    .catch(err => {
        console.error('Database connection error:', err.stack);
    });

module.exports = pool;