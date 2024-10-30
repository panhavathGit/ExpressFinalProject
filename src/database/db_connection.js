import mysql from 'mysql'
import { config } from 'dotenv'
config();

const pool = mysql.createPool({
    port : process.env.db_port,
    host : process.env.db_host,
    user : process.env.db_username,
    password : process.env.db_password,
    database : process.env.db_name

});

export default pool;