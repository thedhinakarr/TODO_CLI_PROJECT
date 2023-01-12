//TODO LOGICS.

//ADD, Remove, edit, view todos functionality goes here.
import express from "express"
import authMiddleWare from "../../middlewares/auth/verifytoken.js";
import randomStringGenerator from "../../utils/index.js";
import fs from "fs/promises"

const router = express.Router();

router.post("/add", authMiddleWare, async (req, res) => {
    try {
        console.log(req.headers)
        console.log(req.body)
        console.log(req.payload)

        let fileData = await fs.readFile("data.json")
        fileData = JSON.parse(fileData)
        
        console.log(fileData)
        let userFound = fileData.find((ele) => ele.email == req.payload.email);
        if (!userFound) {
            res.status(401).json({ "message": "Unauthorized." })
        }

        console.log(userFound.email)
        //Create a todo object to be added.
        let new_todo = {
            todoName: req.body.todoName,
            isCompleted: false,
            todo_id: randomStringGenerator(12)
        }
           
        userFound.todos.push(new_todo) 

        await fs.writeFile("data.json",JSON.stringify(fileData))
        res.status(200).json({success : "Task is up and running. "})

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" })
    }

})

router.post("/edit", authMiddleWare, (req, res) => {
    try {
        res.send("todo edit called.")
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" })
    }

})

router.post("/view", authMiddleWare, (req, res) => {
    try {
        res.send("todo view called.")
    } catch (error) {

    }
})

export default router;