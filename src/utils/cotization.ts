import exceljs from 'exceljs';
import path from "path"
import { fileURLToPath } from "url";
import { saveFile } from '~/db/files';
const { Workbook } = exceljs;
import { v4 as uuid } from "uuid"



export async function getCotization(products:Array<{
    quantity:number,
    unity:string,
    code: string,
    description: string,
    brand: string,
    price:number
}>,client:string){
    const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
    const __dirname = path.dirname(__filename); // get the name of the directory
    const identifier = uuid()
    const pathname = path.resolve(__dirname,"../files/Formato.xlsx")
    const workbook = new Workbook();
    await workbook.xlsx.readFile(pathname)
    const worksheet = workbook.worksheets[0]
    worksheet.getCell("G10").value = `Cotizacion #${Math.floor(Math.random()*9999)}CW`
    worksheet.getCell("B10").value = `Cliente: ${client}`
    let subtotal = 0;
    let iva = 0;

    products.forEach(({brand,code,unity,description,price,quantity},i)=>{
        const rowIndex = 13 + i
        const row = worksheet.getRow(rowIndex)
        row.values = [null,quantity,unity,code,description,brand,price,{formula:`(G${rowIndex}/1.16)*B${rowIndex}`},{formula:`H${rowIndex}*.16`}]
        row.getCell("B").border = {left:{style:"medium"},right:{style:"dotted"},top:{style:"thin"}}
        row.getCell("C").border = {left:{style:"thin"},right:{style:"dotted"},top:{style:"thin"}}
        row.getCell("D").border = {left:{style:"thin"},right:{style:"dotted"},top:{style:"thin"}}
        row.getCell("E").border = {left:{style:"thin"},right:{style:"dotted"},top:{style:"thin"}}
        row.getCell("F").border = {left:{style:"thin"},right:{style:"dotted"},top:{style:"thin"}}
        row.getCell("G").border = {left:{style:"thin"},right:{style:"dotted"},top:{style:"thin"}}
        row.getCell("H").border = {left:{style:"thin"},right:{style:"dotted"},top:{style:"thin"}}
        row.getCell("I").border = {left:{style:"thin"},right:{style:"medium"},top:{style:"thin"}}
        const numFmtStr = '_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)';
        row.getCell("G").numFmt = numFmtStr;
        row.getCell("H").numFmt = numFmtStr;
        row.getCell("I").numFmt = numFmtStr;
        subtotal = price / 1.16 * quantity
        iva += subtotal * .16
    })

    worksheet.getCell("H37").value = {formula:"SUM(H13:H32)", result:subtotal}
    worksheet.getCell("H38").value = {formula:"SUM(I13:I32)", result:iva}
    worksheet.getCell("H39").value = {formula:"H37+H38", result:subtotal+iva}
    worksheet.getCell("G9").value = "Fecha: " + new Date().toLocaleDateString()
    const buffer = await workbook.xlsx.writeBuffer()
    const data = await fetch("http://localhost:8080",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({data:Buffer.from(buffer).toString("base64")})
    }).then(res=>res.json())

    const id = await saveFile(identifier,Buffer.from(data.result,"base64"),"pdf")

    return {
        id
    }
}