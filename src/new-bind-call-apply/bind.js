/* eslint-disable */
// 模拟bind的实现

Function.prototype.binds = function (context) {
  const args = [].slice.call(arguments, 1)
  const self = this

  function fnBind() {
    const otherArgs = [].slice.call(arguments)
    self.apply(context, args.concat(otherArgs))
  }
  //原型式继承

  function F() {}
  F.prototype = self.prototype
  fnBind.prototype = new F()

  return fnBind
}

const foo = {
  value: 1
}

function bar(name, age) {
  console.log(this.value)
  this.name = name
  console.log(name)
  console.log(age)
}

bar.prototype.sayName = function () {
  console.log(this.name)
}
bar.prototype.value = 1
const bindBar = bar.binds(foo, 'cavin')

bindBar(18)

bindBar('cavin', 18)

const bindBars = new bindBar('cavin', 18)

console.log(bindBars.prototype)
bindBar.prototype.value = 2

console.log(bar.prototype)
