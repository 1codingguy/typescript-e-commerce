export const formatPrice = (number: number) => {
  return Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
  }).format(number)
}

// export const getUniqueValues = (data, type) => {
//   let unique = data.map(item => item[type])
//   if (type=== 'colors'){
//     unique = unique.flat()
//   }
//   return ['all', ...new Set(unique)]
// }
