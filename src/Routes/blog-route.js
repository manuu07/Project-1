const express = require("express")
const middleWare = require('../MiddleWare/blog-middleware')
const authorController = require("../Controller/Author-controller")
const router = express.Router()
const middW=require("../MiddleWare/blog-middleware")
const authorController=require("../Controller/Author-controller")
const blogComtroller=require("../Controller/blog-controller")


router.get('/test-me' , (req,res)=>{
    res.send('this is our first Project on blog-site')
})

// router.post('/test-email' , middleWare.ValidEmail)
router.post('/create-author' , middleWare.middleWare1 , middleWare.ValidEmail , authorController.createAuthor)




module.exports = router
