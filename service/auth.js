import jwt from "jsonwebtoken"


const secret = "sumit@123"
function setUser(user){
    return jwt.sign({...user},secret);
}
function getUser(token){
    if(!token) return null;
    return jwt.verify(token,secret)
}

export default {
    setUser,
    getUser
}