import request from 'utils/request'

export async function getTest() {
  return request.get('/test')
}
