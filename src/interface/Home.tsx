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
