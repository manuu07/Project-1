const authorModel = require('../models/authorModel')

const createAuthor = async function(req,res){
    try {
        const {email} = req.body
        const emailExist = await authorModel.findOne({email :email})
        if( !emailExist ){
            const data = await authorModel.create(req.body)
            res.status(200).send({status : true , msg : data})
        }else{
            res.status(400).send({status : false , msg : 'email already exists'})
        }
    } catch (error) {
        res.status(500).send({status : false , msg : error.message})
    }    
}
module.exports.createAuthor = createAuthor
