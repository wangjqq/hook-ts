import axios from 'axios'

export const Reguser = (data: string) => {
  return axios.get('/userinfo/?q=' + data)
}
