const middleWare1 =  (req,res,next)=>{
    try {
        const {fname ,lname,title,email,password} = req.body
    if(fname  && lname && title && email && password ){
        next()
    }
    } catch (error) {
        res.status(400).send({status : false , msg : error.message})
    }
    
}
module.exports.middleWare1 = middleWare1

const ValidEmail =  (req,res,next)=>{
    try {
        const {email} = req.body
        

    } catch (error) {
        res.status(400).send({status : false , msg : error.message})
    }
    
}