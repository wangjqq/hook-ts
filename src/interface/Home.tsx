import axios from 'axios'

interface IInfo {
  key: number
  name: string
  des: string
  age: string
  number: string
}

export const getList = (page: number, size: number) => {
  return axios.get('/information?_page=' + page + '&_limit=' + size)
}

export const addList = (params: IInfo) => {
  return axios.post('/information', params)
}

export const delList = (id: number) => {
  return axios.delete('/information/' + id)
}

export const editList = (params: IInfo, id: number) => {
  return axios.put('/information/' + id, params)
}

export const searchList = (key: string) => {
  return axios.get('/information?q=' + key)
}
