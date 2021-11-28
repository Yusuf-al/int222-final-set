const mongoose = require("mongoose");
const validator = require('validator');
// const tourModel1 = require("./tourModel");
// const userList = require("./userModel");

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
    },
    rating: {
        type: Number,
        min: [1, "rating must be above 1"],
        max: [5, " rating must below 5"]
    },
    item: {
        type: mongoose.Schema.ObjectId,
        ref: 'ProductList',
    },
    user: {
        type: String,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email !']
    },
    name: {
        type: String,
        
    },
    createdAt: {
        type: Date,
        default:Date.now
    }
},
    {
        toJSON: { virtuals: true },
        toObject:{virtuals:true}
    }
);


// reviewSchema.pre(/^find/, function (next) {
//     this.populate({
//         path: 'user',
//         select: 'name photo'
//     });
//     next();
// });

//.populate({
//     path: 'tour',
//     select: 'name'
// })

const reviews = mongoose.model('AllReview', reviewSchema);

module.exports = reviews;
