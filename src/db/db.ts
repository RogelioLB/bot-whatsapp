import sql from "mssql"
import { config } from "dotenv"
config()

const sqlconfig : sql.config = {
    server:process.env.SERVER as string,
    database: process.env.DATABASE as string,
    port: 1940,
    user: process.env.USER as string,
    password: process.env.PASSWORD as string,
    options:{
        encrypt:true,
        trustServerCertificate:true
    }
}

export const mssql = await sql.connect(sqlconfig)