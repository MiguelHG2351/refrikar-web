export function getListFromParam(param: String | null) {
  return param!?.split(',').map((param) => param.trim())
}