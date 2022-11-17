const express = require("express")
const mongoose = require("mongoose")
const route = require("./Routes/blog-route")
const app = express()

app.use(express.json())

mongoose.connect("mongodb+srv://bloggingSite:project123@project-01-group-3.2zpxn0w.mongodb.net/Project-01-bloggingSite" , {
    useNewUrlParser:true
}).then(
    console.log('mongoDB is Connected Successfully -- Group -3 /')
).catch(error=>{
    console.log(error)
})

app.use('/' , route )    


app.listen(process.env.PORT || 3001, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3001))
});

