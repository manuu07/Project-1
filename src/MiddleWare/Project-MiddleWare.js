
const { isValidObjectId } = require("mongoose")
const moment = require('moment')
const jwt = require('jsonwebtoken')


const middleWare1 =  (req,res,next)=>{
    try {
        const {fname ,lname,title,email,password} = req.body
    if(fname  && lname && title && email && password ){
        const email = req.body.email
        const pattern2 = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,5})*$/
        const matchEmail = email.match(pattern2)
        if(!matchEmail ){
          return  res.status(400).send({status : false , msg : 'email is not valid '})
        }
next()
    } else {
        res.status(400).send({status : false , msg :"name ,lname,title,email,password something missing of them- "})
    }
    } catch (error) {
        res.status(400).send({status : false , msg : error.message})
    }
    
}

module.exports.middleWare1 = middleWare1


const middleware2 = function(req ,res , next){

    try {
        const {authorId , isPublished } = req.body 
        const ValidID = isValidObjectId(authorId)
        if(!ValidID){
            return res.status(400).send({status : false , msg : 'authorid is invalid '})
        }else if(isPublished == true){
            req.body.publishedAt = moment().format()
        }
next()
    } catch (error) {
        res.status(500).send({status : false , msg : error.message})
    }
}

module.exports.middleware2 = middleware2


const authentication=async function(req,res,next){
    try{ 
    let token=req.headers['x-api-key']
    if(token){
        let decodedToken=jwt.verify(token,"litium batch Group-3 Project -01")
        if(decodedToken){
            req.decodedToken=decodedToken  
            next()
        }
    }
    else res.send({status:false,msg:"Token is missing"})
}
catch(err){
    return res.status(500).send({status:false, Error:err.message})
}
}


module.exports.authentication=authentication


