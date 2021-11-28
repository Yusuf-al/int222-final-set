const { query } = require('express');
const bikes = require('./../model/bikeModel');
const ApiFeature = require('./../utils/apifeature');
const appErr = require('./../utils/appError');

const catchAsync = require('./../utils/catchAsync');

exports.allBikes = catchAsync(async (req, res,next) => {
  
    const feature = new ApiFeature(bikes.find(), req.query).filter().sort().pagination(); 
  
    const result = await feature.qur;

        res.status(200).json({
            message: 'Success',
            totalResult:result.length,
            data: {
                result
            }
        })
   
});

exports.addBike = catchAsync(async (req, res, next) => {
    
    const addNewBike = await bikes.create(req.body);
    
    res.status(200).json({
        message: "Bike Added",
        data: addNewBike
    })
    
});

exports.singleBike = catchAsync(async (req, res, next) => {
    const singleBike = await bikes.findById(req.params.id).populate('reviewList');

        if (!singleBike) {
           return next(new appErr(`Item with this ${req.params.id} is not found,plz try another`,404))
        }
    res.status(201).json({
        status: "Success",
        data: singleBike
    });
    
});

exports.updateBike = catchAsync(async(req, res,next) => {
    const bikeUpdate = await bikes.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators:true
    });
    if (!bikeUpdate) {
        return next(new appErr(`Item with this ${req.params.id} is not found,plz try another`,404));
    }

    res.status(201).json({
        status: "Update Successfull",
        data:bikeUpdate
    })
});

exports.deleteBike = catchAsync(async (req, res, next) => {
    const item = await bikes.findByIdAndDelete(req.params.id);

    if (!item) return next(new appErr(`Item with this ${req.params.id} is not found,plz try another`, 404));

    res.status(200).json({
        message: "bike Deleted successfull"
    });
});

