const router = require('express').Router();

const ProductController = require('./controller');
const isAuthenticatedMiddleware = require('../isAuthenticated');

router.get('/', 
[isAuthenticatedMiddleware.check], 
ProductController.getAllProducts);

router.get('/:productId', 
[isAuthenticatedMiddleware.check], 
ProductController.getProductById);

router.post('/', 
[isAuthenticatedMiddleware.check], 
ProductController.createProduct);

router.post('/lot', 
[isAuthenticatedMiddleware.check], 
ProductController.createProducts);

router.patch('/:productId', 
[isAuthenticatedMiddleware.check],
ProductController.updateProduct);

router.delete('/:productId', 
[isAuthenticatedMiddleware.check], 
ProductController.deleteProduct);

module.exports = router;
