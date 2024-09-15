import { addKeyword, EVENTS } from "@builderbot/bot"
import { FlowDynamicMessage } from "@builderbot/bot/dist/types"
import { Products } from "types"
import { SearchProductsResponse } from "~/shopify"

export const searchProductFlow = addKeyword(EVENTS.WELCOME).addAction(async (ctx,{state,flowDynamic,globalState}) => {
    const data = state.get("dataResult") as SearchProductsResponse
    console.log(data)
    const {products,pageInfo} = data
    const history = state.get("history") || []
    const message = state.get("message") as string
    const messages = [...history,{content:message,role:"assistant"}]
    const flowMessages : FlowDynamicMessage[] = [{body:message,media:null}]
    let array : Products[] = []
    if(products == undefined) array = [data as unknown as Products];
    else array = products
    const list : string[] = []
    array.forEach(product=>{
        const {title,featuredImage,priceRange:{maxVariantPrice:{amount,currencyCode}},id,onlineStoreUrl} = product
        const object : FlowDynamicMessage = {
            body: `${title} - $${amount+currencyCode}`.trim(),
            media: featuredImage.url
        }
        list.push(`${title} - $${amount+currencyCode} con el id: ${id}`)
        flowMessages.push(object)
    })
    const messageList = list.join("\n")
    messages.push({content:messageList,role:"assistant"})
    flowMessages.push({body:`Viendo ${array.length} productos.`,media:null,buttons:[{body:"Ver mas"}]})
    messages.push({content:`Viendo ${array.length} productos. ${pageInfo.hasNextPage ? "Para ver mas productos, escribe 'mas'" : ""} Este es el cursor de referencia para ver mas productos ${pageInfo.endCursor}`,role:"assistant"})
    await state.update({history:messages})
    await flowDynamic(flowMessages)
})