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
        const email = document.getElementById("email").value
        const emailpattern = /^[a-zA-z0-9._-] + @[a-zA-z0-9._-] +\.[a-zA-z]{2,4}$/
        if (emailpattern == false){
            alert("Enter the valid Email-id")
        }

    } catch (error) {
        res.status(400).send({status : false , msg : error.message})
    }
    
}