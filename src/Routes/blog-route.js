const express = require("express")
const router = express.Router()
const middW=require("../MiddleWare/blog-middleware")
const authorController=require("../Controller/Author-controller")
const blogComtroller=require("../Controller/blog-controller")


router.get('/test-me' , (req,res)=>{
    res.send('this is our first Project on blog-site')
})

router.post("/authors",middW.middleWare1,authorController.createAuthor)
router.post("/blogs",blogComtroller.)
router.get("/blogs",)

module.exports = router
