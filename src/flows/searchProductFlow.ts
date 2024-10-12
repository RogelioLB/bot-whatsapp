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
    const list : string[] = array.map(products=>`- ${products.title} - ${products.id}`)
    const messageList = list.join("\n")
    messages.push({content:messageList,role:"assistant"})
    flowMessages.push({body:`Viendo ${array.length} productos. Para ver más, escribe 'Más'`,media:null,buttons:[{body:"Ver mas"}]})
    await state.update({history:messages})
    await flowDynamic(flowMessages)
})