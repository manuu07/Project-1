const express = require("express")
const middleWare = require('../MiddleWare/blog-middleware')
const router = express.Router()

router.get('/test-me' , (req,res)=>{
    res.send('this is our first Project on blog-site')
})

router.post('/test-email' , middleWare.ValidEmail)




module.exports = router
