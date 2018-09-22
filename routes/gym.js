// This file will contain all 
// the routes associated with gym stuff
const express      = require('express')
const mysql        = require('mysql')
const router       = express.Router()

// Select all gyms
router.get('/gyms', (req, res)  => {

    console.log("Fetching all gyms in db!")

    const queryString = "SELECT * FROM gyms"
    const connection = getConnection()
  
    connection.query(queryString, (err, rows, fields) => {
  
      if (err) {
          
        console.log("###########Begin Error message: ")
        console.log(err)
        res.end()
      } else {  
        // No error, we have data!!!
        res.json(rows)
        res.end()
      }
    })
    // need to not close the response until we are done querying
    //res.end()
})

// Select gym by id
router.get('/gyms/:id', (req, res)  => {

    console.log("Searching for gyms with id: " + req.params.id)
    const queryString = "SELECT * FROM gyms WHERE gyms.id = ?"
  
    const connection = getConnection()
  
    const gymId = req.params.id
    connection.query(queryString, [gymId], (err, rows, fields) => {
  
      if (err) {

        console.log("###########Begin Error message: ")
        console.log(err)
        res.sendStatus(500)
        res.send("There was an error with the query!")
        res.end()
      } else {  

        // No error, we have data!!!
        if (rows.length < 1) {
  
          res.send("No gyms found by that id!")
          res.end()
        } else {
          res.json(rows)
        }
      }
    })
  
    // need to not close the response until we are doing querying
    //res.end()
  })


// creating connection pool!
// if you have too many connections running
// at once you can see issues, a pool solves this
const pool = mysql.createPool({
    connectionLimit: 10,  // might need to tweak this later
    host: 'localhost',
    user: 'root',
    password: 'Gamecock123@',
    database: 'gym_tour_db'
})

// separate getConnection function so we don't
// have to recall it a million times!!!!
function getConnection() {
    return pool
}

// Exports this router out of the current file!
module.exports = router