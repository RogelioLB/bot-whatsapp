import {config} from "dotenv";
import { createBot, createProvider, createFlow } from '@builderbot/bot'
import { MemoryDB as Database } from '@builderbot/bot'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { searchProductFlow } from "./flows/searchProductFlow";
import { flow } from "./flows/default";
import { getProductsFromCollectionFlow } from "./flows/getProductsFromCollection";
import { createCartFlow } from "./flows/createCart";
import { addProductsToCartFlow } from "./flows/addProductsToCartFlow";
import { checkoutURLFlow } from "./flows/checkout";
import { cotizationFlow } from "./flows/cotization";
import { addBlacklistFlow } from "./flows/addBlacklistFlow";
import { recognizeImages } from "./flows/recognizeImage";
config();

const PORT = process.env.PORT ?? 3008
enum STATUS {
    "Iniciando",
    "Listo",
    "Error",
    "Esperando accion"
}



const main = async () => {
    let status = STATUS["Iniciando"]
    const adapterFlow = createFlow([flow,searchProductFlow,getProductsFromCollectionFlow,createCartFlow,addProductsToCartFlow,checkoutURLFlow,cotizationFlow,addBlacklistFlow,recognizeImages])
    
    const adapterProvider = createProvider(Provider)
    const adapterDB = new Database()

    const { handleCtx, httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB
    })

    adapterProvider.server.get("/v1/status",
        handleCtx(async (bot,req,res)=>{
            res.writeHead(200, { 'Content-Type': 'application/json' })
            switch(status){
                case STATUS["Iniciando"]:
                    return res.end(JSON.stringify({status:"Iniciando"}))
                case STATUS["Listo"]:
                    return res.end(JSON.stringify({status:"Listo"}))
                case STATUS["Error"]:
                    return res.end(JSON.stringify({status:"Error"}))
                case STATUS["Esperando accion"]:
                    return res.end(JSON.stringify({status:"Esperando accion"}))
            }
        })
    )

    adapterProvider.on("require_action",(arg)=>{
        status = STATUS["Esperando accion"]
    })

    adapterProvider.on("ready",()=>{
        status = STATUS["Listo"]
    })

    adapterProvider.server.post(
        '/v1/messages',
        handleCtx(async (bot, req, res) => {
            const { number, message, urlMedia } = req.body
            await bot.sendMessage(number, message, { media: urlMedia ?? null })
            return res.end('sended')
        })
    )

    adapterProvider.server.post(
        '/v1/register',
        handleCtx(async (bot, req, res) => {
            const { number, name } = req.body
            await bot.dispatch('REGISTER_FLOW', { from: number, name })
            return res.end('trigger')
        })
    )

    adapterProvider.server.post(
        '/v1/samples',
        handleCtx(async (bot, req, res) => {
            const { number, name } = req.body
            await bot.dispatch('SAMPLES', { from: number, name })
            return res.end('trigger')
        })
    )

    adapterProvider.server.post(
        '/v1/blacklist',
        handleCtx(async (bot, req, res) => {
            const { number, intent } = req.body
            if (intent === 'remove') bot.blacklist.remove(number)
            if (intent === 'add') bot.blacklist.add(number)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({ status: 'ok', number, intent }))
        })
    )

    httpServer(+PORT)
}

main()
