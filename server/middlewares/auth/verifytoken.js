import jwt from "jsonwebtoken"

const privateKey = "dhinakar2109"

function authMiddleWare(req,res,next){
     try {
        //Fetch the Token from Headers

        let token = req.headers['auth-token'];
        //Verify the token 
        let payload = jwt.verify(token, privateKey);
        req.payload = payload;
        return next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: "Invalid Token / Token Expired" })
    }
}

export default authMiddleWare
