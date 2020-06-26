// 模拟javascript中new 关键字的实现
// 因为new是关键字没办法覆盖

//简单实现一个call巩固一下
Function.prototype.call2 = function (thisArgs) {
  const context = Object(thisArgs) || window
  const fnName = Symbol('fnName')
  const args = []
  context[fnName] = this

  for (let i = 1; i < arguments.length; i++) {
    //eslint-disable-next-line
    args.push(`arguments[${i}]`)
  }
  console.log(eval(args))
  const result = eval(`context[fnName](${args})`)
  delete context[fnName]
  return result
}

function Person() {
  this.name = 'cavin'
  this.age = 18
}

Person.prototype.sayName = function () {
  console.log(this.name)
}

// const person = new Person()
// console.log(person)
// console.log(person.name)
// console.log(person.age)
// person.sayName()
// console.log(person.__proto__ === Person.prototype)
// console.log(person.constructor === Person)

//如果constructor返回值位object，则返回返回值，否则返回obj
function createInstance() {
  const obj = new Object()
  //eslint-disable-next-line
  const constructor = [].shift.call2(arguments)
  obj.__proto__ = constructor.prototype
  //eslint-disable-next-line
  const res = constructor.call2(obj, arguments)

  return typeof res === 'object' ? res : obj
}
const person = createInstance(Person)
console.log(person)
console.log(person.name)
console.log(person.age)
person.sayName()
console.log(person.__proto__ === Person.prototype)
console.log(person.constructor === Person)
