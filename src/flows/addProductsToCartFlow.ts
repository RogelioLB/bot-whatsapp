import { addKeyword } from "@builderbot/bot";
import { Cart } from "~/shopify";

export const addProductsToCartFlow = addKeyword("addProductsToCart").addAction(async (ctx,{state,flowDynamic,globalState}) => {
    const data = state.get("dataResult") as Cart
    const history = state.get("history") || []
    const message = state.get("message") as string
    const messages = [...history,{content:message,role:"assistant"}]
    const flowMessages = [{body:message,media:null}]
    const newMessage = {content:`Cart updated with id:"${data.cart.id}", and price ${data.cart.cost.totalAmount.amount}`,role:"assistant"}
    messages.push(newMessage)
    await state.update({history:messages})
    await flowDynamic(flowMessages);
})