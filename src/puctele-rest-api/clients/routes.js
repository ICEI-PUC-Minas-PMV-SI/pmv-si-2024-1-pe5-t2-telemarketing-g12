const router = require('express').Router();

const ClientController = require('./controller');
const isAuthenticatedMiddleware = require('../isAuthenticated');

router.get('/', 
[isAuthenticatedMiddleware.check], 
ClientController.getAllClients);

router.get('/:clientId', 
[isAuthenticatedMiddleware.check], 
ClientController.getClientById);

router.post('/', 
[isAuthenticatedMiddleware.check], 
ClientController.createClient);

router.post('/lot', 
[isAuthenticatedMiddleware.check], 
ClientController.createClients);

router.patch('/:clientId', 
[isAuthenticatedMiddleware.check],
ClientController.updateClient);

router.delete('/:clientId', 
[isAuthenticatedMiddleware.check], 
ClientController.deleteClient);

module.exports = router;
