
const {isValidObjectId} = require("mongoose")


const isValidName =function(name){
    const  nameRegex =/^[a-zA-Z]{2,30}$/
    return nameRegex.test(name)
}


const isValidTitle =function(title){
    return ["Mr", "Mrs", "Miss"].indexOf(title) !== -1
}

//Email Validation
const isValidEmail = function(email){
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,5})*$/ 
    return emailRegex.test(email)
}

//ObjectId Validation

const  isValidObjectIds =function(id){
    const ObjectId = isValidObjectId(id);
    return ObjectId
}

//Boolean Validation

const isBoolean = function(value){
    if(value === true || value === false) return true
    return false
}

// Each Field has to Valid Means String

const isValid = function(value){
    if(typeof value ==='undefined' || value ===null)  return false
    if(typeof value ==='string' && value.trim().length ===0)return false
    return true
}
       
// Each Field has to Valid Means String and Number only not special Characters
const isValidBlogTitle = function(title){
    const bTitleregex = /^[A-Za-z0-9 ]+$/
    return bTitleregex.test(title)
}

module.exports = { isValidName, isValidTitle, isValidEmail, isValidObjectIds, isBoolean, isValid ,isValidBlogTitle}


