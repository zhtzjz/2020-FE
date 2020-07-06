//惰性载入是指函数在第一次执行的时候进行一次判断，之后调用函数时会直接进入所持有的分支
let foo = function () {
  const t = new Date()
  foo = function () {
    return t
  }

  return foo()
}

console.log(foo())
console.log(foo())
