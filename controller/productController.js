const { query } = require('express');
const product = require('./../model/productModel');
const ApiFeature = require('./../utils/apifeature');
const appErr = require('./../utils/appError');

const catchAsync = require('./../utils/catchAsync');

exports.allproducts = catchAsync(async (req, res,next) => {
  
    const feature = new ApiFeature(product.find(), req.query).filter().sort().pagination(); 
  
    const result = await feature.qur;

    
        res.status(200).json({
            message: 'Success',
            totalResult:result.length,
            data: {
                result
            }
            
        })
   
});

exports.addProduct = catchAsync(async (req, res, next) => {
    
    const addNewProduct = await product.create(req.body);
    
    res.status(200).json({
        message: "Product Added",
        data: addNewProduct
    })
    
});

exports.singleProduct = catchAsync(async (req, res, next) => {
    const sinProduct = await product.findById(req.params.id).populate('review');

        if (!sinProduct) {
           return next(new appErr(`Item with this ${req.params.id} is not found,plz try another`,404))
    }
    console.log(sinProduct.specification[0].milage);
    res.status(201).json({
        status: "Success",
        data: sinProduct
    });
    
});

exports.updateProduct = catchAsync(async(req, res,next) => {
    const productUpdate = await product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators:true
    });
    if (!productUpdate) {
        return next(new appErr(`Item with this ${req.params.id} is not found,plz try another`,404));
    }

    res.status(201).json({
        status: "Update Successfull",
        data:productUpdate
    })
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
    const item = await product.findByIdAndDelete(req.params.id);

    if (!item) return next(new appErr(`Item with this ${req.params.id} is not found,plz try another`, 404));

    res.status(200).json({
        message: "Product Deleted successfull"
    });
});
