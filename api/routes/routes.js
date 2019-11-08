let router = require('express').Router();
let entities = ['user', 'food', 'place'];
let guard = require('express-jwt-permissions')();

entities.forEach(ent => {
    var controller = require('../controllers/' + ent + 's.controller');

    router.route('/' + ent + 's')
        .get(controller.index)
        .post(controller.new);

    router.route('/' + ent + 's/:id')
        .get(controller.view)
        .patch(controller.updatePartial || controller.update)
        .put(controller.update)
        .delete(controller.delete);

    if (controller.registerRoutes) {
        controller.registerRoutes().forEach(route => {
            route.actions.forEach(a => {
                switch (a.verb) {
                    case "get":
                        router.get(route.path, guard.check(a.permission));
                        break;
                    case "post":
                        router.post(route.path, guard.check(a.permission));
                        break;
                    case "delete":
                        router.delete(route.path, guard.check(a.permission));
                        break;
                    case "put":
                    case "patch":
                        router.put(route.path, guard.check(a.permission));
                        break;
                    default:
                        break;
                }
                let r = router.route(route.path);
                switch (a.verb) {
                    case "get":
                        r.get(a.action);
                        break;
                    case "post":
                        r.post(a.action);
                        break;
                    case "delete":
                        r.delete(a.action);
                        break;
                    case "put":
                    case "patch":
                        r.put(a.action);
                        break;
                    default:
                        break;
                }
            })
        });
    }
});

module.exports = router;