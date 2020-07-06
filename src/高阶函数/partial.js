/* eslint-disable */
// 偏函数

// 将一个多元（多参数）函数,转换成一个n-xu源的函数

function partial(fn) {
  const args = [].slice.call(arguments, 1)

  return function () {
    const newArgs = args.concat(Array.from(arguments))

    return fn.apply(this, newArgs)
  }
}

function add(a, b) {
  return a + b + this.value
}

// const addOne = add.bind(null, 1);
const addOne = partial(add, 1)

const value = 1
const obj = {
  value: 2,
  addOne: addOne
}
console.log(obj.addOne(2))
