import request from './request'

export default {
  login (form) {
    return new Promise((resolve, reject) => {
      request.post('/api/login', form).then((result) => {
        if ((result.code - 0) === 0) {
          console.log('login ok ........')
          resolve(result.data)
        } else {
          reject(new Error('用户名或密码错误！'))
          console.log('login error ........')
        }
      })
    })
  },
  register (form) {
    return new Promise((resolve, reject) => {
      request.post('/api/register', form).then((result) => {
        if ((result.code - 0) === 0) {
          console.log('register ok ........')
          resolve(result.data)
        } else {
          reject(new Error('注册失败'))
          console.log('register error ........')
        }
      })
    })
  },
  getUserList () {
    return new Promise((resolve, reject) => {
      request.get('/api/user').then((result) => {
        if ((result.code - 0) === 0) {
          resolve(result.result)
        } else {
          reject(new Error('获取失败'))
        }
      })
    })
  },
  deleteUser (id) {
    return new Promise((resolve, reject) => {
      request.post('/api/deleteUser', id).then((result) => {
        if ((result.code - 0) === 0) {
          resolve(result)
        } else {
          reject(new Error('操作失败'))
        }
      })
    })
  }
}
