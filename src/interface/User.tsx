import axios from 'axios'

export const Login1 = (data: string) => {
  return axios.get('/userinfo/?q=' + data)
}
