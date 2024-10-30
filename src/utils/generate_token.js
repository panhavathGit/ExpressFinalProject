import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config();

const generateToken = (id,username)=>{
    return jwt.sign(
        {id, username},
        process.env.jwt_secret,
        {
            expiresIn : process.env.jwt_expired
        }
        
    )
}
export default generateToken;