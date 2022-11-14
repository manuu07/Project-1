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
        res.status(400).send({status : false , msg : error.message})
    }
    
}
module.exports.middleWare1 = middleWare1

const ValidEmail =  (req,res,next)=>{
    try {
        const email = req.body.email
        const pattern = /^[a-zA-z0-9 \.] + @ +[a-zA-z0-9] +(\.) + ([a-zA-z]{2,6}) + (\.) + ([a-zA-z]{2,6})? $/
        const matchEmail = email.match(pattern)
        console.log(matchEmail)

        if(!matchEmail ){
            res.status(400).send({status : false , msg : 'email is not valid '})
        }
next()
    } catch (error) {
        res.status(500).send({status : false , msg : error.message})
    }
    
}

module.exports.ValidEmail = ValidEmail
