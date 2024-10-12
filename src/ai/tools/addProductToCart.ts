import { z } from "zod";
import { addProductToCart } from "~/shopify";

export default {
    parameters: z.object({
        products: z.array(z.object({
            variantId: z.string().describe("The variant id from product to add to cart, in this way 'gid://shopify/ProductVariant/48061673898259' as example"),
            quantity: z.number().default(1).describe("The quantity of the product to add to cart")
        })).describe("The products to add to cart"),
        cartId: z.string().describe("The cart id to add the product")
    }),
    description: "Add product to cart",
    execute: async ({products,cartId}:{products:{
        variantId:string,
        quantity:number
    }[],cartId:string}) => {
        try{
            console.log("products", products)
            const result = await addProductToCart(products,cartId)
            console.log("addProductToCart", result)
            return result;
        }catch(e){
            return "No se pudo agregar el producto al carrito, intenta especificando el modelo"
        }
    }
}