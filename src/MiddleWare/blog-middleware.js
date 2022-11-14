const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")

const middleWare1 =  (req,res,next)=>{
    try {
        const {fname ,lname,title,email,password} = req.body
    if(fname  && lname && title && email && password ){
        next()
    }
    } catch (error) {
        res.status(500).send({status : false , msg : error.message})
    }
    
}
module.exports.middleWare1 = middleWare1

const ValidEmail =  (req,res,next)=>{
    try {
        const email = document.getElementById("email").value
        const emailpattern = /^[a-zA-z0-9._-] + @[a-zA-z0-9._-] +\.[a-zA-z]{2,4}$/
        if (emailpattern == false){
            alert("Enter the valid Email-id")
        }
    } catch (error) {
        res.status(400).send({status : false , msg : error.message})
    } 
}

const middleWare2= async function(req,res,next){
    try {
        const {title ,body,authorId,category} = req.body
    if(title  && body && authorId && category ){
        if(isValidObjectId(authorId)){
            next()
        }else{
            res.status(400).send({status : false , msg: "authorid is not valid object id"})
        }  
    }
       else{
            res.status(400).send({status : false , msg: "mandatory fields are missing"})
        }

    } catch (error) {
        res.status(500).send({status : false , msg : error.message})
    }
} 

module.exports.middleWare2=middleWare2

