const express = require('express');
const reviewController = require('./../controller/reviewController');


const ReRouter = express.Router({mergeParams:true});

ReRouter.route('/').get(reviewController.getAll)
                   .post(reviewController.addReview)

module.exports = ReRouter;