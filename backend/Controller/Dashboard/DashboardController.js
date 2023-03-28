const ProductData=require("../../db/Admin/ProductSchema")

async function getAllProducts(req,res){
    ProductData.find({}, (err, data) => {
        if (err) throw err;
        res.send(data)
        console.log(data)
    })
}

module.exports = {getAllProducts}
