require('dotenv').config();
const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'sports_scheduler',
    password: process.env.DB_PASS || '',
    port: process.env.DB_PORT || 5432,
});

pool.connect((err, client, release) => {
    if (err) {
        console.error('Database Connection Failed:', err);
    } else {
        console.log('Database Connected Successfully!');
        client.query('SELECT NOW()', (err, res) => {
            release(); 
            if (err) {
                console.error('Query Error:', err);
            } else {
                console.log('Current Time:', res.rows[0]);
            }
        });
    }
});

module.exports = pool;
