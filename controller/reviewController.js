const review = require('./../model/reviewModel');
const catchAsync = require('./../utils/catchAsync');

exports.addReview = catchAsync(async (req, res, next) => {

    if (!req.body.item) req.body.item = req.params.productId;

    const writeReview = await review.create(req.body);
    res.status(200).json({
        Status: 'Add successfully',
        data: {
            writeReview
        }
    });
});
exports.getAll = catchAsync(async (req, res, next) => {

    let filter = {};
    if(req.params.productId) filter = {item:req.params.productId}

    const allReview = await review.find(filter).select('-__v -createdAt');
    res.status(200).json({
        Status: 'Add successfully',
        totalReview:allReview.length,
        data: {
            allReview
        }
    });
});