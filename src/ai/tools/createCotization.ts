import { z } from "zod";
import { getCotization } from "~/utils/cotization";

export default {
    parameters: z.object({
        products: z.array(z.object({
            quantity: z.number().default(1).describe("The quantity of the product to add to cart"),
            unity: z.string().default("piezas").describe("The unity of the product"),
            code: z.string().describe("The code of the product"),
            description: z.string().describe("The title of the product"),
            brand: z.string().describe("The brand of the product"),
            price: z.number().describe("The price of the product"),
            sub_total: z.number().describe("El subtotal de los productos sin iva"),
            price_iva: z.number().describe("El iva del precio total de los productos")
        })).describe("The products to add to cart"),
        client: z.string().describe("The client name")
    }),
    description: "Crear una cotizacion a un cliente con los productos y cantidades que quiere comprar, se le genera un archivo pdf una vez que el usuario este listo con todos los productos que necesita.",
    execute: async ({products,client}:{
        products: {
            quantity: number;
            unity: string;
            code: string;
            description: string;
            brand: string;
            price: number;
            sub_total: number;
            price_iva: number;
        }[];
        client: string;
    }) => {
        const {id} = await getCotization(products,client)
        return {id}
    }
}