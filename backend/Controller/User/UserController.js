const USerData=require("../../db/User/UserSchema")
const bcrypt = require('bcryptjs')
const jwtSecretKey = '*ahskimas0617#$#6012nahtnam#'
const jwt = require('jsonwebtoken')

//Register user data
async function Register(req,res){
    console.log(req.body)
    let ins = new USerData({name:req.body.name,lname:req.body.lname,email:req.body.email,mobile:parseInt(req.body.mobile),password:req.body.password,status:"user"});
    ins.save((err) => {
        if (err) res.json({ err: 1, message: 'User already existed' })

        else {
            console.log("data saved");
            res.json({ err: 0, message: 'User has been registered successfully.'})
        }
    })
}


//get all data
async function getAll(req,res){
    USerData.find({}, (err, data) => {
        if (err) throw err;
        res.send(data)
    })
}

// get user data
async function GetUser(req,res){
    console.log(req.body)
    USerData.findOne({ email: req.body.email }, (err, data) => {
        if (err) {
            res.send("its error")
        }
        else if (data == null) {
            console.log(data)
            res.json({ err: 1,message:"User doesn't exist,Try with different email id"  })
        }else if(data.status=="admin"){
            res.json({ err: 2,message:"admin logged in successfully",status:data.status })
            console.log({ err: 2,message:"admin logged in successfully",status:data.status  })
        }
        else if ((bcrypt.compareSync(req.body.password, data.password))) {
            let payload = {
                 uid:req.body.email,
                 name:data.name,
                 lname:data.lname,
                 mobile:data.mobile,
                 password:data.password,
                 id:data._id
                }
            const token = jwt.sign(payload,jwtSecretKey,{expiresIn:360000})
            console.log({
                err: 0, 
                success: true,
                status_code: 200,
                message: `" ${data.name} You have logged In"`,
                data: data,
                token:token
            })
            res.json({
                err: 0, 
                success: true,
                status_code: 200,
                message:` Hey ! ${data.name} You have Logged In Successfully`,
                data: data,
                token:token,
                photo:data.photo,
                status:data.status
            })
        }
        else if (!(bcrypt.compareSync(req.body.password, data.password))) {
            res.json({ err: 1 ,'message':'Please Enter Valid Details'})
        }

    })
    
}




module.exports = {Register,GetUser,getAll}