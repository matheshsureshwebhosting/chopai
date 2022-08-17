var express = require('express');
var router = express.Router();

const facilityaccessController = require('../controllers/floorthirteenrooms.controller')

/* GET table listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/create', facilityaccessController.create)
router.post('/update', facilityaccessController.update)
router.post('/view', facilityaccessController.view)
router.get('/viewall', facilityaccessController.viewall)
router.post('/destroy', facilityaccessController.destroy)

module.exports = router;
