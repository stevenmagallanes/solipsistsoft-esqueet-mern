let router = require('express').Router();

var controller = require('../controllers/places.controller');

router.route('/places/')
    .get(controller.index)
    .post(controller.new);

router.route('/places/:id')
    .get(controller.view)
    .patch(controller.update)
    .put(controller.update)
    .delete(controller.delete);

module.exports = router;