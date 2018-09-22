// This file will contain all 
// the routes associated with gym stuff
const express      = require('express')
const mysql        = require('mysql')
const router       = express.Router()


// Select all equipment
router.get('/equipment', (req, res)  => {

    console.log("Fetching all equipment in db!")

    const queryString = "SELECT * FROM equipment"
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

// Select equipment by id
router.get('/equipment/:id', (req, res)  => {

    console.log("Searching for equipment with id: " + req.params.id)
    const queryString = "SELECT * FROM equipment WHERE equipment.id = ?"
  
    const connection = getConnection()
  
    const equipmentId = req.params.id
    connection.query(queryString, [equipmentId], (err, rows, fields) => {
  
      if (err) {

        console.log("###########Begin Error message: ")
        console.log(err)
        res.sendStatus(500)
        res.send("There was an error with the query!")
        res.end()
      } else {  

        // No error, we have data!!!
        if (rows.length < 1) {
  
          res.send("No equipment found by that id!")
          res.end()
        } else {
          res.json(rows)
        }
      }
    })
  
    // need to not close the response until we are doing querying
    //res.end()
  })


// separate getConnection function so we don't
// have to recall it a million times!!!!
function getConnection() {
    return mysql.createConnection({
  
      host: 'localhost',
      user: 'root',
      password: 'Gamecock123@',
      database: 'gym_tour_db'
    })
  }

// Exports this router out of the current file!
module.exports = router