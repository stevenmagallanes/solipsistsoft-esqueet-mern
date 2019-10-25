let router = require('express').Router();

var controller = require('../controllers/foods.controller');

router.route('/foods/')
    .get(controller.index)
    .post(controller.new);

router.route('/foods/:id')
    .get(controller.view)
    .patch(controller.update)
    .put(controller.update)
    .delete(controller.delete);

module.exports = router;