import Mock from 'mockjs'

const sysLogCount = Mock.mock({
  success: true,
  code: 20000,
  data: {
    todayCount: '@integer(160, 1000)',
    monthCount: '@integer(160, 1000)',
    yearCount: '@integer(160, 1000)',
    online: '@integer(160, 1000)',
    dayrate: '@integer(160, 1000)',
    monthrate: '@integer(160, 1000)'
  },
  message: '请求成功'
})

export default {
  sysLogCount
}
