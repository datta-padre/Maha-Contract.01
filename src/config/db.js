import mysql from 'mysql2';
import util from "util"
import dotenv from 'dotenv';
const { parsed = {} } = dotenv.config();

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password: 'root',
    database: 'maha_contract'
})

const executeQuery = util.promisify(pool.query).bind(pool);

export default executeQuery;