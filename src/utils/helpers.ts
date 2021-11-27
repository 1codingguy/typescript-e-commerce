import { productDataType, productDataTypeKey } from './productData'

export const formatPrice = (number: number) => {
  return Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
  }).format(number)
}

export const getUniqueValues = (
  data: productDataType[],
  category: productDataTypeKey
) => {
  let unique = data.map(item => item[category]).flat().filter(Boolean)
  // if (category === 'colors') {
  //   unique = unique.flat()
  // }

  return ['all', ...Array.from(new Set(unique))]
}
