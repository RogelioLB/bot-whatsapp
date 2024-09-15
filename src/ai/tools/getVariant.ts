import { z } from "zod";
import { getVariantId } from "~/shopify";

export default {
    parameters: z.object({
        productId: z.string().describe("The product id to get info from the product")
    }),
    description: "Get product variant by id",
    execute: async ({productId}:{productId:string}) => {
        const variant = await getVariantId(productId)
        
        if(variant.quantity >= 0){
            return "Out of stock";
        }
        return {variantId:variant.admin_graphql_api_id, productId:variant.product_id, price:variant.price, quantity:variant.quantity};
    }
}