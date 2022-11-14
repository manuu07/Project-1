const authorModel = require('../models/blogModel')

const getBlogs = async function(req,res){
    try {
        const {category , subcategory , tag , author_id}  = req.body 
        const getBlog = await authorModel.find({$or:[category , subcategory ,tag , {_id : author_id}]})
        res.status(200).send({status :true , data : getBlog })
    } catch (error) {
        res.status(500).send({status : false , msg : error.message})
    }
}

module.exports.getBlogs = getBlogs