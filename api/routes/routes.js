let router = require('express').Router();
let entities = ['user', 'food', 'place'];

entities.forEach(ent => {
    var controller = require('../controllers/'+ent+'s.controller');

    router.route('/'+ent+'s')
        .get(controller.index)
        .post(controller.new);

    router.route('/'+ent+'s/:id')
        .get(controller.view)
        .patch(controller.updatePartial || controller.update)
        .put(controller.update)
        .delete(controller.delete);
});

module.exports = router;