export const generateUploadFilelist = (img) => {
  return img ?  [{
    uid: Date.now(),
    name: img.split('/').pop(),
    status: 'done',
    thumbUrl: img,
    response: { success: true, data: img}
  }] : []
}
