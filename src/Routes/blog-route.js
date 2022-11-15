const express = require("express")
const middleWare = require('../MiddleWare/blog-middleware')
const authorController = require("../Controller/Author-controller")
const blogController = require("../Controller/blog-controller")
const router = express.Router()




router.get('/test-me' , (req,res)=>{
    res.send('this is our first Project on blog-site')
})

// router.post('/test-email' , middleWare.ValidEmail)
router.post('/authors' , middleWare.middleWare1 , middleWare.ValidEmail , authorController.createAuthor)
router.post('/blogs' , middleWare.middleware2 , blogController.createBlog)
router.get('/blogs' , blogController.getBlogs)
router.delete("/blogs",blogController.deleteblogs) 
module.exports = router