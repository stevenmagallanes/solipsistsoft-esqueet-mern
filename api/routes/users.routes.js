let router = require('express').Router();

var controller = require('../controllers/users.controller');

router.route('/users')
    .get(controller.index)
    .post(controller.new);

router.route('/users/:id')
    .get(controller.view)
    .patch(controller.update)
    .put(controller.update)
    .delete(controller.delete);

module.exports = router;