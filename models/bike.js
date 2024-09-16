const mongoose = require("mongoose")


const bikeschema = new mongoose.Schema({

    bikeid: Number,
    bikename: String,
    color : String,
    modelno : Number,
    wheels:Number,
   


})

const Bike = mongoose.model("Bike",bikeschema)
//
module.exports = Bike;
//
