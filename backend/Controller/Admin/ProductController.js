const ProductData=require('../../db/Admin/ProductSchema')
const { check, validationResult } = require('express-validator');

//add product details
async function ProductDetails(req,res){
    console.log(req.body);
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        res.json({err:1,message:"something went wrong"})

    }else{
        let ins=new ProductData({productName:req.body.productName,productDescrip:req.body.productDescrip,productRating:4,productProducer:req.body.productProducer,productCost:req.body.productCost,categoryId:req.body.categoryId,subcategoryName:req.body.subcategoryName,productImage:"",subImages:Array});
        ins.save((err,data)=>{
            if(err) res.json({err:1,message:'This Product is already added'})
            
            else{
              console.log({err:0,message:'Your Product Has been Added successfully',data:data});
                res.json({err:0,message:'Your Product Has been Added successfully,Please Continue to add Product Images',data:data._id})
            }
         })
    
    }

}


//add product images
async function ProductImage(req,res){
    console.log(req.body);
    const url = req.protocol + '://' + req.get('host') + '/Images/' + req.file.filename
    ProductData.updateOne({_id:req.body.id,}, 
        { $set: { productImage:url } }, function (err, data) {
        if (err){
            console.log(err)
        }
        else{
          
            res.json({
                err: 0, 
                success: true,
                status_code: 200,
                message:` Hey ! Your Product Image Has Been Uploaded Successfully`,
               data:data,
              
            })
            console.log({
                err: 0, 
                success: true,
                status_code: 200,
                message:` Hey ! Your Product Image Been Uploaded Successfully`,
               data:data,
               
            })
        }
    });
  
}

//add product multiple images
async function ProductMultImage(req,res){
    console.log(req.files);
    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < req.files.length; i++) {
        if(i==0){
            reqFiles.push({subimage:url + '/Images/' + req.files[i].filename,subimgid:Math.random(),mainimg:1})
        }else{
            reqFiles.push({subimage:url + '/Images/' + req.files[i].filename,subimgid:Math.random(),mainimg:0})
        }
      
    }
     console.log(reqFiles)

    ProductData.updateOne({_id:req.body.proid,}, 
        { $set: { subImages:reqFiles,productImage:url + '/Images/' + req.files[0].filename} }, function (err, data) {
        if (err){
            console.log(err)
        }
        else{
          
            res.json({
                err: 0, 
                success: true,
                status_code: 200,
                message:` Hey ! Your Product Sub Image Has Been Uploaded Successfully`,
               data:data,
              
            })
            console.log({
                err: 0, 
                success: true,
                status_code: 200,
                message:` Hey ! Your Product sub Image Been Uploaded Successfully`,
               data:data,
               
            })
        }
})
  
}


//get product details
async function GetProduct(req,res){
    ProductData.find({}, (err, data) => {
        if (err) throw err;
        res.send(data)
    })
  
}

//delete product
async function DeleteProduct(req,res){
    console.log(req.body)
    ProductData.deleteOne({_id:req.body.ProductId}, (err) => {
        if (err) throw err;
        console.log({err:0,message:'Your Product Has been Deleted successfully'})
        res.json({err:0,message:'Your Product Has been Deleted successfully'})
    })
  
}


//update product
async function EditProduct(req,res){
    console.log(req.body)
    ProductData.updateOne({_id:req.body.proID}, 
        { $set: { productName:req.body.proName,productDescrip:req.body.desc,productProducer:req.body.producer,productCost:req.body.Cost} }, function (err, data) {
        if (err){
            console.log(err)
        }
        else{
          
            res.json({
                err: 0, 
                success: true,
                status_code: 200,
                message:` Hey ! Your Data Has Been Updated Successfully`,
               data:data,
              
            })
            console.log({
                err: 0, 
                success: true,
                status_code: 200,
                message:` Hey ! Your Data Has Been Updated Successfully`,
               data:data,
               
            })
        }
    });
}


//Update image
async function UpdateImage(req,res){
    console.log(req.body);
    const url = req.protocol + '://' + req.get('host') + '/Images/' + req.file.filename
    ProductData.findOneAndUpdate({_id:req.body.id},{productImage:url},{new:true},(err,data)=>
    {
        if(err){
            console.log(err)
        }
        else{
            res.json({ "err": 0, "message": "Product  Image has been updated Successfully",data:data})
            console.log({ "err": 0, "message": "Product Image has been updated successfully",data:data  })
        }
    })

  
  
}




//update subimages
const UpdatesubImage = async (req, res) => {
     console.log(req.body)
    try {
        
        let products = await ProductData.findOne({ _id: req.body.id });
        
        let oldurl = products.subImages[req.body.index].subimage


        if (req.body.mainimg == "1") {
            let data = await ProductData.findOneAndUpdate({ _id: req.body.id, "subImages.subimage": oldurl }
                , { "subImages.$.subimage": req.protocol + '://' + req.get('host') + '/Images/' + req.file.filename, "productImage": req.protocol + '://' + req.get('host') + '/Images/' + req.file.filename }
                , { new: true }
            );
            
            res.json({ "err": 0, "message": "Your Product Main image has been updated successfully",data:data })
        }
        else {
            let data = await ProductData.findOneAndUpdate({ _id: req.body.id, "subImages.subimage": oldurl }
                , {"subImages.$.subimage": req.protocol + '://' + req.get('host') + '/Images/' + req.file.filename }
                , { new: true }
            );
            res.json({ "err": 0, "message": "Your Product Sub image has been updated successfully", data:data})
        }

       
    }
    catch (err) {

    }



}

//onchange main image function
const changeprofile=async(req,res)=>{
    console.log(req.body)

    ProductData.updateMany({_id:req.body.id}, {$set:{ "subImages.$[].mainimg":0} }
    ,(err,result)=>{
        if(err) throw err;
        else{
            console.log(result)
        }
    })
    let products = await ProductData.findOne({ _id: req.body.id });
        
    let oldurl = products.subImages[req.body.index].subimage
    ProductData.updateOne({_id:req.body.id,"subImages.subimgid":req.body.subimageId},{"subImages.$.mainimg":1,productImage:oldurl},
    (err,result)=>{
    if(err){
        console.log(err);
        res.json({
            "err":1,
            "message":"Something went wrong!!"
        })
    }
    else{
       
        res.json({"err":0,"message":"You Have Successfuly Changed Your profile photo."})
        console.log({"err":0,"message":"You Have Successfuly Changed Your profile photo."})
    }
})

}



module.exports={ProductDetails,ProductImage,ProductMultImage,GetProduct,DeleteProduct,EditProduct,UpdateImage,UpdatesubImage,changeprofile}
