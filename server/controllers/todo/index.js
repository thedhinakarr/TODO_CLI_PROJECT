//TODO LOGICS.

//ADD, Remove, edit, view todos functionality goes here.
import express from "express"


const router = express.Router();

router.post("/add",(req,res)=>{

    res.send("todo add called.")

})

router.post("/edit",(req,res)=>{
    res.send("todo edit called.")
})

router.post("/view",(req,res)=>{
    res.send("todo view called.")
})

export default router;