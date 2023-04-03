const sql = require('mssql')
/*
Config for connect to database
*/ 
var dbSettings = {      
    user: 'sa',                    
    password: '1234',
    server: '25.43.228.152',
    database: 'II P',
    port:  1433,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
}

/*
Function to connect to the database
*/ 
async function getConnection() {
    try {
    const pool = await sql.connect(dbSettings);
    console.dir(pool)
    return pool;
    } catch (error) {
        console.error(error);
    }
}
module.exports = {getConnection}