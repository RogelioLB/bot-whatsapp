import { z } from "zod"
import { getCollections } from "~/shopify"

export default {
    parameters:z.object({}),
    description: "Obtener todas las colecciones o tambien le puedes llamar obtener todas las categorias",
    execute: async () => {
        const collections = await getCollections()
        return collections;
    }
}