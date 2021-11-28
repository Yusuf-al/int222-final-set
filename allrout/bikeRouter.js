const express = require('express');
const bikeController = require('./../controller/bikeController');
const reviewRoute = require('./../controller/reviewController');


const bikeRouter = express.Router();


bikeRouter.route('/')
    .get(bikeController.allBikes)
    .post(bikeController.addBike);

bikeRouter.route('/:id')
    .get(bikeController.singleBike)
    .patch(bikeController.updateBike)
    .delete(bikeController.deleteBike);

bikeRouter.route('/:bikeId/review').post(reviewRoute.addReview);

module.exports = bikeRouter;