const mongoose = require('mongoose');
const { default: slugify } = require('slugify');
const validator = require('validator');

const bikeSchema = new mongoose.Schema({
    brand: {
        type: String,
        required:[true,'Enter Brand Name']
    },
    model: {
        type: String,
        required:[true,'Enter Model Name']
    },
    slug:String,
    price: {
        type: [Number],
        required:[true,'Enter Price']
    },
    engineType: {
        type: String,
        required:[true,'Enter Engine Type']
    },
    displacement:{
        type: String,
        required:[true, 'Enter Displacement']
    },
    maxPower: {
        type: String,
        required:[true,'Enter Max Power']
    },
    maxTorque: {
        type: String,
        required:[true,'Enter Torque']
    },
    milage: {
        type: String,
        required:[true,'Enter Milage']
    },
    boreXstroke: String,
    cooling: {
        type: String,
        required:[true,'Enter Cooling System']
    },
    startingMethod: {
        type: String,
        required:[true,'Enter starting Method']
    },
    gear: {
        type: Number,
        required: [true, 'Enter gear'],
        min: [3, "gear must be above 3"],
        max:[10," rating must below 10"]
    },
    dimension: {
        type: String,
        required:[true]
    },
    wheelBase: {
        type: String
    },
    fuelCapacity: {
        type: Number,
        required:true
    },
    kerbWeight: {
        type: Number,
        required:true
    },
    suspensionF: {
        type: String,
        required:true
    },
    suspensionB:{
        type: String,
        required:true
    },
    brakeF:{
        type: String,
        required:true
    },
    brakeR:{
        type: String,
        required:true
    },
    wheelF:{
        type: String,
        required:true
    },
    wheelR:{
        type: String,
        required:true
    },
    tyreDF:{
        type: String,
        required:true
    },
    tyreDR:{
        type: String,
        required:true
    },
    battery:{
        type: String,
        required:true
    },
    HL:{
        type: String,
        required:true
    },
    TL:{
        type: String,
        required:true
    },
    turnL: {
        type:String
    },
    description:{
        type: String,
        required:true
    },
    coverImg:{
        type: String
    },
    imgs:[String]

}, 
    {
        toJSON: { virtuals: true },
        toObject: {virtuals: true }
        }
);

bikeSchema.pre('save', function (next){
    this.slug = slugify(this.brand+"-"+this.model,{ lower: true });
    next();
});

bikeSchema.virtual('reviewList', {
    ref:'AllReview',
    foreignField: 'cat',
    localField: '_id'
});

const bikeList = mongoose.model('BikeList', bikeSchema)

module.exports = bikeList;