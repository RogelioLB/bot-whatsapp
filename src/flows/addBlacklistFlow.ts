import { addKeyword } from "@builderbot/bot";
import { addBlacklist } from "~/utils/blacklist";

export const addBlacklistFlow = addKeyword("addBlacklist").addAction(async (ctx,{blacklist,state,flowDynamic,globalState}) => {
    const number = ctx.from
    if(!blacklist.checkIf(number)) blacklist.add(number)
    else return await flowDynamic("Este numero ya esta en la lista negra")
    await flowDynamic("Alguien contactara lo mas pronto posible contigo. Recuerda que nuestro horario de servicio al cliente es de 8:00AM a 6:00PM, y los sabados de 8:00AM a 3:00PM")
    return;
})