export const generateUploadFilelist = (img) => {
  return img ?  [{
    uid: Date.now(),
    name: img.split('/').pop(),
    status: 'done',
    thumbUrl: img,
    response: { success: true, data: img}
  }] : []
}

export const clearAllCookie = () => {
  const keys = document.cookie.match(/[^ =;]+(?=\=)/g)
  if (keys) {
    for (var i = keys.length; i--;)
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
  }
}