import { productDataType, productDataTypeKey } from './productData'

export const formatPrice = (number: number) => {
  return Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
  }).format(number)
}

export const getUniqueValues = (
  data: productDataType[],
  category: productDataTypeKey,
  noAllValue?: boolean
) => {
  let unique = data
    .map(item => item[category])
    .flat()
    .filter(Boolean)
  if (noAllValue) {
    return [...Array.from(new Set(unique))]
  }
  return ['all', ...Array.from(new Set(unique))]
}

export const sortUniqueCategoriesByFirstNumber: (
  categoryArray: string[]
) => string[] = categoryArray => {
  const copiedArray = [...categoryArray]
  return copiedArray.sort((a: string, b: string) => {
    return Number(a.match(/\d+/)![0]) - Number(b.match(/\d+/)![0])
  })
}
