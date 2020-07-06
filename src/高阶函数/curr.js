/* eslint-disable */
// 函数的柯里化就是将使用多参数的函数转化成一系列使用一个或n个参数的函数

function curry(fn, args) {
  const { length } = fn
  args = args || []

  return function () {
    const _args = args.slice(0)
    for (let i = 0; i < arguments.length; i++) {
      const arg = arguments[i]
      _args.push(arg)
    }

    if (_args.length < length) {
      return curry.call(this, fn, _args)
    } else {
      return fn.apply(fn, _args)
    }
  }
}

const result = curry(function (a, b, c) {
  return a + b + c
})(1, 2, 3)

console.log(result)
