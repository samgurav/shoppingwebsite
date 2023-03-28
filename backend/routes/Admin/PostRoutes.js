const express=require('express')
const {PostCategory,PostSubCategory,getCategory,getSubCategory,DeleteSubcategory,EditSubcategory,DeleteCategory}=require("../../Controller/Admin/PostController")
const router = express.Router()

router.post('/addcategory',PostCategory)
router.post('/addsubcategory',PostSubCategory)
router.get('/getcategory',getCategory)
router.get('/getsubcategory',getSubCategory)
router.post('/delsubcategory',DeleteSubcategory)
router.post('/editsubcategory',EditSubcategory)
router.post('/deletecategory',DeleteCategory)

module.exports=router;
