import { addKeyword } from "@builderbot/bot";
import { Checkout } from "~/shopify";

export const checkoutURLFlow = addKeyword("checkoutURL").addAction(async (ctx,{state,flowDynamic,globalState}) => {
    const data = state.get("dataResult") as Checkout
    const history = state.get("history") || []
    const message = state.get("message") as string
    const messages = [...history,{content:message,role:"assistant"}]
    if(!data.cart){ return await flowDynamic("Hubo un error generando el link de compra") }
    const flowMessages = [{body:message,media:null}]
    const newMessage = {content:`${data.cart.checkoutUrl}`,role:"assistant"}
    messages.push(newMessage)
    flowMessages.push({body:data.cart.checkoutUrl,media:null})
    await state.update({history:messages})
    await flowDynamic(flowMessages);
})