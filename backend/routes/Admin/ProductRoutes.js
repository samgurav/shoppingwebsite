const express=require('express')
const multer = require('multer')
const {ProductDetails,ProductImage,ProductMultImage,GetProduct,DeleteProduct,EditProduct,UpdateImage,UpdatesubImage,changeprofile}=require('../../Controller/Admin/ProductController')
const router = express.Router()
const DIR = './Images/';
const { check, validationResult } = require('express-validator')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Images/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  });

  const fileFilter=(req, file, cb)=>{
   if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png'){
       cb(null,true);
   }else{
       cb(null, false);
   }

  }



var upload = multer({ 
    storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter:fileFilter
 });
router.post('/prodetails',
[
    check('productCost', ' Cost accepts only numeric Input.')
        .exists()
        .isNumeric(),
    ],
ProductDetails)

router.post('/productimage',upload.single('photo'),ProductImage)

router.post('/productmultimage', upload.array('multiple_images',6),ProductMultImage)

router.get('/getproduct',GetProduct)
router.post('/deleteproduct',DeleteProduct)
router.post('/editproduct',EditProduct)
router.post('/updateimage',upload.single('photo'),UpdateImage)
router.post('/updatesubimage',upload.single('photo'),UpdatesubImage)

router.post('/changeprofile',changeprofile)



module.exports=router;
