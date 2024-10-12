import { z } from "zod";
import { getProductById } from "~/shopify";

export default {
    parameters: z.object({
        productId: z.string().describe("The product id to get info from the product")
    }),
    description: "Get product info if the user asks for it",
    execute: async ({productId}:{productId:string}) => {
        console.log("productId", productId)
        const data = await getProductById(productId)
        return data;
    }
}