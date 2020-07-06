/* eslint-disable */
//函数组合
function toUpperCase(x) {
  return x.toUpperCase()
}

function hello(x) {
  return `HELLO${x}`
}

const greet = function () {
  return hello(toUpperCase('cavin'))
}

function compose() {
  const args = arguments
  const start = arguments.length - 1

  return function () {
    let i = start
    let result = args[start].apply(this, arguments)
    while (i--) {
      return (result = args[i].call(this, result))
    }
  }
}

const fn = compose(hello, toUpperCase)

console.log(fn('cavin'))
