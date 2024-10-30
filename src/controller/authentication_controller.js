import pool from "../database/db_connection.js";
import { isPasswordCorrect } from "../utils/verify_password.js";
import generateToken from "../utils/generate_token.js";
import bcrypt from 'bcrypt'


export const registerController = async (request,response) =>{
    const user_profile = request.file;
    const { username, email, password } = request.body;

    if( !user_profile || !username || !email || ! password){
        return response.status(400).json({
            message : "All fields must be required"
        })
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const sql = "Insert into Users(username,email,password,profile) values(?,?,?,?)";
    pool.query(sql,[username,email,hashedPassword,user_profile.filename],(error,result)=>{
        if(error){
            return response.status(400).json({
                message : error
            })
        }else{
            return response.status(200).json({
                message : "User registered successfully"
            })
        }
    })
}

export const loginController =  (request,response) => {
    const { username, password } = request.body;

    if( !username || ! password){
        return response.status(400).json({
            message : "All fields must be required"
        })
    }

    const sql = "Select * from users where username = ?";

    pool.query(sql,[username], async (error,row)=>{
        if(error){
            return response.status(404).json({
                message: error
            })
        }

        if(row){
            
            const verifiedPassword = await isPasswordCorrect(password,row[0].password);

            if(verifiedPassword){
                
                const username = row[0].username;
                const userID = row[0].id;

                return response.status(200).json({
                    username,
                    token : generateToken(userID,username),
                    message : "Login Successfully!"
                })
            }else{
                return response.status(404).json({
                    message : "Incorrect Password!"
                })
            }
        }  
    })
}
