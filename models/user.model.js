// Bring mongoose
const mongoose = require("mongoose")

/**
 * name
 * userId
 * password
 * email
 * userType
 */
const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
    },
    userId : {
        type : String,
        require : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    emailId : {
        type : String,
        required : true,
        lowercase : true,
        minLength : 10,
        unique : true
    },
    userType : {
        type : String,
        default : "CUSTOMER",
        enum : ["CUSTOMERRR", "ADMIN"]
    }
    
},{timestamps : true, versionKey : false})

module.exports = mongoose.model("User", userSchema)