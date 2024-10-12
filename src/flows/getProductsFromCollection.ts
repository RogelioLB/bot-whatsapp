import { addKeyword, EVENTS } from "@builderbot/bot"
import { FlowDynamicMessage } from "@builderbot/bot/dist/types"
import { Product } from "~/shopify"

export const getProductsFromCollectionFlow = addKeyword(EVENTS.WELCOME).addAction(async (ctx,{state,flowDynamic,globalState}) => {
    const data = state.get("dataResult") as {products:Product[]}
    console.log(data)
    const {products} = data
    const history = state.get("history") || []
    const message = state.get("message") as string
    const messages = [...history,{content:message,role:"assistant"}]
    const flowMessages : FlowDynamicMessage[] = [{body:message,media:null}]
    products.forEach(product=>{
        const {title,images} = product
        const object : FlowDynamicMessage = {
            body: `${title}`.trim(),
            media: images[0].src
        }
        const message = {content:object.body,role:"assistant"}
        messages.push(message)
        flowMessages.push(object)
    })
    
    await state.update({history:messages})
    await flowDynamic(flowMessages)
})