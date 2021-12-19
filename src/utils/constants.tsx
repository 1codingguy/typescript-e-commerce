import { GiClothes } from 'react-icons/gi'
import { MdOutlineSmartToy } from 'react-icons/md'
import { FaBaby } from 'react-icons/fa'

export const links = [
  {
    id: 1,
    text: 'home',
    url: '/',
  },
  {
    id: 2,
    text: 'about',
    url: '/about',
  },
  {
    id: 3,
    text: 'products',
    url: '/products',
  },
]

export const services = [
  {
    id: 1,
    icon: <MdOutlineSmartToy />,
    title: 'toys',
    text: 'toys text',
  },
  {
    id: 2,
    icon: <GiClothes />,
    title: 'clothing',
    text: 'clothing text',
  },
  {
    id: 3,
    icon: <FaBaby />,
    title: 'accessories',
    text: 'accessories text',
  },
]

export const ageCategories = [
  { categoryKey: '0', categoryValue: '0-3 months' },
  { categoryKey: '3', categoryValue: '3-6 months' },
  { categoryKey: '6', categoryValue: '6-9 months' },
  { categoryKey: '9', categoryValue: '9-12 months' },
  { categoryKey: '12', categoryValue: '12-24 months' },
  { categoryKey: '24', categoryValue: '24 months +' },
]

export const heightCategories = [
  { categoryKey: '50', categoryValue: '50-59 cm' },
  { categoryKey: '60', categoryValue: '60-69 cm' },
  { categoryKey: '70', categoryValue: '70-79 cm' },
  { categoryKey: '80', categoryValue: '80-89 cm' },
  { categoryKey: '90', categoryValue: '90-99 cm' },
  { categoryKey: '100', categoryValue: '100-109 cm' },
  { categoryKey: '110', categoryValue: '110 cm +' },
]

export const API_ENDPOINT =
  'https://bqk6gkzk.api.sanity.io/v1/graphql/production/default'

export const QUERY = `
{
  allProduct {
    _id
    name
    categories {
      categories
    }
    clothingCategories {
      clothingCategories
    }
    price
    forWhom {
      forWhom
    }
    height {
      height
    }
    age {
      age
    }
    description
    featured
    images {
      asset {
        url
      }
    }
    colors
  }
}
`
