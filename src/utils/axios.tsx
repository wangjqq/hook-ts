import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001'

// 响应拦截器
axios.interceptors.response.use(
  (res) => res, // 拦截到响应对象，将响应对象的 data 属性返回给调用的地方
  (err) => Promise.reject(err)
)
