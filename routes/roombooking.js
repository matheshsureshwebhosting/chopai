var express = require('express');
var router = express.Router();

const bookingController = require('../controllers/roombooking.controller')

/* GET table listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', bookingController.create)
router.post('/update', bookingController.update)
router.post('/view', bookingController.view)
router.get('/viewall', bookingController.viewall)
router.post('/destroy', bookingController.destroy)
router.post('/viewbyemployee', bookingController.viewbyuserid)
router.post('/viewbytime', bookingController.viewbyutime)
router.post('/availability', bookingController.availability)
router.post('/cancelbooking', bookingController.cancel)
router.post('/viewbyfloor', bookingController.viewbyfloor)
router.post('/viewbydate', bookingController.viewbydate)
router.post('/currentbooking', bookingController.currentbooking)
router.post('/bookinghistory', bookingController.bookinghistory)
router.post('/viewbydatetime', bookingController.viewbydatetime)
router.post('/exportfile', bookingController.exportfile)
router.post('/bookedroom', bookingController.bookedroom)
router.get('/statusupdate', bookingController.statusupdate)
router.post('/roomdetails', bookingController.roomdetails)
router.post('/viewbydateemployee', bookingController.viewbydateemployee)
router.post('/availabilitynew', bookingController.availabilitynew)
router.post('/currentbookingnew', bookingController.currentbookingnew)
router.post('/updateroom', bookingController.updateroom)



module.exports = router;
