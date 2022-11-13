var express = require('express')
var connection = require('../database.js');
var router = express.Router()

router.get('/', function (req, res, next) {
  connection.query('SELECT * FROM companies where options=1 ORDER BY csymbol asc', function (err, rows) {
    console.log(rows);
    if (err) {
      res.send(err.message)
      
    } else {
      res.json(rows)
    }
  })
});


module.exports = router
