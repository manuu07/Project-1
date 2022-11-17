const authorModel = require('../models/authorModel')
const jwt = require('jsonwebtoken')
const { isValidName, isValidTitle, isValidEmail, isValid } = require("../Validation/Valid")


const createAuthor = async function(req,res){
    try {
        if (Object.keys(req.body).length == 0) return res.status(400).send({ msg: "enter the data" })
       
        const {fname,lname,title,email,password} = req.body;
        
        if (!isValid(fname)) {
            return res.status(400).send({ msg: "Enter First Name" })
        }
        if (!isValidName(fname)) {
            return res.status(400).send({ msg: "fname only take alphabets" })
        }
        if (!isValid(lname)) {
            return res.status(400).send({ msg: "Enter Last Name" })
        }
        if (!isValidName(lname)) {
            return res.status(400).send({ msg: "lname only take alphabets" })
        }
        if (!isValid(title)) {
            return res.status(400).send({ msg: "Enter Title Name" })
        }
        if (!isValidTitle(title)) {
            return res.status(400).send({ msg: "Enter title from this ['Mr', 'Mrs', 'Miss']" })
        }
        if (!isValid(email)) {
            return res.status(400).send({ msg: "Enter Email-Id" })
        }
        if (!isValidEmail(email)) {
            return res.status(400).send({ msg: "enter valid email" })
        }

        const checkEmail=await authorModel .findOne({email:email})
        if(checkEmail) return res.status(400).send({msg :"Email Already Registered"})
        
        if(!password) return res.status(400).send({status:false,msg:"Enter Valid password"})
      
        const data = await authorModel.create(req.body)
        res.status(201).send({status : true , msg : data})

     
    } catch (error) {
        res.status(500).send({status : false , msg : error.message})
    }    
}
module.exports.createAuthor = createAuthor


const loginAuthor = async (req,res)=>{
    try {

        if (Object.keys(req.body).length<1) return res.status(400).send({ msg: "Enter the Data" })
        
        const email = req.body.email;
        if (!isValid(email)) {
            return res.status(400).send({ msg: "Enter Email-Id" })
        }
        if (!isValidEmail(email)) {
            return res.status(400).send({ msg: "enter valid email" })
        }

        const password = req.body.password;
        if(!password) return res.status(400).send({status:false,msg:"enter password"})

        const authorExist = await authorModel.findOne({email:email,password :password});

        const fullName = authorExist.fname + " " + authorExist.lname
        if(!authorExist) return res.status(401).send({status : false , msg : " Email Not Exist"})

        const payload = {authorid : authorExist._id.toString() ,  projectName : "Blogging-Sites" , "Author-Name" :fullName}
        const token = jwt.sign(payload ,"litium batch Group-3 Project -01")

        res.status(200).send({status : true , token : token })
    } catch (error) {
        res.status(500).send({status : false , msg : error.message})
    }
}

module.exports.loginAuthor = loginAuthor


