/**
 * This will be the starting file of the project
 */
const express = require("express")
const mongoose = require("mongoose")
const app = express() // Express operator -> function
const server_config = require("./configs/server.config")
const db_config = require("./configs/db.config")
const user_model = require("./models/user.model")
const bcrypt = require("bcryptjs")


/**
 * Create an admin user at starting of application if not already present
 */
// Connection with mongoDb
mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("error", ()=>{
    console.log("Error while connecting to mongoDb")
})

db.once("open", ()=>{
    console.log("Connected to mongoDb")
    init()
})

async function init() {
    try {
        let user = await user_model.findOne({userId : "admin"})

        if(user) {
            console.log("Admin is already present")
            return
        }
    }catch(err) {
        console.log("Error while reading the data", err)
    }

    try {
        user = await user_model.create({
            name : "Soumyadeep",
            userId : "admin",
            emailId : "soumyadeep.dey162003@gmail.com",
            userType : "ADMIN",
            password : bcrypt.hashSync("ADMIN-PASSWORD", 8) // Encrypt password
        })
        console.log("Admin created", user)

    }catch(err) {
        console.log("Error while creating admin", err)
    }
}

/**
 * Start the server
 */

/** 
 * MAKE IT CENTRALISED SINCE PORT NO. CAN CHANGE
 * app.listen(8080, ()=>{ // 8080 -> Port number
 *   console.log("Server started")
 * })
*/

app.listen(server_config.PORT, ()=>{
    console.log("Server started at port number : ", server_config.PORT)
})