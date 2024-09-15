import { z } from "zod";
import { addProductToCart } from "~/shopify";

export default {
    parameters: z.object({
        variantId: z.string().describe("The variant id from product to add to cart"),
        quantity: z.number().default(1).describe("The quantity of the product to add to cart"),
        cartId: z.string().describe("The cart id to add the product")
    }),
    description: "Add product to cart",
    execute: async ({variantId,quantity,cartId}:{variantId:string,quantity:number,cartId:string}) => {
        try{
            const result = await addProductToCart(variantId,quantity,cartId)
            console.log(result)
            return result;
        }catch(e){
            return "No se pudo agregar el producto al carrito, intenta especificando el modelo"
        }
    }
}