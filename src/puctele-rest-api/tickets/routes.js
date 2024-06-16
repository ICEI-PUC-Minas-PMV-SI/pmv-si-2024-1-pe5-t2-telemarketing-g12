const router = require('express').Router();

const TicketController = require('./controller');
const isAuthenticatedMiddleware = require('../isAuthenticated');

router.get('/', 
[isAuthenticatedMiddleware.check], 
TicketController.getAllTickets);

router.get('/:ticketId', 
[isAuthenticatedMiddleware.check], 
TicketController.getTicketById);

router.post('/', 
[isAuthenticatedMiddleware.check], 
TicketController.createTicket);

router.post('/lot', 
[isAuthenticatedMiddleware.check], 
TicketController.createTickets);

router.patch('/:ticketId', 
[isAuthenticatedMiddleware.check],
TicketController.updateTicket);

router.delete('/:ticketId', 
[isAuthenticatedMiddleware.check], 
TicketController.deleteTicket);

module.exports = router;
