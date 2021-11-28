const express = require('express');
const viewController = require('./../controller/viewController');

const viewRouter = express.Router();

viewRouter.get('/',viewController.getAll);
viewRouter.get('/details/:slug',viewController.getOne);
viewRouter.post('/details/:slug',viewController.addReview);
// viewRouter.get('/compare', viewController.compare);
viewRouter.get('/admin/add-product',viewController.delUpload);
viewRouter.post('/admin/add-product',viewController.imgUpload, viewController.addProduct);


module.exports = viewRouter