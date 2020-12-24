const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    database: 'loans',
    host: 'localhost',
    port: 5432,
    password: 'nihal888'
});

client.connect().then(res => {
    console.log('PostgreSQL connected');
}).catch(err => {
    console.log('Error connecting to Database', err);
});

module.exports = client;