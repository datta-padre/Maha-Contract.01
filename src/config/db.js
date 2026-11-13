import mysql from 'mysql2';
import util from "util"
import dotenv from 'dotenv';
const { parsed = {} } = dotenv.config();

const pool = mysql.createPool({
    host:'bnxq19pxr028il7kyfhg-mysql.services.clever-cloud.com',
    user:'u1t2h8peonye345s',
    password: 'kDFqy2nwMwxSgBMSCXmo',
    database: 'bnxq19pxr028il7kyfhg'
})

const executeQuery = util.promisify(pool.query).bind(pool);

export default executeQuery;