import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

const model = openai('gpt-4o-mini');

export const describeImage = async ({image}:{image:Buffer}) => {
    const {text} = await generateText({
        model,
        messages: [{
            content: [{type:"image",image}],
            role:"user"
        }],
        system: `Eres un analizadore de imagenes, tienes que ver que producto es la imagen.
        El cliente preguntara por el producto que ve en la imagen. Tienes que contestar con solo el nombre del producto que tu creas que es.`,
    })
    return {text}
}