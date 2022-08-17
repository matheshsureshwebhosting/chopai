var express = require('express');
var router = express.Router();

const tableController = require('../controllers/floorthirteen.controller')

/* GET table listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', tableController.create)
router.put('/update', tableController.update)
router.get('/view', tableController.view)
router.get('/viewall', tableController.viewall)
router.delete('/destroy', tableController.destroy)

module.exports = router;
