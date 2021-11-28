const { query } = require('express');
const multer = require('multer');
const product = require('./../model/productModel');
const reviewData = require('./../model/reviewModel');
const ApiFeature = require('./../utils/apifeature');
const appErr = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');


const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './styles/uploads/');
    },
    filename: (req, file, cb) => {
        
        cb(null, Date.now()+file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null,true)
    } else {
        cb(null,false)
    }
}

let upload = multer({
    storage: multerStorage,
    fileFilter: fileFilter
})

exports.imgUpload = upload.single('img1');

// exports.allproducts = catchAsync(async (req, res,next) => {
  
//     const feature = new ApiFeature(product.find(), req.query).filter().sort().pagination(); 
  
//     const result = await feature.qur;

    
//         res.status(200).json({
//             message: 'Success',
//             totalResult:result.length,
//             data: {
//                 result
//             }
            
//         })
   
// });

exports.getAll = catchAsync(async (req, res, next) => {    
    const getProduct = await product.find();
    
    res.status(200).render('base', {
        getProduct
    });
});

exports.getOne = catchAsync(async (req, res, next) => {    
    const singleProduct = await product.findOne({ slug: req.params.slug }).populate('review');
    
    const ee = singleProduct.specification;
    const rv = singleProduct.review;
    const ew = Object.keys(ee[0]);

    // console.log(rv,rv.length);

    res.status(200).render('details', {
        singleProduct,
        ew,
        rv
    });
});

exports.compare = catchAsync(async (req, res, next) => {
    res.status(200).render('compare')
})

exports.addReview = catchAsync(async (req, res, next) => {
    
    const idProduct = await product.findOne({ slug: req.params.slug });
    
    // console.log(idProduct);

    const addRe = new reviewData({
        name: req.body.name,
        rating: req.body.rating,
        user: req.body.email,
        item:idProduct,
        review: req.body.text
    });
    const rev = await addRe.save()

    
    // console.log(req.body.name,req.body.rating,req.body.email);
    
    res.status(200).render('details', {
        singleProduct: idProduct
    });
})



exports.delUpload =catchAsync(async (req, res, next) => {
    res.status(200).render('addProduct');
});

exports.addProduct = catchAsync(async (req, res, next) => {
    productAdd = new product({
        brand: req.body.brand,
        model: req.body.model,
        category: req.body.category,
        price: req.body.price,
        description: req.body.description,
        specification: req.body.specification,
        
    });

    // console.log(req.body.brand);
    // console.log(req.body.category);
    // console.log(req.body.specification);
    // console.log(req.file.filename);

    const pro = await productAdd.save();
    res.status(200).render('addProduct');
   
});



