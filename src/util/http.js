import ajax from './ajax'

const Http = {
  get (url, params, options) {
    return ajax({ url, method: 'GET', params, ...options })
  },

  post (url, data, options) {
    return ajax({ url, method: 'POST', data, ...options })
  },

  put (url, data, options) {
    return ajax({ url, method: 'PUT', data, ...options })
  },

  delete (url, data, options) {
    return ajax({ url, method: 'DELETE', data, ...options })
  }
}

export const get = (url, params, options) => {
  return ajax({ url, method: 'GET', params, ...options })
}

export const post = (url, data, options) => {
  return ajax({ url, method: 'POST', data, ...options })
}

export const put = (url, data, options) => {
  return ajax({ url, method: 'PUT', data, ...options })
}

export const _delete = (url, data, options) => {
  return ajax({ url, method: 'DELETE', data, ...options })
}