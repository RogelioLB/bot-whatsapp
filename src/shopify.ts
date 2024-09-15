import {createAdminRestApiClient} from "@shopify/admin-api-client"
import {createStorefrontApiClient} from '@shopify/storefront-api-client';
import { CollectionListings, Products } from "types";

const admin = createAdminRestApiClient({
    accessToken: process.env.ACCESS_TOKEN,
    storeDomain:process.env.STORE_DOMAIN,
    apiVersion:"2024-10"
})

const store = createStorefrontApiClient({
    publicAccessToken: process.env.PUBLIC_ACCESS_TOKEN,
    storeDomain:process.env.STORE_DOMAIN,
    apiVersion:"2024-10"
})



export const getCollections = async () => {
    const collections : CollectionListings[] = await admin.get("collection_listings",{
        searchParams:{
            limit:100,
        }
    }).then(res=>res.json()).then(data=>data.collection_listings)
    return collections
}

export const getProductsFromCollection = async (collectionId:string) => {
    const products : {products:Product[]} = await admin.get(`collections/${collectionId}/products`).then(res=>res.json()).then(data=>data.products)
    return products 
}

export interface SearchProductsResponse {
    products:Products[]
    pageInfo:{
        hasNextPage:boolean
        endCursor:string
    }
}

export const searchForProducts  = async (query:string,after:string | null) => {
    const operationWithPagination = `
        query searchProducts($query: String!, $first: Int, $after: String) {
            search(query: $query, first: $first, types: PRODUCT, after: $after) {
                pageInfo {
                    hasNextPage
                    endCursor
                }
                edges {
                    node {
                        ... on Product {
                            id
                            title
                            onlineStoreUrl
                            featuredImage {
                                url
                            }
                            priceRange {
                                maxVariantPrice {
                                    amount
                                    currencyCode
                                }
                            }
                        }
                    }
                }
            }
        }
    `
    const results = await store.request(operationWithPagination,{
        variables:{
            query:query,
            first:5,
            after
        }
    })
    const {data:{search:{edges,pageInfo}}} = results
    const products : Products[] = edges.map(edge=>edge.node)
    return {
        products,
        pageInfo
    } as SearchProductsResponse
}

export interface Product {
    body_html: string
    created_at: string
    handle: string
    id: number
    images: Image[]
    options: Options
    product_type: string
    published_at: string
    published_scope: string
    status: string
    tags: string
    template_suffix: string
    title: string
    updated_at: string
    variants: Variant[]
    vendor: string
  }
  
  export interface Image {
    id: number
    product_id: number
    position: number
    created_at: string
    updated_at: string
    width: number
    height: number
    src: string
    variant_ids: VariantId[]
  }
  
  export interface VariantId {}
  
  export interface Options {
    id: number
    product_id: number
    name: string
    position: number
    values: string[]
  }
  
  export interface Variant {
    barcode: string
    compare_at_price: any
    created_at: string
    fulfillment_service: string
    grams: number
    weight: number
    weight_unit: string
    id: number
    inventory_item_id: number
    inventory_management: string
    inventory_policy: string
    inventory_quantity: number
    option1: string
    position: number
    price: number
    product_id: number
    requires_shipping: boolean
    sku: string
    taxable: boolean
    title: string
    updated_at: string
  }
  

export const getProductById = async (productId:string) => {
    const {product} : {product:Product} = await admin.get(`products/${productId}`).then(res=>res.json())
    return product
}

export interface CartCreateResponse {
    cartCreate:Cart
}

export interface Cart{
    cart:{
        id:string
        cost:{
            totalAmount:{
                amount:number
                currencyCode:string
            }
        }
    }
}

export const createCart = async (variantId:string,quantity:number) => {
    const operation = `
        mutation {
            cartCreate (
                    input: {
                        lines :[{
                            quantity: ${quantity},
                            merchandiseId: "${variantId}"
                        }]
                    }
            ) {
                cart{
                    id,
                    cost {
                        totalAmount {
                            amount
                            currencyCode
                        }
                    }
                }
            }
        }
    `
    const results = await store.request(operation)
    const data = results.data as CartCreateResponse
    return data;
}

interface CartLinesAddResponse {
    cartLinesAdd:Cart
}

export const addProductToCart = async (productId:string,quantity:number,cartId:string) => {
    const operation = `
        mutation cartLinesAdd {
            cartLinesAdd (
                cartId: "${cartId}"
                lines: [{
                    quantity: ${quantity},
                    merchandiseId: "${productId}"
                }]
            ) {
                cart{
                    id,
                    cost {
                        totalAmount {
                            amount
                            currencyCode
                        }
                    }
                }
            }
        }
    `
    const results = await store.request(operation)
    const data = results.data as CartLinesAddResponse
    return data.cartLinesAdd;
}


export interface Checkout{
    cart:{
        checkoutUrl:string
    }
}
export const getCheckoutUrl = async (cartId:string) => {
    const operation = `
    query checkoutUrl {
  cart(id: "${cartId}") {
    checkoutUrl
  }
}`
    const results = await store.request(operation)
    return results.data as Checkout
}

export const getVariantId = async (productId:string) => {
    console.log(productId)
    if(productId.includes("gid://shopify/Product/")){
    const id = productId.split("gid://shopify/Product/")[1];
    const data = await admin.get(`products/${id}/variants`).then(res=>res.json())
    return data.variants[0];
    }
    else{
        const data = await admin.get(`products/${productId}/variants`).then(res=>res.json())
        return data.variants[0]
    }
}
