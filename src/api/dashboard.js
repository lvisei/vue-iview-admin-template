import request from '@/utils/request'

export const getSysLogCountApi = () => {
  return request.get('/sys/log/count')
}
