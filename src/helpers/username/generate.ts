import { data } from './data'

const all = data.length
export const generateUsername = (add?: any) => {
  const n = Math.floor(Math.random() * all)
  return `${data[n]} ${add}`
}
