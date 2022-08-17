var express = require('express');
var router = express.Router();

const bookingController = require('../controllers/booking.controller')

/* GET table listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', bookingController.create)
router.post('/update', bookingController.update)
router.post('/view', bookingController.view)
router.post('/viewbyemployee', bookingController.viewbyuserid)
router.post('/viewbytime', bookingController.viewbyutime)
router.get('/viewall', bookingController.viewall)
router.post('/destroy', bookingController.destroy)
router.post('/viewbydate', bookingController.viewbydate)
router.post('/viewbydatefilter', bookingController.viewbydatefilter)
router.post('/viewbydateemployee', bookingController.viewbydateemployee)

router.post('/viewbyfloor', bookingController.viewbyfloor)
router.post('/currentbooking', bookingController.currentbooking)
router.post('/bookinghistory', bookingController.bookinghistory)
router.post('/avalibility', bookingController.avalibility)
router.post('/viewbydatetime', bookingController.viewbydatetime)
router.post('/exportfile', bookingController.exportfile)
router.post('/availabilitynew', bookingController.availabilitynew)
router.get('/statusupdate', bookingController.statusupdate)
router.post('/updatebooking', bookingController.updatebooking)



module.exports = router;
