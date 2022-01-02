const { query } = require('express');
const multer = require('multer');
const product = require('./../model/productModel');
const jwt = require('jsonwebtoken');
const reviewData = require('./../model/reviewModel');
const admin = require('./../model/admin')
const ApiFeature = require('./../utils/apifeature');
const appErr = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const { findByIdAndUpdate } = require('./../model/productModel');


const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './styles/uploads/');
    },
    filename: (req, file, cb) => {        
        cb(null, `image-${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null,true)
    } else {
        cb(null,false)
    }
}

exports.upload = multer({
    storage: multerStorage,
    fileFilter: fileFilter
}).array('imgs',4);

// exports.imgUpload = upload;

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

exports.admin = catchAsync(async (req, res, next) => {    
    const getProduct = await product.find();
    
    res.status(200).render('allProducts', {
        getProduct,
        message: req.flash('message')
    });
});

exports.reg = catchAsync(async (req, res, next) => {
    res.status(200).render('adminReg');
});

exports.signUp = catchAsync(async (req, res, next) => {

    const newAdmin = new admin({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        confirmPass: req.body.cpassword
    });
    const ad = await newAdmin.save();

    // const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXP_IN});

    // // console.log(newAdmin+"\n"+ token);
    req.flash('message', 'Account Created Successfully');

    res.status(200).redirect('/admin/log-in');
});

exports.logIn = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        // return next(new appErr("Please enter the Email or Password"));
        req.flash('message', 'Please Enter Email or Password');
        res.redirect('/admin/log-in');
    }
    const adminLog = await admin.findOne({ email }).select('+password');

    if (!adminLog || !(await adminLog.correctPass(password, adminLog.password))) {

        // return next(new appErr('Incorrect Password or Email', 401));
        req.flash('message', 'Incorrect Password or Email');
        res.redirect('/admin/log-in');
    
    }
    
    const token = jwt.sign({ id: adminLog._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP_IN });

    res.cookie('jwt', token, {
        expires: new Date(Date.now() + (60 * 60 * 1000)),
        httpOnly: true   
    });
    
    // console.log(`${email}\n${password}\n${token}`);
    req.flash('message', 'Log in Successful');
    res.status(200).redirect('/admin/all-product');
});

exports.logOut = catchAsync(async (req, res, next) => {
    res.cookie('jwt', '', { maxAge: 1 });
    req.flash('message', 'Log Out Successful');
    res.redirect('/admin/log-in');
})

exports.logPanel = catchAsync(async (req, res, next) => {
    res.status(200).render('adminLogIn', {
        message: req.flash('message')
    });
});

exports.getOne = catchAsync(async (req, res, next) => {    
    const singleProduct = await product.findOne({ slug: req.params.slug }).populate('review');

    if (!singleProduct) {
        return next(new appErr("Product Not found",404));
    }
    
    const ee = singleProduct.specification;
    const key = singleProduct.specification[0];
    const rv = singleProduct.review;
    const ew = Object.keys(ee[0]);

    const obj = Object.values(key);
    // console.log(ew);

    res.status(200).render('details', {
        singleProduct,
        ew,
        rv,
        ee,
        obj
    });
    // res.status(200).render('details');
});

exports.compare = catchAsync(async (req, res, next) => {
    res.status(200).render('compare')
});

exports.addReview = catchAsync(async (req, res, next) => {
    
    const idProduct = await product.findOne({ slug: req.params.slug });
    
    // console.log(idProduct);

    const addRe = new reviewData({
        name: req.body.name,
        rating: req.body.rating,
        user: req.body.email,
        item: idProduct,
        review: req.body.text
    });
    const rev = await addRe.save()

    
    // console.log(req.body.name,req.body.rating,req.body.email);
    
    res.status(200).redirect(req.params.slug);
});



exports.delUpload =catchAsync(async (req, res, next) => {
    res.status(200).render('addProduct', {
        message: req.flash('message')
    });
});

exports.addProduct = catchAsync(async (req, res, next) => {
    // const imgFile = req.files.imgs;
    // if (!imgFile) {
    //     return next(new appErr("No images are added",404))
    // }
    let images = [];
    
    req.files.map(name=> {
            images.push(name.filename);      
    });
 
    productAdd = new product({
        brand: req.body.brand,
        model: req.body.model,
        category: req.body.category,
        price: req.body.price,
        description: req.body.description,
        imgs: images,
        specification: JSON.parse(req.body.specification),
        
    });

    // console.log(req.body.category);
    // console.log(JSON.parse(req.body.specification));

    const pro = await productAdd.save();
    // console.log(productAdd);
    req.flash('message', 'New Product Added');
    res.status(200).redirect('/admin/add-product');
   
});

exports.updateItemView = catchAsync(async (req, res, next) => {
    
    const item = await product.findOne({ slug: req.params.slug });
    res.status(200).render('updateData', {
        item
    });

    // console.log(item);

});

exports.updateItem = catchAsync(async (req, res, next) => {

    // let images = [];
    
    // req.files.map(name => {
    //     images.push(name.filename);
    // });

    
    const id = req.params.slug
    
    const itemUpdate = await product.findOneAndUpdate(id, {
            brand : req.body.brand,
            model : req.body.mobel,
            price : req.body.price,
            description : req.body.description,
            specification : req.body.specification
    });

    
    
    // await itemUpdate.save();


    // console.log(slug);
//     req.item = await product.findOne({ slug: req.params.slug });
//     let item = req.item
//     item.brand=req.body.brand
//     item.model= req.body.model
//     item.category= req.body.category
//     item.price= req.body.price
//     item.description= req.body.description,
//     item.specification= req.body.specification
// try {
//     item = item.save();
//     req.flash('message', 'Update Seccessful');
//     res.status(200).redirect('/admin/all-product');
// } catch (error) {
//     res.send(error);
// }
    console.log(itemUpdate);
    // console.log(slug);
    console.log(id);
    req.flash('message', 'Update Seccessful');
    res.status(200).redirect('/admin/all-product');
    
});

exports.deleteItem = catchAsync(async (req, res, next) => {

    const item = await product.findOneAndDelete({ slug: req.params.slug });

    res.status(200).redirect('/admin/all-product');

});

exports.authRoute = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.redirect('/admin/log-in');
            } else {
                // console.log(decode);
                next();
            }
        });
    }
    else {
        res.redirect('/admin/log-in')
    }

}





