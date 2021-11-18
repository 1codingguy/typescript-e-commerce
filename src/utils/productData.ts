/**
 * height categories:
 * 50: 50-59 cm
 * 60: 60-69 cm
 * 70: 70-79 cm
 * 80: 80-89 cm
 * 90: 90-99 cm
 * 100: 100-110cm
 *
 *
 * age categories:
 * 0: 0-3 months
 * 3: 3-6 months
 * 6: 6-9 months
 * 9: 9-12 months
 * 12: 12-24 months
 * 24: 24 months +
 */

export type productDataType = {
  id: string
  name: string
  category: string
  subCategory: string | null
  price: number
  forWhom: string
  height?: number[]
  age?: number[]
  color?: string[]
  description: string
  featured?: boolean
  images: string[]
}

export const productData: productDataType[] = [
  {
    id: 'c01',
    name: 'Organic Cotton Bodysuit',
    category: 'clothing',
    subCategory: 'bodysuit',
    price: 490,
    forWhom: 'baby boys and girls',
    height: [50],
    age: [6],
    description: 'this is c01 clothing description',
    featured: true,
    images: ['product_images/c01.JPG'],
  },
  {
    id: 'c02',
    name: 'FC Barcelona bodysuit',
    category: 'clothing',
    subCategory: 'bodysuit',
    price: 390,
    forWhom: 'baby boys',
    height: [60],
    age: [0, 3, 6, 9],
    description: 'this is c02 clothing description',
    images: ['product_images/c02-1.JPG', 'product_images/c02-2.JPG'],
  },
  {
    id: 't01',
    name: 'wooden chewing toy',
    category: 'toy',
    subCategory: null,
    price: 1780,
    forWhom: 'baby boys and girls',
    age: [0, 3, 6, 9, 12, 24],
    description: 'this is t01 toy description',
    featured: true,
    images: ['product_images/t01-1.JPG', 'product_images/t01-2.JPG'],
  },
  {
    id: 'a01',
    name: 'Vera Bradley mum\'s bag',
    category: 'accessories',
    subCategory: null,
    price: 990,
    forWhom: 'mummy',
    description: 'this is a01 accessories description',
    featured: true,
    images: ['product_images/a01-1.JPG', 'product_images/a01-2.JPG'],
  },
]

export const featuredProducts = productData.filter(product => product.featured)

