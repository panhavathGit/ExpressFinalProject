import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const verifyToken = (request,response,next) => {
    const authHeader = request.headers.authorization;
    if(!authHeader){
        return response.status(500).json({
            message : "Unauthorized"  
        })
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token,process.env.jwt_secret,(error,result) => {
        if(error){
            return response.status(500).json({
                message : "Token not verified"
            })
        }
        request.user = result.username;
        request.userID = result.id;
        next();
    })
}

export default verifyToken;