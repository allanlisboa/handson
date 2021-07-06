export const getChildrenCode = (code: string, parentCode: string): number => {
  code = code.substr(parentCode.length + 1, 1)
  return parseInt(code) + 1
}

export const sugestChildrenCode = (code: string): string => {
  code = code.replace(/\./g, ".999")
  let arr = code.split('.')
  let value = Number(arr[arr.length -1])
  value = value + 1
  return value.toString()
}
