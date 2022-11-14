const { response } = require('express')
const blogModel = require('../models/blogModel')
const authorModel = require('../models/blogModel')


 const createBlog=async function (req,res){
    try {
    const data=req.body
    const allids=await authorModel.find().select({_id:1})
        const isautherid=await blogModel.find({authorId:{$in:allids}})
        if (isautherid){
           const result = await blogModel.create(data)
           res.status(200).send({status :true , data : result })
        }else{
            res.status(404).send({status : false , msg: "auther does not exists"})
        }
    }catch (error) {
        res.status(500).send({status : false , msg : error.message})
    }
}
module.exports.createBlog = createBlog

const getBlogs = async function(req,res){
    try {
        const {category , subcategory , tag , authorId}  = req.query
        const getBlog = await blogModel.find({$or:[{category : category} , {subcategory : subcategory} ,{tags:tag }, {_id : authorId}]})
        console.log(getBlog)
        if(getBlog.length==0){
            return  res.status(404).send({status : false , message : 'blog not found'})
        }else
        if ( getBlog.isPublished !== true && getBlog.isDeleted == false ){
            res.status(400).send({status : false , message : 'blog is not published or maybe deleted '})
       
        }else{
            return  res.status(200).send({status :true , data : getBlog })
        }
        
    } catch (error) {
        res.status(500).send({status : false , msg : error.message})
    }
}

module.exports.getBlogs = getBlogs