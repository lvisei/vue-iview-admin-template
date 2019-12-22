import request from '@/helpers/request'

export const getSysLogCountApi = () => {
  return request.get('/sys/log/count')
}
