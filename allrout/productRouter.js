const express = require('express');
const productController = require('./../controller/productController');
const reviewRoute = require('./../allrout/reviewRout');


const productRouter = express.Router();

productRouter.use('/:productId/review',reviewRoute);

productRouter.route('/')
    .get(productController.allproducts)
    .post(productController.addProduct);

productRouter.route('/:id')
    .get(productController.singleProduct)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct);

// bikeRouter.route('/:bikeId/review').post(reviewRoute.addReview);

module.exports = productRouter;