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
  }
}
`
