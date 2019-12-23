import request from '@/helpers/request'

export const getSysLogCountApi = () => {
  return request.get('mock/sys/log/count')
}
