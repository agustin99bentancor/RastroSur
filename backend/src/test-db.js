import 'dotenv/config'; 
import pkg from 'pg';
const { Pool } = pkg;

console.log('Attempting to connect with URL:', process.env.DATABASE_URL);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Connection Error:', err);
    } else {
        console.log('Database Connected Successfully!');
        console.log('Current time from DB:', res.rows[0].now);
    }
    pool.end();
});