import { z } from "zod";

export default {
    parameters: z.object({
    }),
    description: "Add a number to the blacklist if user wants to talk to a human",
    execute: async ({number}:{number:string}) => {
        return "Numero añadido a la lista negra"
    }
}