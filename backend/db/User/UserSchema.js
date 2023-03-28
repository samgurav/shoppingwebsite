const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name:{
        type: String,
 
    },
    lname:{
        type: String,
 
    },
    email:{
        type:String, 
        unique:true
    },
    mobile:{
        type:Number,
 
    },
    status:{
        type:String,
   
    },
  
    password:{
        type:String,
   
    },
    cpassword:
    {
        type:String,
      
    
    }


})

module.exports=mongoose.model('user',UserSchema)

