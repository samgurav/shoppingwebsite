const mongoose = require("mongoose");

const productModel = new mongoose.Schema({
    productName: { type: String },
    productImage: { type: String },
    productDescrip: { type: String},
    productRating: { type: Number},
    productProducer: { type: String },
    productCost: { type: Number },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'category',
        default:null
    },
    subcategoryName: {
        type: String, 
    },
    created_at:{
        type:Date,
        default:Date.now
      },
    subImages:{
        type:Array
    }
});

module.exports = mongoose.model("product", productModel);