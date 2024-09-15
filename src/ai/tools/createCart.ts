import { z } from "zod"
import { createCart } from "~/shopify"

export default {
    parameters: z.object({
        variantId: z.string().describe("The variant id from product to add to cart"),
        quantity: z.number().default(1).describe("The quantity of the product to add to cart"),
    }),
    description: "Create cart to checkout",
    execute: async ({variantId,quantity}:{variantId:string,quantity:number}) => {
        const result = await createCart(variantId,quantity)
        return result.cartCreate;
    }
}