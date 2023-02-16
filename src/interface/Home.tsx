import axios from 'axios'

export const getList = () => {
  return axios.get('/information')
}

export const addList = (params: any) => {
  return axios.post('/information', params)
}

export const delList = (id: any) => {
  return axios.delete('/information/' + id)
}

export const editList = (params: any, id: number) => {
  return axios.put('/information/' + id, params)
}

export const searchList = (key: string) => {
  return axios.get('/information?q=' + key)
}
