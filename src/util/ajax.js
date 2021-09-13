const config = {
  baseUrl: '/server/',
}

const serialize = (obj) => {
  const str = []
  for (const p in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  }
  return str.join('&')
}

export default function ajax (options) {
  const urlPrefix = options.urlPrefix || config.baseUrl

  if (options.params) {
    /* eslint-disable prefer-template */
    options.url += '?' + serialize(options.params)
  }

  const headers = {
    'X-Requested-With': 'XMLHttpRequest'
  }

  if (options.headers) {
    Object.assign(headers, options.headers)
  }

  let request

  if (options.file) {
    request = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.withCredentials = true
      xhr.responseType = 'json'

      headers['Content-Type'] = options.contentType || options.file.type
      headers['filename'] = encodeURIComponent(options.filename || options.file.name)

      xhr.upload.onprogress = options.fileProgressHandler || (() => {})

      xhr.onload = function onload () {
        if (xhr.status < 200 || xhr.status >= 300) {
          errorStatusHandle(xhr)
          reject(xhr.response)
        }
        resolve(xhr.response)
      }

      const method = options.method || 'post'

      xhr.open(method, urlPrefix + options.url, true)

      for (const key in headers) {
        xhr.setRequestHeader(key, headers[key])
      }

      xhr.send(options.file)
    })
  } else {
    headers['Content-Type'] = options.contentType || 'application/json'

    const props = {
      credentials: 'include',
      method: options.method || 'GET',
      headers
    }

    if (options.data) {
      props.body = options.formData ? options.data : JSON.stringify(options.data)
    }

    request = fetch(urlPrefix + options.url, props).then((response) => {
      console.log(response)
      if (response.ok) {
        return response.json()
      } else {
        return({
          success: false,
          error: response.statusText
        })
      }
    })
  }

  return new Promise((resolve, reject) => {
    request.then((res) => {
      const { success, error, data } = res

      console.log(res)
      if (success) {
        resolve(data)
      } else {
        reject(error)
      }
    })
  })
}