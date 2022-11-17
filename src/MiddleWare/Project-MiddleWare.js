
const moment = require('moment')
const jwt = require('jsonwebtoken')


const authentication=async function(req,res,next){
    try{ 
    const token=req.headers['x-api-key']
    if(token){
        jwt.verify(token,"litium batch Group-3 Project -01" , (error , authorId)=>{
            if(error) {return res.status(401).send({status:false,msg:"invalid token"})}
            else {
                req.decodedToken=authorId
            }
            next()
        })   }
    else res.status(404).send({status:false,msg:"Token is missing"})
}
catch(err){
    return res.status(500).send({status:false, Error:err.message})
}
}


module.exports.authentication=authentication


