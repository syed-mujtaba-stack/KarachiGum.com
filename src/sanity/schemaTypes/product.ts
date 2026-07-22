import { defineField, defineType } from 'sanity'

export const productSchema = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Finished Product', value: 'Finished Product' },
          { title: 'Raw Material', value: 'Raw Material' },
          { title: 'Intermediate Product', value: 'Intermediate Product' },
          { title: 'Animal Feed', value: 'Animal Feed' },
          { title: 'Food Grade', value: 'Food Grade' },
          { title: 'Industrial Grade', value: 'Industrial Grade' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image_url',
      title: 'Image URL or Path',
      type: 'string',
      description: 'URL or path to product image (e.g. /Products/GuarGumPowder.jpg or external CDN URL)',
    }),
    defineField({
      name: 'image',
      title: 'Product Image Upload',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'specs',
      title: 'Specifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'value', type: 'string', title: 'Value' },
          ],
        },
      ],
    }),
    defineField({
      name: 'applications',
      title: 'Applications',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
