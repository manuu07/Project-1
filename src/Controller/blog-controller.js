
const blogModel = require('../models/blogModel')
const authorModel = require('../models/authorModel')
const moment=require('moment')


 const createBlog=async function (req,res){
    try {
    const {authorId}=req.body
    const userExist = await authorModel.findById(authorId)
    if( !userExist){
        res.status(400).send({status : false , msg: "Author does not exist"})
        
    }else{
        const result = await blogModel.create(req.body)
        res.status(200).send({status :true , data : result })
    }

    }catch (error) {
        res.status(500).send({status : false , msg : error.message})
    }
}
module.exports.createBlog = createBlog


const getBlogs = async function(req, res) {
    try {
      const {category , subcategory , tags , authorId}  = req.query
      if(!category && !subcategory && !tags && !authorId ){
        const getAllBlogs = await blogModel.find({isPublished : true , isDeleted : false })
         return  res.status(200).send({status : true , message : getAllBlogs})
       }

        const blog = await blogModel.find({$or:[{category : category} , {subcategory : subcategory} ,{tags:tags }, {_id : authorId}]})
        const result=blog.filter(a=>{
            if(  a.isPublished==true && a.isDeleted==false) return a  
        })
        if(result.length == 0){
            return res.status(400).send({status :false , msg : 'blog not found'})
        }else{
            return res.status(200).send({status : true  , msg :result })
        }
    } catch (err) {
        res.status(500).send({ status: false, error:err.message });
    }
  }


const updateBlogs=async function(req,res){
    try{
        let blogId=req.params.blogId
        let data=req.body
        const blog=await blogModel.findById(blogId)
        if(Object.keys(data).length==0) return res.status(400).send({status:false,msg:"No data given for updation"})
        if(!blog) return res.status(404).send({status:false,msg:"Incorrect BlogId"})
        if(blog.isDeleted===true) return res.status(404).send({status:false,msg:"Blog does not exist"})

        const updateBlog=await blogModel.findOneAndUpdate({_id:blogId},data,{new:true})
        // if(isPublished==true){
        //     data[publishedAt]=moment().format('DD-MM-YYYY')
        // }
        return res.status(200).send({status:true,msg:updateBlog})
    }
    catch(err){
        return res.status(500).send({status:false,msg:err.message})
    }
}


const deleteBlog=async function(req,res){
    try{ 
    let blogId=req.params.blogId
    let blog=await blogModel.findById(blogId)
    if(!blog) return res.status(404).send({status:false,msg:"Incorrect BlogId"})
    if(blog.isDeleted==true) return res.status(404).send({status:false,msg:"Blog does not exist"})

    let deletedBlog=await blogModel.findOneAndUpdate({_id:blogId},{$set:{isDeleted:true,deletedAt:moment().format()}} , {new:true})
    res.status(200).send({status:true,msg:deletedBlog})

    // if(blog.isDeleted == false){
    //     blog.isDeleted = true
    //     blog.deletedAt = moment().format()
    //     blog.save()
    //     res.status(200).send({status:true,msg:blog})

    // }
}
catch(err){
    return res.status(500).send({status:false,Error:err.message})
}
}






module.exports.updateBlogs=updateBlogs
module.exports.getBlogs = getBlogs
module.exports.deleteBlog=deleteBlog