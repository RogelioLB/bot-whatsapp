import { z } from "zod";
import { getCheckoutUrl } from "~/shopify";

export default {
    parameters:z.object({
        cartId: z.string().describe("The cart id to get the checkout url")
    }),
    description: "Get checkout url",
    execute: async ({cartId}:{cartId:string}) => {
        console.log(cartId)
        const data = await getCheckoutUrl(cartId)
        console.log(data)
        return data;
    }
}