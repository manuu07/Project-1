const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")
const { response } = require("express")

const middleWare1 =  (req,res,next)=>{
    try {
        const {fname ,lname,title,email,password} = req.body
    if(fname  && lname && title && email && password ){
        next()
    }else{
        res.status(400).send({status : false , msg :"name ,lname,title,email,password each mandatory "})
    }
    } catch (error) {
        res.status(500).send({status : false , msg : error.message})
    }
    
}
module.exports.middleWare1 = middleWare1


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

        const email = req.body.email
        // const pattern = /^[a-zA-z0-9 \.] + @ +[a-zA-z0-9] +(\.) + ([a-zA-z]{2,6}) + (\.) + ([a-zA-z]{2,6})? $/
        const pattern2 = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,5})*$/
        const matchEmail = email.match(pattern2)
        console.log(matchEmail)

        if(!matchEmail ){
          return  res.status(400).send({status : false , msg : 'email is not valid '})
        }
next()
     catch (error) {
        res.status(500).send({status : false , msg : error.message})
    }
    

module.exports.ValidEmail = ValidEmail
