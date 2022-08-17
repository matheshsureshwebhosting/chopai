var express = require('express');
var router = express.Router();

const userController = require('../controllers/users.controller')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', userController.create)
router.post('/update', userController.update)
router.get('/view', userController.view)
router.get('/viewall', userController.viewall)
router.post('/destroy', userController.destroy)
router.post('/login', userController.login)

router.post('/approveaccept', userController.approveaccept)
router.post('/approvecancel', userController.approvecancel)
router.post('/removefromdevice', userController.removefromdevice)
router.post('/sendotp', userController.sendotp)
router.post('/verifyotp', userController.verifyotp)
router.post('/viewbyemail', userController.viewbyemail)


module.exports = router;
