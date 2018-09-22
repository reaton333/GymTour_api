// This file will contain all 
// the routes associated with gym stuff

const express =      require('express')
const router =       express.Router()

router.get('/gyms', (req, res) => {

  console.log("####Show some messages...")
  res.end()
})


// Exports this router out of the current file!
module.exports = router