const product = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'categories',
      type: 'reference',
      to: [{ type: 'categories' }],
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
    },
    {
      name: 'forWhom',
      title: 'For Whom',
      type: 'reference',
      to: [{ type: 'forWhom' }],
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
          }
        },
      ],
    },
    // hex code color in string
    {
      name: 'colors',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
}

export default product
