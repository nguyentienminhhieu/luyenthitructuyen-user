export const checkStatusClass = (validation) => {
  return validation.$error
}

export const mustOnlyNumber = (value) => {
  return /^\d+$/.test(value)
}
export const mustNotSymbol = (value) => {
  const regex = /^[a-zA-Z\s]+$/
  return regex.test(value)
}
export const mustOnlyNumberAndSymbol = (value) => {
  const regex = /^[a-zA-Z0-9]*$/
  return regex.test(value)
}
export const mustPhomeNumber = (value) => {
  const regex = /^(0[0-9]{9,10})$/
  return regex.test(value)
}
export const passwordRegex = (value) => {
  const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return regex.test(value)
}
