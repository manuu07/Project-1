const authorModel = require('../models/authorModel')
const jwt = require('jsonwebtoken')


const createAuthor = async function(req,res){
    try {
        const {email} = req.body
        const emailExist = await authorModel.findOne({email :email})
        if( !emailExist ){
            const data = await authorModel.create(req.body)
            res.status(201).send({status : true , msg : data})
        }else{
            res.status(400).send({status : false , msg : 'email already exists'})
        }
    } catch (error) {
        res.status(500).send({status : false , msg : error.message})
    }    
}
module.exports.createAuthor = createAuthor


const loginAuthor = async (req,res)=>{
    try {
        const {email , password} = req.body
        if(!email || !password) return res.status(400).send({status : false , msg : "please enter your Eamil Or Password"})
        const authorExist = await authorModel.findOne(req.body)
        const fullName = authorExist.fname + " " + authorExist.lname
        if(!authorExist) return res.status(404).send({status : false , msg : "invalid email or password"})
        const payload = {authorid : authorExist._id.toString() ,  projectName : "Blogging-Sites" , "Author-Name" :fullName}
        const token = jwt.sign(payload ,"litium batch Group-3 Project -01")
        res.status(200).send({status : true , token : token ,"Author-Name" :fullName  })
    } catch (error) {
        res.status(500).send({status : false , msg : error.message})
    }
}

module.exports.loginAuthor = loginAuthor