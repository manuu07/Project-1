const express = require("express")
const router = express.Router()
const middW=require("../MiddleWare/blog-middleware")


router.get('/test-me' , (req,res)=>{
    res.send('this is our first Project on blog-site')
})

router.post("/authors",middW.middleWare1,)
router.post("/blogs",)
router.get("/blogs",)

module.exports = router
