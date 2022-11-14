const express = require("express")
const bodyParser =require('body-parser')
const mongoose = require("mongoose")
const route = require("./Routes")
const { error } = require("console")
const app = express()

app.use(bodyParser.json())

mongoose.connect("mongodb+srv://Gyaneshwer694:gYaN0694Mdb@cluster1.i15rwas.mongodb.net/project_1-Db?retryWrites=true&w=majority" , {
    useNewUrlParser:true
}).then(
    console.log('mongoDB is Connected Successfully -- Group -3 /')
).catch(error=>{
    console.log(error)
})

app.use('/' , route )    

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});





