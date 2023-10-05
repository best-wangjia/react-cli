import axios from 'axios'

axios.defaults.timeout = 20000
axios.defaults.withCredentials = true
axios.defaults.baseURL = '/api'

axios.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type': 'application/json'
    }
    // console.log(config)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    // console.log(response)
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default axios

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, params)
    .then(response => resolve(response.data))
    .catch(error => reject(error))
  })
}

