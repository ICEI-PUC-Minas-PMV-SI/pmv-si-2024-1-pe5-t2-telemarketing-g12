const router = require('express').Router();

const CompanyController = require('./controller');
const isAuthenticatedMiddleware = require('../isAuthenticated');

router.get('/', 
[isAuthenticatedMiddleware.check], 
CompanyController.getAllCompanies);

router.get('/:companyId', 
[isAuthenticatedMiddleware.check], 
CompanyController.getCompanyById);

router.post('/', 
[isAuthenticatedMiddleware.check], 
CompanyController.createCompany);

router.post('/lot', 
[isAuthenticatedMiddleware.check], 
CompanyController.createCompanies);

router.patch('/:companyId', 
[isAuthenticatedMiddleware.check],
CompanyController.updateCompany);

router.delete('/:companyId', 
[isAuthenticatedMiddleware.check], 
CompanyController.deleteCompany);

module.exports = router;
