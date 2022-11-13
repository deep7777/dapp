var express = require('express')
var connection = require('../database.js')
var router = express.Router()

router.get('/', function (req, res, next) {
  console.log("nifty ....");
  connection.query('SELECT * FROM nifty ORDER BY dateval desc', function (err, rows) {
    console.log(rows);
    if (err) {
      res.send(err.message)
      
    } else {
      res.json(rows)
    }
  })
});

router.get('/weekly', function (req, res, next) {
  console.log("nifty ....");
  connection.query('SELECT * FROM weekly ORDER BY id desc', function (err, rows) {
    console.log(rows);
    if (err) {
      req.send(err)
      
    } else {
      res.json(rows)
    }
  })
})

router.get('/monthly', function (req, res, next) {
  console.log("nifty ....");
  connection.query('SELECT * FROM monthly ORDER BY dateval desc', function (err, rows) {
    console.log(rows);
    if (err) {
      req.send(err)
      
    } else {
      res.json(rows)
    }
  })
})
module.exports = router
