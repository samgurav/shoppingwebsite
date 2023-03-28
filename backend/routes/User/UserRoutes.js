const express=require('express')
const {Register,GetUser, getAll }=require("../../Controller/User/UserController")
const router = express.Router()

router.post('/register',Register)
router.get('/getall',getAll)
router.post('/getuserdata',GetUser)


module.exports=router;