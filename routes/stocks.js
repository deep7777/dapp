var express = require('express')
var connection = require('../database.js')
var router = express.Router()

router.get('/', function (req, res, next) {
  connection.query(`SELECT id,DATE_FORMAT(dateval, "%Y-%d-%m") as datestr,symbol,dvlen,prevclose,open,high,low,last,close,volume,turnover,trades,deliverablevolume,deliverable\n
  FROM stockdata ORDER BY dateval desc`, function (err, rows) {
    console.log(rows);
    if (err) {
      res.send(err.message)
      
    } else {
      res.json(rows)
    }
  })
})

router.get('/intraday', function (req, res, next) {
  connection.query('SELECT id,name,cname,otype,price,DATE_FORMAT(dateval, "%Y-%d-%m") as datestr,volume,points,close,status FROM intraday order by dateval desc', function (err, rows) {
    console.log(rows);
    if (err) {
      res.send(err.message)
      
    } else {
      res.json(rows)
    }
  })
})

router.get('/quarter', function (req, res, next) {
  connection.query('SELECT id,csymbol,high,low,diff,DATE_FORMAT(qstart, "%Y-%d-%m") as start,DATE_FORMAT(qend, "%Y-%d-%m") as end FROM quarter order by csymbol,qstart desc', function (err, rows) {
    console.log(rows);
    if (err) {
      res.send(err.message)
      
    } else {
      res.json(rows)
    }
  })
})


router.get('/:symbol', function (req, res, next) {
  const symbol = req.params.symbol;
  console.log(symbol);
  connection.query(`SELECT id,DATE_FORMAT(dateval, "%Y-%d-%m") as datestr,symbol,dvlen,prevclose,open,high,low,last,close,volume,turnover,trades,deliverablevolume,deliverable\n
  FROM stockdata where symbol='${symbol}' ORDER BY dateval desc`, function (err, rows) {
    if (err) {
      res.send(err.message)
    } else {
      res.json(rows)
    }
  })
});



router.get('/quarter/:symbol', function (req, res, next) {
  const symbol = req.params.symbol;
  connection.query(`SELECT id,csymbol,high,low,diff,DATE_FORMAT(qstart, "%Y-%d-%m") as start,DATE_FORMAT(qend, "%Y-%d-%m") as end FROM quarter where csymbol='${symbol}'   ORDER BY qstart desc`, function (err, rows) {
    console.log(rows);
    if (err) {
      res.send(err.message)
      
    } else {
      res.json(rows)
    }
  })
})

router.get('/kb/:dateval', function (req, res, next) {
  const dateval = req.params.dateval;
  connection.query(`select id,dateval,symbol,volume,deliverablevolume,deliverable,dvlen,close from stockdata where dvlen!=(select len from companies where csymbol=symbol) and dateval='${dateval}'  order by symbol asc`, function (err, rows) {
    console.log(rows);
    if (err) {
      res.send(err.message)
      
    } else {
      res.json(rows)
    }
  })
})

router.get('/quarterExtend/:dateval', function (req, res, next) {
  const dateval = req.params.dateval;
  connection.query(`select distinct(csymbol) as id,diff,DATE_FORMAT(qstart, "%Y-%d-%m") as qstart from quarter q where q.qstart='${dateval}'  and diff >= (select max(diff) from quarter where csymbol=q.csymbol and qstart!=q.qstart)`, function (err, rows) {
    console.log(rows);
    if (err) {
      res.send(err.message)
      
    } else {
      res.json(rows)
    }
  })
})

module.exports = router
