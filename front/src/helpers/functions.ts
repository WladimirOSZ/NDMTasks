
export const formatDate = (date: string) => {
  return new Date(date).toLocaleString()
}

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}