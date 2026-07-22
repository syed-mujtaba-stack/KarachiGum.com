import { groq } from 'next-sanity'

export interface ProductSpec {
  label: string
  value: string
}

export interface Product {
  _id?: string
  id?: string | number
  name: string
  slug: string
  category: string
  image_url?: string | null
  image?: any
  description: string
  features?: string[]
  specs?: ProductSpec[]
  applications?: string[]
}

export const GET_ALL_PRODUCTS_QUERY = groq`
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    "id": _id,
    name,
    "slug": slug.current,
    category,
    image_url,
    image,
    description,
    features,
    specs,
    applications
  }
`

export const GET_PRODUCT_BY_SLUG_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    "id": _id,
    name,
    "slug": slug.current,
    category,
    image_url,
    image,
    description,
    features,
    specs,
    applications
  }
`
