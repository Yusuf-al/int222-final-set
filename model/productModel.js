const mongoose = require('mongoose');
const { default: slugify } = require('slugify');
const validator = require('validator');

const productSchema = new mongoose.Schema({
    brand: {
        type: String,
    
    },
    model: {
        type: String,
        
    },
    slug: String,
    category: {
        type: String,
        enum: ['bike', 'mobile', 'tv', 'camera', 'pc'],
        
    },
    price: {
        type: Number,
        
    },
    description:{
        type: String,
        
    },
    coverImg:{
        type: String
    },
    imgs: [String ],
    specification: [{
        type: Object,
        
    }],
    ratingsAverage: {
        type: Number,
        min: [1, "rating must be above 1"],
        max: [5, " rating must below 5"],
        default: 4.2
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
},
{
    toJSON: { virtuals: true },
    toObject: {virtuals: true }
    }
);

productSchema.virtual('review', {
    ref: 'AllReview',
    foreignField: 'item',
    localField:'_id'
})
productSchema.pre('save', function (next){
    this.slug = slugify(this.brand+"-"+this.model,{ lower: true });
    next();
});

// productSchema.pre(/^find/, function (next) {
//     this.populate({
//         path: 'review'
//     });
// })

const productList = mongoose.model('ProductList', productSchema)

module.exports = productList;