import sql from "mssql"
import { mssql } from "./db"
interface FileBot{id:string,file:Buffer,type:string}
const { MAX, UniqueIdentifier, VarBinary, VarChar } = sql;

export const saveFile = async (id:string,buffer:Buffer,type:string) => {
    console.log(buffer)
    console.log(type)
    try{
        const res = await mssql.request().input("id",UniqueIdentifier(),id).input("file",VarBinary(MAX),buffer).input("type",VarChar(100),type)
        .query<FileBot>("INSERT INTO FilesBot (id,[file],fileType) VALUES (@id,@file,@type)")
        return id
    }catch(err){
        console.log(err)
    }
}

export const getFile = async (uuid:string) => {
    const {recordset:[file]} = await mssql.query<FileBot>(`SELECT * FROM FilesBot WHERE id = '${uuid}'`)

    return file
}