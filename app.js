// load our app server using express

const express      = require('express')
const app          = express()
const morgan       = require('morgan')
const mysql        = require('mysql')


// morgan is a logger for our Server
// that helps show us information about varous requests
// short
// combined
app.use(morgan('combined'))

// Select all gyms query
app.get('/gyms', (req, res)  => {

  console.log("Fetching all gyms in db!")
  const queryString = "SELECT * FROM gyms"

  const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'Gamecock123@',
    database: 'gym_tour_db'
  })

  connection.query(queryString, (err, rows, fields) => {

    console.log("Executing query!")

    if (err) {
      console.log("###########")
      console.log("###########")
      console.log("###########Begin Error message: ")
      console.log(err)
      res.end()
    } else {  
      // No error, we have data!!!
      res.json(rows)
      res.end()
    }
  })

  // need to not close the response until we are doing querying
  //res.end()
})

// Select all gyms query
app.get('/gyms/:id', (req, res)  => {

  console.log("Searching for gyms with id: " + req.params.id)
  const queryString = "SELECT * FROM gyms WHERE gyms.id = ?"

  const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'Gamecock123@',
    database: 'gym_tour_db'
  })

  const gymId = req.params.id
  connection.query(queryString, [gymId], (err, rows, fields) => {

    console.log("Executing query!")

    if (err) {
      console.log("###########")
      console.log("###########")
      console.log("###########Begin Error message: ")
      console.log(err)
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

// specify root directory
// route #1
app.get("/", (req, res)  => {

  console.log("Responding to the root route!!!")
  res.send("Welcome to the GymTour api page!")
})

// localhost:3003
app.listen(3003, () => {
  // logs to server!
  console.log("Server is up and listening on 3003....")
})