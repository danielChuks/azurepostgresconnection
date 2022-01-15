const pg = require('pg')

//include your database connection string from the azure psql server you created 
const config = {
    host: 'servername',
    user: 'username',
    password: 'password',
    database: 'DB name',
    port: 5432,
    ssl: true
}

const client = new pg.Client(config);

client.connect(err  => {
    if(err){
        console.log(err)
    } else {
        query
    }
});



//this code output everything in the database
const query = 'SELECT * FROM schedules';
client.query(query, (err , res) => {
    console.log(res.rows)
})

module.exports = client;


