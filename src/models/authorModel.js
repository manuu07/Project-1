const mongoose=require('mongoose')

const authorSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    title:{
        type:String,
        enum:[Mr,Mrs,Miss]
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
<<<<<<< HEAD
},{timestamps : true})
=======
},{timestamps:true})
>>>>>>> a2e6ad928f31b2cd49dbc93e9ebd2ff2eda8a48f

module.exports=mongoose.model('Author',authorSchema)


