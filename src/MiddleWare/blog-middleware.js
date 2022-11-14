const { response } = require("express")
const { isValidObjectId } = require("mongoose")

const middleWare1 =  (req,res,next)=>{
    try {
        const {fname ,lname,title,email,password} = req.body
    if(fname  && lname && title && email && password ){
        next()
    }else{
        res.status(400).send({status : false , msg :"name ,lname,title,email,password each mandatory "})
    }
    } catch (error) {
        res.status(400).send({status : false , msg : error.message})
    }
    
}
module.exports.middleWare1 = middleWare1

const ValidEmail =  (req,res,next)=>{
    try {
        const email = req.body.email
        // const pattern = /^[a-zA-z0-9 \.] + @ +[a-zA-z0-9] +(\.) + ([a-zA-z]{2,6}) + (\.) + ([a-zA-z]{2,6})? $/
        const pattern2 = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,5})*$/
        //  /^[a-z0-9_]{3,}@[a-z]{3,}.[a-z]{3,6}$/

        const matchEmail = email.match(pattern2)
        console.log(matchEmail)

        if(!matchEmail ){
          return  res.status(400).send({status : false , msg : 'email is not valid '})
        }
next()
    } catch (error) {
        res.status(500).send({status : false , msg : error.message})
    }
    
}
module.exports.ValidEmail = ValidEmail

const middleware2 = function(req ,res , next){

    try {
        const {authorId , title , body , tags ,category} = req.body 

        if (!authorId || ! title || !body || !tags || !category){
            return res.status(400).send({ status : false , msg : "authorId , title , body , tags ,category something misssing of them "})
        }
        const ValidID = isValidObjectId(authorId)
        if(!ValidID){
            return res.status(400).send({status : false , msg : 'authorid is invalid '})
        }
    } catch (error) {
        res.status(500).send({status : false , msg : error.message})
    }
    next()
}

module.exports.middleware2 = middleware2




