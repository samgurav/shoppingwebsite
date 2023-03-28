const express=require('express')
const {getAllProducts }=require("../../Controller/Dashboard/DashboardController")
const router = express.Router()

router.get('/getproducts',getAllProducts)

module.exports=router;