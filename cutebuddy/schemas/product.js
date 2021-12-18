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
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'forWhom',
      title: 'For Whom',
      type: 'reference',
      to: [{ type: 'forWhom' }],
    },
    {
      name: 'price',
      type: 'number',
    },
    {
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
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
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
    },
  ],
}

export default product
