//MAIN DRIVING CODE.
//INITIATES THE SERVER
/* Any api calls to this server will be routed from here. */

import express from "express";
import UserRouter from "./controllers/users/index.js";
import TodoRouter from "./controllers/todo/index.js"

//INSTANTIATION.
const app = express();
const port = 6003;

//CONVERTS ALL INBOUNDS TO JSON
app.use(express.json()); 
app.get("/",(req,res)=>{
    res.send("server is up.")
})

/* We are gonna route everything */

app.use("/api/user",UserRouter);
app.use("/api/todo",TodoRouter);

/* This keeps the code in app.js very minimal, easy to read and 
is very advantageous. Route logics will be solved elsewhere. */

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})