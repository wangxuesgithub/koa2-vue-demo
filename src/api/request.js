import axios from 'axios'

const handleStatus = (res) => {
  return res.data
}

const handleError = (error) => {
  console.error(error)
}

axios.interceptors.request.use(function (config) {
  if (localStorage.token) {
    config.headers['X-Access-Token'] = localStorage.token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(undefined, err => {
  let res = err.response
  if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
    localStorage.token = null
    window.location = '/'
  }
})

export default {
  get (url, params) {
    let queryString = []

    if (params) {
      Object.keys(params)
        .forEach((key) => params[key] && queryString.push(`${key}=${params[key]}`))
    }

    if (queryString.length > 0) {
      queryString = queryString.join('&')
      url += `?${queryString}`
    }
    return axios
      .get(url)
      .then(handleStatus)
      .catch(handleError)
  },
  post (url, params) {
    return axios
      .post(url, params)
      .then(handleStatus)
      .catch(handleError)
  },
  put (url, params) {
    return axios
      .put(url, params)
      .then(handleStatus)
      .catch(handleError)
  },
  delete (url, params) {
    return axios
      .delete(url, params)
      .then(handleStatus)
      .catch(handleError)
  }
}
