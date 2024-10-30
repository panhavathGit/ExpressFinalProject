import express from "express"
import { config } from "dotenv"
import pool from "./src/database/db_connection.js"
import blogRouter from "./src/routes/blog_route.js";
import authRouter from "./src/routes/authentication_route.js";

config();

const app = express();
const port = 3000;

app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true })); 

//datbase connection
pool.getConnection((error,connection)=>{
    if(error){
        console.log("Fail to connect to database");
    }else{
        console.log("Successfully connected to database");
    }
    connection.release();
})

//to use route
app.use('/blog',blogRouter);
app.use('/auth',authRouter);

app.listen(port,() => {
    console.log(`server is running on http://localhost:${port}`);
})