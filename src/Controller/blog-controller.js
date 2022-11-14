const blogModel = require('../models/blogModel')

const postBlog = async (req, res )=>{
    try {
        const createBlog = await blogModel.create(req.body) 
        res.status(200).send({ status : true , msg : createBlog})
    } catch (error) {
        res.status(500).send({status : false , msg : error.message})
    }
 
}



const getBlogs = async function(req,res){
    try {
        const {category , subcategory , tag , author_id}  = req.body 
        const getBlog = await blogModel.find({$or:[category , subcategory ,tag , {_id : author_id}]})
        res.status(200).send({status :true , data : getBlog })
    } catch (error) {
        res.status(500).send({status : false , msg : error.message})
    }
}

module.exports.getBlogs = getBlogs