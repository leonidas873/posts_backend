import  Jwt  from "jsonwebtoken";


export const requireAuth = async (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    // check jwt exists & verified

    if(token){
        Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken)=>{
            if(err) {
                console.log(err)
                res.status(403).send("your token is not valid")
            }  else {
                req.user = decodedToken;
                next()
            }
        })
    }
    else {
        res.status(401).send("you are not outhorized")
    }
}