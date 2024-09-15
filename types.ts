export interface CollectionListings {
    collection_id: CollectionId
    body_html: string
    default_product_image: DefaultProductImage[]
    image: Image[]
    handle: string
    published_at: string
    title: string
    sort_order: string
    updated_at: string
  }
  
  export interface CollectionId {
    collection_id: number
  }
  
  export interface DefaultProductImage {
    src: string
  }
  
  export interface Image {
    src: string
  }

  export interface Products {
    id: string
    title: string
    onlineStoreUrl: string
    featuredImage: FeaturedImage
    priceRange: PriceRange
  }
  
  export interface FeaturedImage {
    url: string
  }
  
  export interface PriceRange {
    maxVariantPrice: MaxVariantPrice
  }
  
  export interface MaxVariantPrice {
    amount: number
    currencyCode: string
  }
  
  