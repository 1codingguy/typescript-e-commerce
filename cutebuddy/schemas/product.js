const product = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: field => field.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: field => field.required(),
    },
    {
      name: 'brand',
      type: 'string',
    },
    {
      name: 'categories',
      type: 'reference',
      to: [{ type: 'categories' }],
      validation: field => field.required(),
    },
    // eq to subCategory
    {
      name: 'clothingCategories',
      type: 'reference',
      to: [{ type: 'clothingCategories' }],
    },
    {
      name: 'price',
      type: 'number',
      validation: field => field.required(),
    },
    {
      name: 'stock',
      type: 'number',
      validation: field => field.required(),
    },
    {
      name: 'forWhom',
      title: 'For Whom',
      type: 'reference',
      to: [{ type: 'forWhom' }],
      validation: field => field.required(),
    },
    {
      name: 'height',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'height' }],
        },
      ],
    },
    {
      name: 'age',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'age' }],
        },
      ],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      validation: field => field.required(),
    },
  ],
}

export default product
