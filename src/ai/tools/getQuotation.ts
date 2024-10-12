import { z } from "zod";
import { getQuotation } from "~/utils/skydropx";

export default {
    parameters: z.object({
        from: z.string().default("81470").describe("The origin zip code"),
        to: z.string().describe("The destination zip code"),
        weight: z.number().default(4).describe("The weight of the package"),
        length: z.number().default(20).describe("The length of the package"),
        width: z.number().default(20).describe("The width of the package"),
        height: z.number().default(20).describe("The height of the package")
    }),
    description: "Get a quotation for a package, by default the weight is 4 and the dimensions are 20x20x20",
    execute: async(params:{from:string,to:string,weight:number,length:number,width:number,height:number})=>{
        const quotation = await getQuotation(params);
        return quotation;
    }
}