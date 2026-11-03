import mysql from 'mysql2';
import util from "util"
import dotenv from 'dotenv';
const { parsed = {} } = dotenv.config();

const pool = mysql.createConnection({
    host: parsed.HOST ?? process.env.HOST,
    user: parsed.USERNAME ?? process.env.USERNAME,
    password: parsed.PASSWORD ?? process.env.PASSWORD,
    database: parsed.DATABASE ?? process.env.DATABASE
})

console.log("Database connected successfully");

const executeQuery = util.promisify(pool.query).bind(pool);

export default executeQuery;