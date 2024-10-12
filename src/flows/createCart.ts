import { addKeyword, EVENTS } from "@builderbot/bot";
import { Cart } from "~/shopify";

export const createCartFlow = addKeyword(EVENTS.WELCOME).addAction(async (ctx,{state,flowDynamic,globalState}) => {
    const data = state.get("dataResult") as Cart
    const history = state.get("history") || []
    const message = state.get("message") as string
    const messages = [...history,{content:message,role:"assistant"}]
    const flowMessages = [{body:message,media:null}]
    if(data.cart){
        console.log("Cart created")
        const newMessage = {content:`Cart created with id: "${data.cart.id}", and price ${data.cart.cost.totalAmount.amount}. Use this to add more products`,role:"assistant"}
        messages.push(newMessage)
    }
    await state.update({messages:messages})
    await flowDynamic(flowMessages);
})
