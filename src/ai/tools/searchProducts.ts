import { z } from "zod";
import { searchForProducts } from "~/shopify";

export default {
    parameters: z.object({
        query: z.string().describe("The query to search for products"),
        after: z.string().nullable().describe("The cursor to paginate the search")
    }),
    description: "Search for products only if the user requested it",
    execute: async ({query,after}:{query:string, after:string|null}) => {
        const data = await searchForProducts(query, after);
        return {
            products: data.products,
            pageInfo: data.pageInfo
        }
    }
}