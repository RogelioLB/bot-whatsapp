import { z } from "zod"
import { getProductsFromCollection } from "~/shopify"

export default {
    parameters: z.object({
        collectionId: z.string().describe("The collection id to get products from")
    }),
    description: "Get all products from a collection",
    execute: async ({collectionId}:{collectionId:string}) => {
        return await getProductsFromCollection(collectionId)
    }
}