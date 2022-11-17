const blogModel = require('../models/blogModel')
const authorModel = require('../models/authorModel')
const moment = require('moment')
const { isValidObjectId } = require("mongoose")

const createBlog = async function (req, res) {
    try {
        const { authorId } = req.body
        const userExist = await authorModel.findById(authorId)
        if (!userExist) {
            res.status(400).send({ status: false, msg: "Author does not exist" })
        } else {
            const result = await blogModel.create(req.body)
            res.status(201).send({ status: true, data: result })
        }

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}
module.exports.createBlog = createBlog


const getBlogs = async function (req, res) {
    try {
        const { category, subcategory, tags, authorId } = req.query
        if (!category && !subcategory && !tags && !authorId) {
            const getAllBlogs = await blogModel.find({ isPublished: true, isDeleted: false })
            return res.status(200).send({ status: true, message: getAllBlogs })
        }
        if(authorId){
            const ValidID = isValidObjectId(authorId)
            if (!ValidID) {
                return res.status(400).send({ status: false, msg: 'authorid is invalid ' })
            }  
        }
       
        const blog = await blogModel.find({ $or: [{ category: category }, { subcategory: subcategory }, { tags: tags }, { authorId: authorId }] ,isPublished : true ,isDeleted : false}  )

        if (blog.length == 0) {
            return res.status(400).send({ status: false, msg: 'Blog not found' })
        }
        else res.status(200).send({ status: true, msg: blog })
    } catch (err) {
        res.status(500).send({ status: false, error: err.message });
    }
}

module.exports.getBlogs = getBlogs


const updateBlogs = async function (req, res) {
    try {
        const blogId = req.params.blogId
        const ValidID = isValidObjectId(blogId)
        if (!ValidID) {
            return res.status(400).send({ status: false, msg: 'blogid is invalid ' })
        }   
        
        const data = req.body
        const blog = await blogModel.findById(blogId)
        if (!blog) return res.status(400).send({ status: false, msg: "Incorrect BlogId" })
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "No data given for updation" })
        if (blog.isDeleted === true) return res.status(404).send({ status: false, msg: "Blog does not exist" })

        const authorId = blog.authorId.toString()
        if (req.decodedToken.authorid !== authorId) {
            res.status(401).send({ status: false, msg: "Not Authorized" })
        }
        else {
            const updateBlog = await blogModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, {
                $set: {
                    title: data.title, body: data.body, category: data.category, isPublished: true,publishedAt:moment().format()
                },
                $push: { subcategory: req.body.subcategory, tags: req.body.tags },
            },
                { new: true })
            res.status(200).send({ status: true, message: "Updated Successfully", data: updateBlog });
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.updateBlogs = updateBlogs



const deleteBlog = async function (req, res) {
    try {
        const blogId = req.params.blogId
        const ValidID = isValidObjectId(blogId)
        if (!ValidID) {
            return res.status(400).send({ status: false, msg: 'blogid is invalid ' })
        }   
        const blog = await blogModel.findById(blogId)
        if (!blog) return res.status(404).send({ status: false, msg: "Incorrect BlogId" })
        if (blog.isDeleted == true) return res.status(404).send({ status: false, msg: "Blog does not exist" })

        const authorId = blog.authorId.toString()
        if (req.decodedToken.authorid !== authorId) {
            res.status(401).send({ status: false, msg: "Not Authorized" })
        }
        else {
            let deletedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, { $set: { isDeleted: true, deletedAt: moment().format() ,isPublished : false , publishedAt : ''  } }, { new: true })
            res.status(200).send({ status: true, msg: deletedBlog })

        }
    }
    catch (err) {
        return res.status(500).send({ status: false, Error: err.message })
    }
}

module.exports.deleteBlog = deleteBlog


const deleteblogsByQuery = async function (req, res) {
    try {
        const {category , subcategory , tag , authorId}  = req.query
        if(!category && !subcategory && !tag && !authorId ){
          return  res.status(400).send({status : true , message : 'query does not exist'})
        }
        if(authorId){
            const ValidID = isValidObjectId(authorId)
            if (!ValidID) {
                return res.status(400).send({ status: false, msg: 'authorid is invalid ' })
            }  
        }
       
        const getAllBlogs = await blogModel.find({$or:[{category : category} , {subcategory : subcategory} ,{tags:tag }, {authorId : authorId}] ,isDeleted : false })
      
    if ( getAllBlogs.length == 0){
        return res.status(404).send({status : false , message : 'already deleted'})
    }
        const AuthorisedBlogs = getAllBlogs.filter(a=>{
            const authorIDs = a.authorId.toString()
            if( authorIDs == req.decodedToken.authorid) return a
        }) 

    if(AuthorisedBlogs.length !== 0){
        await blogModel.updateMany({ $or:[{category : category} , {subcategory : subcategory} ,{tags:tag} ], authorId : req.decodedToken.authorid , isDeleted : false} , {$set :{isDeleted : true , deletedAt : moment().format() ,isPublished : false , publishedAt : ''  }} ,{new : true}  )         
        return  res.status(200).send({status :true , msg : 'Deleted successfully ' })  

    }else{  return res.status(401).send({status : false , msg : 'Not Authorised'})    }  }
    
    catch (err) { 
         return res.send({ status: false, Error: err.message }) }
}

module.exports.deleteblogsByQuery = deleteblogsByQuery

// ***********************************************************************************************************

