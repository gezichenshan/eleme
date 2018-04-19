import axios from 'axios'
const BASE_URL = process.env.BASE_URL

export function goods() {
  const url = `${BASE_URL}/goods`
  return axios.get(url)
}

export function ratings() {
  const url = `${BASE_URL}/ratings`
  return axios.get(url)
}

export function seller() {
  const url = `${BASE_URL}/seller`
  return axios.get(url)
}
