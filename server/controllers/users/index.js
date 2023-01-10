//THE USERS LOGIC ROUTE.
//THIS route is responsible for serving the requests for registration, login.

import express from "express"
import fs from "fs/promises"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {userRegistrationValidation, userLoginValidations , errorMiddleWare } from "/Users/dvk/JSEveryday/dhinakarr/FINALTODOCLI/server/middlewares/validations/validations.js"
import authMiddleWare from "../../middlewares/auth/verifytoken.js"

//Setting up a router, this will redirect routes here.

const router = express.Router(); //THink of this like a port... Connections for the requests /api/users happen here.

//NOTICE, we use router.post instead of app.post. THis is for internal redirection.

//THE VALIDATION MIDDLEWARES ARE USED HERE.
/* 
        HOW THIS WORKS:

        1.When the api call /api/user/register is made, this route is invoked.

        2.The incoming request body contains the credentials required for the operation to happen.

        3.The UserRegistration is invoked, the request body is checked and are returned to the errorMiddleWare.

        4.The errorMiddleware breaks the pipeline if there are any invalid submission, by returning a response object 
          for dumb mistakes.


        5.NOTE THAT THIS IS NOT A AUTHENTICATOR. DOES NOT LOGIN OR ANYTHING. ONLY CHECKS
          if the format of the given credentials are valid in the request body. CHECKS FOR DUMB USER ERRORS.

        6. If everythong goes smoothly in the userRegistrationValidation(), the errorMiddleware goes on to the
            next function which is the next anonymous function after the comma. FUCKIN SMART Isn't it?
 */
router.post("/register",userRegistrationValidation(),errorMiddleWare,async (req,res)=>{
    try {
        let { username, email, password, location, phone} = req.body;
        //THIS CREATES VARIABLES: username, email, password, location, phone from the request object's body.
        //Deriving variables from objects.

        let fileData = await fs.readFile("data.json")
        fileData = JSON.parse(fileData)

        //Check for duplicates
        let userFound = fileData.find((ele)=> ele.email==req.body.email);
        if(userFound){
            return res.status(409).json({error:"User already exists. Login."})
        }
        /* From this point onwards, we are good to go with user registration. */

        password = await bcrypt.hash(password,12);
        let newUserData = {email, username, password, location, phone, todos:[]}
        fileData.push(newUserData);

        await fs.writeFile("data.json", JSON.stringify(fileData));
        res.status(200).json({"success":"User successfully registered."})
    } catch (error) {
        console.log("Error")
        res.status(500).json({ error: "Internal Server Error" });
    }
})


//WILL BE USING JSON WEB TOKENS FOR LOGIN. ITS GONNA BE FUN.

router.post("/login",userLoginValidations(),errorMiddleWare,async (req,res)=>{

   try {
    console.log(req)
    //Read file... As usual.
    let fileData = await fs.readFile("data.json");
    fileData= JSON.parse(fileData);

    //Find user
    let foundUser = fileData.find((ele)=> ele.email == req.body.email);
    if(!foundUser){
        req.status(401).json({error:"Unauthorized."})
        //If user not found, you cannot login.
    }
    let password = req.body.password;
    

    //HASHED PASSWORDS COMPARISON:
    const matchPassword = await bcrypt.compare(password, foundUser.password);

        if (!matchPassword) {
            return res.status(401).json({ error: "Unauthorised Access" })
        }

        const payload = { email: req.body.email, username: foundUser.username };
        const privateKey = "codeforindia";
        const token = jwt.sign(payload, privateKey,{expiresIn:'1h'});

        res.status(200).json({ success: "Login is Successful" ,token});
 
   } catch (error) {
    res.send("FUCKED")
   }
})


export default router; //This will be connected in app.js

