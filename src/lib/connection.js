import {createConnection} from "mysql2/promise"
import {config} from "dotenv";
config();

export const db = await createConnection({
    port : process.env.DB_PORT,
    host : process.env.DB_HOST,
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
});