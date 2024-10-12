import { config } from "dotenv";
config()
const API_URL = process.env.API_URL || 'https://api.skydropx.com';


interface Quotation{
    amount_local: string
    currency_local: string
    provider: string
    service_level_name: string
    service_level_code: string
    days: number
    ferri_price: number
    insurance_fee: number
    out_of_area_service: boolean
    out_of_area_pricing: number
    total_pricing: string
    is_ocurre: boolean
    extra_dimension_price: number
}

export const getQuotation = async ({from, to, weight, length, width, height}:{
    from: string,
    to: string,
    weight: number,
    length: number,
    width: number,
    height: number
}) => {
    const response = await fetch(`${API_URL}/v1/quotations`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        "Authorization": `Token token=${process.env.SKYDROPX_API_KEY}`
        },
        body: JSON.stringify({zip_from:from, zip_to:to, parcel: {weight, length, width, height}}),
    });
    const data : Quotation[] = await response.json();
    const quotations = data.map(q=>{
        if(q.days<0 || q.days > 20){
            return null;
        }
        return q
    }).filter(Boolean)

    const promedio = quotations.reduce((acc,curr)=>acc+curr.days,0)/quotations.length
    const demora = promedio + 3
    return {message:`El tiempo de entrega es de ${promedio} días y con retraso hasta ${demora} días`,quotations}
}
