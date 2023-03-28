const mongoose=require('mongoose');

const CategorySchema=new mongoose.Schema({
    category:{
        type: String,
        unique:true
     
    },
    subcategory:{
        type:Array,
        
    },
    created_at:{
        type:Date,
        default:Date.now
      },
})

module.exports=mongoose.model('Category',CategorySchema)