const express = require("express")
const router = express.Router()

router.get('/test-me' , (req,res)=>{
    res.send('this is our first Project on blog-site')
})

module.exports = router
