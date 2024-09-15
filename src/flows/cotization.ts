import { addKeyword } from "@builderbot/bot";
import { createWriteStream } from "fs";
import { Readable } from "stream";
import {ReadableStream} from "stream/web"
import { finished } from "stream/promises"
import path from "path";
import { fileURLToPath } from "url";

export const cotizationFlow = addKeyword("cotization").addAction(async (ctx,{state,flowDynamic,globalState}) => {
    const data = state.get("dataResult") as any
    const history = state.get("history") || []
    const message = state.get("message") as string
    const messages = [...history,{content:message,role:"assistant"}]
    if(!data.id){ return await flowDynamic("Hubo un error generando la cotizacion") }
    const flowMessages = [{body:message,media:null}]
    const resp = await fetch(`https://torke-chat-ai.vercel.app/download/${data.id}.pdf`)
    const fileName = `cotizacion-${data.id}.pdf`
    const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
    const __dirname = path.dirname(__filename); // get the name of the directory
    const dir = path.join(__dirname,"../../cotizaciones",fileName)
    if (resp.ok && resp.body) {
        const writer = createWriteStream(dir);
        await finished(Readable.fromWeb(resp.body as unknown as ReadableStream).pipe(writer))
        flowMessages.push({body:"Cotizacion creada",media:writer.path})
        await state.update({history:messages})
        await flowDynamic(flowMessages);
    }
})