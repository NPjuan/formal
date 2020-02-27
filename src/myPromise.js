// 定义 promise 的三种状态
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
// 判断参数是否为 function
const ifFunction = variable => typeof variable === 'function'

class MyPromise {
  constructor (handle) {
    if (!ifFunction(handle)) {
      throw new Error('Promise must accept a function as parameter')
    }
    // 设置初始状态
    this._status = PENDING
    this._value = undefined
    // 设置回调函数队列
    this._fulfilledQueues = []
    this._rejectedQueues = []
    // 尝试执行
    try {
      // 通过 bind 方法让 this 执行实例而非原型
      handle(this._resolve.bind(this), this._reject.bind(this))
    } catch (err) {
      this._reject(err)
    }
  }
  // resolve
  _resolve (val) {
    const run = () => {
      if (this._status !== PENDING) return
      this._status = FULFILLED
      // 依次执行成功队列的函数，并清空队列
      const runFulfilled = (value) => {
        let cb
        while (cb = this._fulfilledQueues.shift()) {
          cb(value)
        }
      }
      const runRejected = (err) => {
        let cb
        while (cb = this._rejectedQueues.shift()) {
          cb(err)
        }
      }
      if (val instanceof MyPromise) {
        val.then(value => {
          this._value = value
          runFulfilled(value)
        }, err => {
          this._value = err
          runRejected(err)
        })
      } else {
        this._value = val
        runFulfilled(val)
      }
    }
    setTimeout(() => run(), 0)
  }
  // reject
  _reject (val) {
    if (this._status !== PENDING) return
    const run = () => {
      let cb
      this._status = REJECTED
      this._value = val
      while (cb = this._rejectedQueues.shift()) {
        cb(err)
      }
    }
    setTimeout(run, 0)
  }
  // then
  then (onFulfilled, onRejected) {
    const {_value, _status} = this
    // 返回新 Promise 对象 onFulfilledNext 相对于 resolve
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      // 成功时执行的函数
      let fulfilled = value => {
        try {
          // 如果不是函数，当作 resolve 并让下一个来执行
          if (!ifFunction(onFulfilled)) {
            onFulfilledNext(value)
          } else {
            // 查看执行结果
            let res = onFulfilled(value)
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回 Promise 对象
              // 必须等待该 Promise 对象的执行结果来决定何去何从
              // 这里的 onFulfilledNext 改变的是 return 的 Promise 的状态 而不是 res
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              // 否则结果直接作为参数，传入下一个 then 的回调函数
              onFulfilledNext(res)
            }
          }
        } catch (err) {
          // 如果执行函数出错，新的 Promise 对象状态为失败
          onRejectedNext(err)
        }
      }
      let rejected = value => {
        try {
          if (!ifFunction(onRejected)) {
            onRejectedNext(value)
          } else {
            let res = onRejected
            if (res instanceof MyPromise) {
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              onRejectedNext(res)
            }
          }
        } catch (err) {
          // 如果执行函数出错，新的 Promise 的对象状态为失败
          onRejectedNext(err)
        }
      }
      switch (_status) {
        case PENDING:
          this._fulfilledQueues.push(onFulfilled)
          this._rejectedQueues.push(onRejected)
          break
        case FULFILLED:
          fulfilled(_value)
          break
        case REJECTED:
          rejected(_value)
          break
      }
    })
  }
}

var p = new Promise(function (resolve, reject) {

})
  .then(() => {

  },() => {
    // onFulfilledNext 的作用是 resolve 启动下一个 onFUulfilled
  })
  .then(() => {

  },() => {

  })
