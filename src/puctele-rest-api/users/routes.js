const router = require('express').Router();

const isAuthenticatedMiddleware = require('../isAuthenticated');
const UserController = require('./controller');

router.get('/:userId', [isAuthenticatedMiddleware.check], UserController.getUser);

router.patch('/', [isAuthenticatedMiddleware.check], UserController.updateUser);

router.get('/', [isAuthenticatedMiddleware.check], UserController.getAllUsers);

router.delete('/:userId', [isAuthenticatedMiddleware.check], UserController.deleteUser);

module.exports = router;
