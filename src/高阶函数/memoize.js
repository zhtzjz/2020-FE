/* eslint-disable */
//函数记忆用于将上次计算的结果缓存下来，当下次调用的时候如果参数相同就执行
function memoize(fn, hashser) {
  const memoize = function (key) {
    const address = hashser ? hashser.apply(this, arguments) : key
    const cache = memoize.cache
    if (!cache[address]) {
      cache[address] = fn.apply(this, arguments)
    }
    return cache[address]
  }
  memoize.cache = {}
  return memoize
}

// const add = function (a, b, c) {
//   return a + b + c
// }

// const memoizedAdd = memoize(add, function () {
//   return [].join.call(arguments, ',')
// })
// console.log(memoizedAdd(1, 2, 3))
// console.log(memoizedAdd(1, 2, 4))

// for (let i = 0; i <= 10; i++) {
//   console.log(fibonacci(i))
// }

// console.log(con)
let con = 0
const memoizedFibonacci = memoize(fibonacci)
function fibonacci(n) {
  con++
  return n < 2 ? n : memoizedFibonacci(n - 1) + memoizedFibonacci(n - 2)
}

for (let i = 0; i <= 10; i++) {
  memoizedFibonacci(i)
}

console.log(con)
