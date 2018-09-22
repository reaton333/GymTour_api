// load our app server using express
const express      = require('express')
const app          = express()
const morgan       = require('morgan')

// morgan is a logger for our Server
// that helps show us information about varous requests
// short
// combined
app.use(morgan('combined'))

// lets see how to start refactoring our code
// ill shoow you how to use something called a router

const gymsRouter          = require("./routes/gym.js")
const equipmentRouter     = require("./routes/equipment.js")

app.use(gymsRouter)
app.use(equipmentRouter)

// specify root directory
app.get("/", (req, res)  => {

  console.log("Responding to the root route!!!")
  res.send("Welcome to the GymTour api page!")
})

// localhost:3003
app.listen(3003, () => {
  // logs to server!
  console.log("Server is up and listening on port 3003....")
})
