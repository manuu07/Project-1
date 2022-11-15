const blogModel = require('../models/blogModel')
const authorModel = require('../models/authorModel')
const moment = require('moment')


 const createBlog=async function (req,res){
    try {
    const {authorId}=req.body
    const userExist = await authorModel.findById(authorId)
    if( !userExist){
        res.status(400).send({status : false , msg: "autherid is not exist"})
        
    }else{
        const result = await blogModel.create(req.body)
        res.status(200).send({status :true , data : result })
    }

    }catch (error) {
        res.status(500).send({status : false , msg : error.message})
    }
}
module.exports.createBlog = createBlog

const getBlogs = async function(req,res){
    try {
        const {category , subcategory , tag , authorId}  = req.query
        if(!category && !subcategory && !tag && !authorId ){
         const getAllBlogs = await blogModel.find({isPublished : true , isDeleted : false })
          return  res.status(200).send({status : true , message : getAllBlogs})
        }
    
         const getBlog = await blogModel.find({$or:[{category : category} , {subcategory : subcategory} ,{tags:tag }, {_id : authorId}]}).populate('authorId')
console.log(getBlog)
        if(getBlog.length==0){
            return  res.status(404).send({status : false , message : 'blog not found'})
        }else if ( getBlog.isPublished == true && getBlog.isDeleted == false ){
            return  res.status(200).send({status :true , data : getBlog })
        }else{
            res.status(400).send({status : false , message : 'blog is not published or maybe deleted '})
        }
        
    } catch (error) {
        res.status(500).send({status : false , msg : error.message})
    }
}


const deleteblogs=async function(req,res){
    try{
  
    const {category , subcategory , tag , authorId}  = req.query
    if(!category && !subcategory && !tag && !authorId ){
      return  res.status(400).send({status : true , message : 'query does not exist'})
    }

    const getBlog = await blogModel.updateMany({$or:[{category : category} , {subcategory : subcategory} ,{tags:tag }, {_id : authorId}]})
    const result = getBlog.filter(a=>{
        if(a.isDeleted == false ){
            return a
        }
    })
    if (result.length==0){
        return res.status(404).send({status : false , msg : 'already deleted'})
    }else {
        result.forEach(a=>{
            a.isDeleted = true 
            a.deletedAt = moment().format()
        })
    }
result.save()
res.status(200).send({status :true , msg : 'Deleted successfully ' })

    // const data=await blogModel.find()
    // if(data.isDeleted==false){
    // // const data1=await blogModel.updateMany({$or:[{category : category},{subcategory : subcategory} ,{tags:tags },{_id : authorId},{unpublished:unpublished}]},{$set:{isDeleted:true}},{new:true})
    // res.status(200).send({status :true , data : data1 })
    // }else{
    //     res.status(404).send({status : false , msg : "user does not exist"})
    // }
} catch (error) {
    res.status(500).send({status : false , msg : error.message})
}
}
module.exports.getBlogs = getBlogs
module.exports.deleteblogs = deleteblogs