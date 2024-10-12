import { addKeyword, EVENTS } from "@builderbot/bot"
import path from "path"
import { BaileysProvider } from "@builderbot/provider-baileys"
import { describeImage } from "~/ai/vision"
import { readFile, rm } from "fs/promises"
import { __dirname } from "~/utils/dirname"

export const recognizeImages = addKeyword(EVENTS.MEDIA).addAction(async (ctx,params) => {
    const {state,flowDynamic} = params;
    try{
        const pathname = path.join(__dirname,"../../tmp")
        const provider = params.provider as BaileysProvider
        const messages = state.get("history") || [{content:`Mi numero es ${ctx.from} usalo por si quiero llamar a un humano. No respondas a este mensaje.`, role:"user"}]
        const pathFile = await provider.saveFile(ctx,{path:pathname})
        const image = await readFile(pathFile)
        const {text} = await describeImage({image})
        await rm(pathFile)
        const newMessage = {content:`Envie una imagen con la siguiente descripcion: ${text}. Si no es necesaria ignorala.`,role:"user"}
        const assistantMessage = {content:"¿Que te gustaria hacer con esa imagen? Puedo buscar si encuentro alguna coincidencia si deseas.",role:"assistant"}
        const history = [...messages,newMessage,assistantMessage].filter(Boolean)
        await state.update({history})
        return await flowDynamic(assistantMessage.content);
    }catch(e){
        return await flowDynamic("Ha ocurrido un error al procesar la imagen.")
    }
})