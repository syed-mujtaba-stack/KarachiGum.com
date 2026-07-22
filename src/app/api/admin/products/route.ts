import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'
import fs from 'fs'
import path from 'path'

// Initial fallback catalog matching current website products
let localProductsStore = [
  {
    _id: "prod-1",
    id: "prod-1",
    name: "Guar Seeds",
    slug: "guar-seeds",
    category: "Raw Material",
    description: "Premium quality raw Guar seeds sourced directly from sustainable farms.",
    features: ["High Purity", "Natural Grade", "Farming Source"],
    image_url: "/Products/GuarSeeds.jpg",
    specs: [
      { label: "Purity", value: "99%" },
      { label: "Moisture", value: "Max 10%" }
    ],
    applications: ["Processing into Guar Splits", "Agricultural export"]
  },
  {
    _id: "prod-2",
    id: "prod-2",
    name: "Guar Splits",
    slug: "guar-splits",
    category: "Intermediate Product",
    description: "Refined splits obtained from de-husked Guar seeds, ready for gum processing.",
    features: ["High Viscosity Potential", "Low Impurity", "Consistent Quality"],
    image_url: "/Products/GuarSplits.jpg",
    specs: [
      { label: "Yield", value: "High" },
      { label: "De-husked", value: "98% Min" }
    ],
    applications: ["Guar Powder manufacturing", "Industrial refining"]
  },
  {
    _id: "prod-3",
    id: "prod-3",
    name: "Guar Meal Churi",
    slug: "guar-meal-churi",
    category: "Animal Feed",
    description: "High-protein animal feed supplement derived from the Guar milling process.",
    features: ["Protein Rich", "Livestock Feed", "Cost Effective"],
    image_url: "/Products/GuarMealChuri.jpg",
    specs: [
      { label: "Crude Protein", value: "38-40%" },
      { label: "Fiber", value: "10-12%" }
    ],
    applications: ["Cattle feed", "Poultry feed supplement"]
  },
  {
    _id: "prod-4",
    id: "prod-4",
    name: "Guar Meal Korma",
    slug: "guar-meal-korma",
    category: "Animal Feed",
    description: "Premium high-protein granular meal processed for poultry and cattle feed usage.",
    features: ["Max Protein Content", "Granular Form", "Digestible Energy"],
    image_url: "/Products/GuarMealKorma.jpg",
    specs: [
      { label: "Crude Protein", value: "50-55%" },
      { label: "Moisture", value: "Max 8%" }
    ],
    applications: ["Poultry nutrition", "Aquaculture feed"]
  },
  {
    _id: "prod-5",
    id: "prod-5",
    name: "Guar Gum Powder",
    slug: "guar-gum-powder",
    category: "Finished Product",
    description: "Versatile thickening and binding agent for food, industrial, and oil & gas applications.",
    features: ["Food & Industrial Grade", "Custom Mesh Size", "High Viscosity"],
    image_url: "/Products/GuarGumPowder.jpg",
    specs: [
      { label: "Viscosity", value: "3500-7500 cps" },
      { label: "Mesh Size", value: "200 mesh" }
    ],
    applications: ["Food industry", "Textile printing", "Oil & Gas drilling"]
  }
]

// Helper function to create Sanity Client with token if available
function getSanityClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  })
}

// Helper to save uploaded base64 image to public/uploads directory
async function saveUploadedImage(base64Data: string): Promise<string> {
  try {
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
    if (!matches || matches.length !== 3) {
      return base64Data // Return original if not base64 string
    }

    const mimeType = matches[1]
    const base64String = matches[2]
    const buffer = Buffer.from(base64String, 'base64')

    const extMap: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/jpg': '.jpg',
      'image/png': '.png',
      'image/webp': '.webp',
      'image/gif': '.gif',
    }
    const ext = extMap[mimeType] || '.jpg'
    const fileName = `product-${Date.now()}-${Math.floor(Math.random() * 1000)}${ext}`

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }

    const filePath = path.join(uploadsDir, fileName)
    fs.writeFileSync(filePath, buffer)

    return `/uploads/${fileName}`
  } catch (err) {
    console.error("Failed to save image file:", err)
    return "/Products/GuarGumPowder.jpg"
  }
}

// GET: List all products
export async function GET() {
  try {
    const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN
    if (token && projectId && dataset) {
      const client = getSanityClient()
      const query = `*[_type == "product"] | order(_createdAt desc) {
        _id,
        "id": _id,
        name,
        "slug": slug.current,
        category,
        image_url,
        description,
        features,
        specs,
        applications
      }`
      const sanityProducts = await client.fetch(query)
      if (sanityProducts && sanityProducts.length > 0) {
        return NextResponse.json(sanityProducts)
      }
    }
  } catch (error) {
    console.warn("Sanity fetch skipped or failed, using memory store:", error)
  }

  return NextResponse.json(localProductsStore)
}

// POST: Add new product with image upload
export async function POST(request: Request) {
  try {
    const body = await request.json()
    let { name, category, description, features, image_url, image_file, specs, applications } = body

    if (!name || !category || !description) {
      return NextResponse.json({ error: "Name, category, and description are required." }, { status: 400 })
    }

    // Process image file if uploaded
    if (image_file && image_file.startsWith('data:image/')) {
      image_url = await saveUploadedImage(image_file)
    }

    const slug = body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    const id = `prod-${Date.now()}`

    const newProduct = {
      _id: id,
      id: id,
      name,
      slug,
      category,
      description,
      image_url: image_url || "/Products/GuarGumPowder.jpg",
      features: Array.isArray(features) ? features : (features ? features.split(',').map((f: string) => f.trim()) : []),
      specs: specs || [],
      applications: Array.isArray(applications) ? applications : (applications ? applications.split(',').map((a: string) => a.trim()) : [])
    }

    // Try Sanity mutation if write token exists
    const writeToken = process.env.SANITY_API_WRITE_TOKEN
    if (writeToken && projectId && dataset) {
      try {
        const client = getSanityClient()
        const sanityDoc = {
          _type: 'product',
          name: newProduct.name,
          slug: { _type: 'slug', current: newProduct.slug },
          category: newProduct.category,
          description: newProduct.description,
          image_url: newProduct.image_url,
          features: newProduct.features,
          specs: newProduct.specs,
          applications: newProduct.applications
        }
        const createdDoc = await client.create(sanityDoc)
        newProduct._id = createdDoc._id
        newProduct.id = createdDoc._id
      } catch (err) {
        console.warn("Sanity write mutation error, stored in local memory:", err)
      }
    }

    // Always update local memory store for instant frontend availability
    localProductsStore.unshift(newProduct)

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create product" }, { status: 500 })
  }
}

// PUT: Update existing product with image upload
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    let { id, _id, name, category, description, features, image_url, image_file, specs, applications } = body
    const targetId = _id || id

    if (!targetId) {
      return NextResponse.json({ error: "Product ID is required for update." }, { status: 400 })
    }

    // Process image file if uploaded
    if (image_file && image_file.startsWith('data:image/')) {
      image_url = await saveUploadedImage(image_file)
    }

    const slug = body.slug || name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

    const index = localProductsStore.findIndex(p => p._id === targetId || p.id === targetId)
    if (index !== -1) {
      localProductsStore[index] = {
        ...localProductsStore[index],
        ...(name && { name }),
        ...(slug && { slug }),
        ...(category && { category }),
        ...(description && { description }),
        ...(image_url && { image_url }),
        ...(features && { features: Array.isArray(features) ? features : features.split(',').map((f: string) => f.trim()) }),
        ...(specs && { specs }),
        ...(applications && { applications: Array.isArray(applications) ? applications : applications.split(',').map((a: string) => a.trim()) })
      }
    }

    // Try Sanity mutation if write token exists
    const writeToken = process.env.SANITY_API_WRITE_TOKEN
    if (writeToken && projectId && dataset) {
      try {
        const client = getSanityClient()
        await client.patch(targetId).set({
          ...(name && { name }),
          ...(slug && { slug: { _type: 'slug', current: slug } }),
          ...(category && { category }),
          ...(description && { description }),
          ...(image_url && { image_url }),
          ...(features && { features }),
          ...(specs && { specs }),
          ...(applications && { applications })
        }).commit()
      } catch (err) {
        console.warn("Sanity update mutation error, updated in local memory:", err)
      }
    }

    const updatedProduct = index !== -1 ? localProductsStore[index] : body
    return NextResponse.json({ success: true, product: updatedProduct })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update product" }, { status: 500 })
  }
}

// DELETE: Remove product
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: "Product ID is required." }, { status: 400 })
    }

    localProductsStore = localProductsStore.filter(p => p._id !== id && p.id !== id)

    // Try Sanity deletion
    const writeToken = process.env.SANITY_API_WRITE_TOKEN
    if (writeToken && projectId && dataset) {
      try {
        const client = getSanityClient()
        await client.delete(id)
      } catch (err) {
        console.warn("Sanity delete mutation error:", err)
      }
    }

    return NextResponse.json({ success: true, id })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete product" }, { status: 500 })
  }
}
