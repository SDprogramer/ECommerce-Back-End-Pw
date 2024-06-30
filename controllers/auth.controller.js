/**
 * I need to write the controller / logic to register a user
 */

const bcrypt = require("bcryptjs")
const user_model = require("../models/user.model")
exports.signup = async (req, res)=> { // signup availbale everywhere in the code
    /**
     * Logic to create the user
     */
    // 1. Read the request body
    const request_body = req.body

    // 2. Insert the data in Users collection in mongoDB
    const userObj = {
        name : request_body.name,
        userId : request_body.userId,
        emailId : request_body.emailId,
        userType : request_body.userType,
        password : bcrypt.hashSync(request_body.password, 8)
    }

    try {

        const user_created = await user_model.create(userObj)
        /**
         * Return this user
         */
        const res_obj = {
            name : user_created.name,
            userId : request_body.userId,
            emailId : request_body.emailId,
            userType : request_body.userType,
            createdAt : request_body.createdAt,
            updatedAt : request_body.updatedAt
        }
        res.status(201).send(res_obj) // 201 -> Successfully created 

    }catch(err) {
        console.log("Error while registering the user", err)
        res.status(500).send({ // 500 -> Internal server error
            message : "Some error happened while registering the user"
        })
    }

    // 3. Return response back to the user
}