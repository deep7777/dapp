var createError = require('http-errors')
var express = require('express')
var cors = require('cors')
var path = require('path')
var logger = require('morgan')
var bodyParser = require('body-parser')
var flash = require('express-flash')
var cookieParser = require('cookie-parser')
var expressValidator = require('express-validator')
var session = require('express-session')
var mysql = require('mysql')
var connection = require('./database')
var nodeRoutes = require('./routes/index')
var niftyRoute = require('./routes/nifty')
var stocksRoute = require('./routes/stocks')
var companyRoute = require('./routes/company')
const port = process.env.PORT || 3000;
var app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  session({
    secret: '123@abcd',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  }),
)
app.set('view engine', 'html');
app.use('/', nodeRoutes)
app.use('/nifty', niftyRoute)
app.use('/stocks', stocksRoute)
app.use('/company', companyRoute)
app.use(function (req, res, next) {
  next(createError(404))
})
app.listen(port, function () {
  console.log('Node server running on port : '+port)
})
// error
app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})
module.exports = app
