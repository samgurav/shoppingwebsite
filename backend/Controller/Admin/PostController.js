const CategoryData = require('../../db/Admin/CategorySchema')
const ProductData = require("../../db/Admin/ProductSchema")


//category details
async function PostCategory(req, res) {
    console.log(req.body);
    let ins = new CategoryData(req.body);
    ins.save((err) => {
        if (err) res.json({ err: 1, message: 'This category Has been Already added' })

        else {
            console.log("data saved");
            res.json({ err: 0, message: 'Your Category Has been Added successfully' })
        }
    })
}

//subcategory details
async function PostSubCategory(req, res) {
    console.log(req.body);

        let data = await CategoryData.findOne({ _id: req.body.categoryID });
        let flag = 0;
        for (let i = 0; i < data.subcategory.length; i++) {
            if (req.body.subcategory.toLowerCase() == data.subcategory[i].subcategory.toLowerCase()) {
                flag = 1;
                break;
            }
        }
        if (flag == 1) {
            res.json({
                message:'This subcategory is already existed, please add some product in it...',
                "err":1
            })
        }
        else {
            let data1 = await CategoryData.updateOne({ _id: req.body.categoryID }, { $push: { "subcategory": { "subcategory": req.body.subcategory } } })
                res.json({
                  
                    message: 'Your SubCategory Has been Added successfully',
                    "err": 0,
                    "success": true,
                    "status_code": 200,

                })
        }


}

//get all category
async function getCategory(req, res) {
    CategoryData.find({}, (err, data) => {
        if (err) throw err;
        res.send(data)
    })
}

//get all subcategory details
async function getSubCategory(req, res) {
    SubCategoryData.find({}, (err, data) => {
        if (err) throw err;
        res.send(data)
    })

}

//Delete Subcategory
async function DeleteSubcategory(req, res) {
    console.log(req.body)
    let category = await CategoryData.findOne({ _id: req.body.categoryId });
    //   console.log(category)
    let data1 = category.subcategory[req.body.subindex].subcategory
    console.log(data1)
    let product = await ProductData.find({ subcategoryName: data1 }).count();
    if (product == 0) {

        let subcat = await category.subcategory
        await subcat.splice(req.body.subindex, 1)

        let data2 = await CategoryData.updateOne({ _id: req.body.categoryId }, { $set: { "subcategory": subcat } })
        res.json({

            message: 'Your Subcategory has been Deleted successfully',
            err: 0,
            "success": true,
            "status_code": 200,
        })


    }
    else {
        res.json({ err: 1, message: 'This Subcategory contains products, Please Delete products first...' })
    }




}


//Update Subcategory
async function EditSubcategory(req, res) {
    console.log(req.body)
    let data = await CategoryData.findOne({ _id: req.body.categoryId });
    let flag = 0;
    for (let i = 0; i < data.subcategory.length; i++) {
        if (req.body.subcategory.toLowerCase() == data.subcategory[i].subcategory.toLowerCase()) {
            flag = 1;
            break;
        }
    }
    if (flag == 1) {
        res.json({
            message:'This subcategory is already existed, please add some product in it...',
            "err":1
        })
    }else{
         CategoryData.updateOne({ _id: req.body.categoryId, "subcategory.subcategoryId": req.body.subcatId }, { "subcategory.$": { subcategory: req.body.subcategory, subcategoryId: req.body.subcatId } }, (err, result) => {
        if (err) {
            console.log(err);
            res.json({
                "err": 1,
                "message": "Something went wrong!!"
            })
        }
        else {
            console.log(result);
            res.json({ "err": 0, "message": "You Have Successfuly Updated Your subcategory." })
        }
    })

    }

}


//Delete Cateogory
async function DeleteCategory(req, res) {
    console.log(req.body)

    let category = await CategoryData.findOne({ _id: req.body.categoryId });
    console.log(category)
    let data1 = category.subcategory.length
    console.log(data1)
    if (data1 == 0) {
        CategoryData.deleteOne({ _id: req.body.categoryId }, (err) => {
            if (err) throw err;
            console.log({ err: 0, message: 'Your Category Has been Deleted successfully' })
            res.json({ err: 0, message: 'Your Category Has been Deleted successfully' })
        })
    }
    else {
        res.json({ err: 1, message: 'Subcategory is already available in this category, please delete Subcategory first..' })
    }

    // let product = await ProductData.find({ categoryId: req.body.categoryId }).count();




}


module.exports = { PostCategory, PostSubCategory, getCategory, getSubCategory, DeleteSubcategory, EditSubcategory, DeleteCategory}

