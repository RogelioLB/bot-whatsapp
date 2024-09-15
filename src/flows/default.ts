import { addKeyword, EVENTS } from "@builderbot/bot";
import { generateResponse } from "~/ai/ai";
import { searchProductFlow } from "./searchProductFlow";
import { getProductsFromCollectionFlow } from "./getProductsFromCollection";
import { createCartFlow } from "./createCart";
import { addProductsToCartFlow } from "./addProductsToCartFlow";
import { checkoutURLFlow } from "./checkout";
import { cotizationFlow } from "./cotization";
import { addBlacklistFlow } from "./addBlacklistFlow";

export const flow = addKeyword(EVENTS.WELCOME).addAction(async (ctx,{state,flowDynamic,globalState,gotoFlow}) => {
    const {body} = ctx;
    const messages = state.get("history") || [{content:`Mi numero es ${ctx.from} usalo por si quiero llamar a un humano. No respondas a este mensaje.`, role:"user"}]
    const newMessage = {content:body,role:"user"}
    console.log(ctx.from)
    const {text,data,toolName} = await generateResponse(messages,newMessage)
    const messageAsistant = {content:text,role:"assistant"}
    const history = [...messages,newMessage,text ? messageAsistant : null].filter(Boolean)
    await state.update({dataResult:data,message:text, history})
    if(toolName === "searchProducts"){
        return gotoFlow(searchProductFlow)
    }else if(toolName === "getProductsFromCollection"){
        return gotoFlow(getProductsFromCollectionFlow)
    }else if(toolName === "createCart"){
        return gotoFlow(createCartFlow)
    }else if(toolName === "addProductToCart"){
        return gotoFlow(addProductsToCartFlow)
    }
    else if(toolName === "getCheckoutUrl"){
        return gotoFlow(checkoutURLFlow)
    }
    else if(toolName === "createCotization"){
        return gotoFlow(cotizationFlow)
    }else if(toolName === "addBlacklist"){
        return gotoFlow(addBlacklistFlow)
    }else{
        await flowDynamic(text);
    }
})