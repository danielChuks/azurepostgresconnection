const express = require('express')
const client = require('./connect')
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());


const PORT = 6000;

/// this code enable you post to the azure database 
app.post("/schedules", async(req, res) => {
    try{
        const { description } = req.body;
        const newSchedules = await client.query("INSERT INTO schedules(description) VALUES($1) RETURNING * ", 
        [description])

        res.json(newSchedules.rows[0])
    }catch(err){
        console.log(err.message);
        return;
    }
})

// this code deletes schedules from azure psql server 
app.delete("/schedules/:id", async(req, res) => {
    try {
       const { id } = req.params;
       const deleteSchedule  = await client.query("DELETE FROM schedules WHERE schedule_id = $1", [id])
       res.json("schedule deleted successfully")
    } catch (error) {
        console.log(error.message)
    }
})

app.listen(PORT, () => {
    console.log(`app is listening to port ${PORT}`)
})