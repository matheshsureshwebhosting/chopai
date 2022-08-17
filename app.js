var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const mqtt = require('mqtt')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tablesRouter = require('./routes/tables');
var floorthirteenRouter = require('./routes/tablethirteen');
var floorthirteenroomRouter = require('./routes/floorthirteenrooms');
var bookingRouter = require('./routes/booking');
var facilityaccessRouter = require('./routes/facilityaccesstable');
var logdataRouter = require('./routes/logdata')
var roombookingRouter = require('./routes/roombooking')
var emailRouter = require('./routes/email')
var axios = require('axios')
var app = express();
app.use(
  cors()
);
app.use("/download", express.static(path.join(__dirname + "/download")))
// const client = mqtt.connect('mqtt://broker.hivemq.com')
// const topic = 'mqtt/face/1872722/Rec'

// client.on('connect', () => {
//   console.log('Connected')
//   var response = []
//   client.subscribe([topic], (data) => {
//     console.log(data)
//     if (data != null) {
//       response = data
//       console.log(true)
//     } else {
//       console.log(false)
//     }
//     // console.log(`Subscribe to topic '${topic}'`, data)
//     console.log(response)
//   })

//   // client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
//   //   if (error) {
//   //     console.error(error)
//   //   }
//   // })

// })


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tables', tablesRouter);
app.use('/floorthirteen', floorthirteenRouter);
app.use('/floorthirteenrooms', floorthirteenroomRouter);
app.use('/booking', bookingRouter);
app.use('/facilityaccess', facilityaccessRouter);
app.use('/logdata', logdataRouter);
app.use('/roombooking', roombookingRouter);
app.use('/email', emailRouter);

// getstatus = async () => {
//   axios.get('http://54.227.36.18:3001/roombooking/statusupdate')
//   axios.get('http://54.227.36.18:3001/booking/statusupdate')
//   setTimeout(() => {
//     getstatus()
//   }, 10000)
// }
// getstatus()
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
