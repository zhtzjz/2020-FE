/* eslint-disable */
// # 原型链继承
function SuperType() {
  this.property = false
}

SuperType.prototype.getSuperValue = function () {
  return this.property
}

function SubType() {}

SubType.prototype = new SuperType()

const child = new SubType()
// console.log(child.getSuperValue())
// console.log(child instanceof SuperType)
// console.log(child instanceof SubType)
// console.log(child.constructor)

function _new() {
  const obj = new Object()
  const constructor = [].shift.call(arguments)
  obj.__proto__ = constructor.property
  constructor.call(obj)

  return obj
}

// 1. 默认原型
console.log(
  child.__proto__ == SubType.prototype,
  SubType.prototype.__proto__ == SuperType.prototype,
  SuperType.prototype.__proto__ == Object.prototype,
  Object.prototype.constructor == Object
)

// 原型链继承的缺点

// 1.所有的属性和方法是共享的，如果属性是引用类型，在一个实例上修改会其他的实例的这个属性也会被修改
// 2.无法向超类传递参数

// 2.借用构造函数
function SuperType1(name) {
  this.property = false
  this.name = name
  // this.sayName = new Function(console.log(this.name))
}

function SubType1(name) {
  SuperType1.call(this, name)
}

const subType1 = new SubType1('cavin')

// console.log(subType1.name)

// 借用构造函数继承的优点
// 可以向超类传递参数

// 借用构造函数继承的缺点
// 1.无法避免构造函数模式的问题,如果构造函数中有方法会造成重复定义，无法共享
// 2.在超类原型上定义的方法也无法被继承

// 3.组合继承

function SuperType2(name) {
  this.property = false
  this.name = name
}

SuperType2.prototype.sayName = function () {
  console.log(2)
}

function SubType2(name) {
  SuperType1.call(this, name)
}

SubType2.prototype.sayName = function () {
  console.log(1)
}

SubType2.prototype = new SuperType2()

SubType2.prototype.constructor = SubType2

const subType2 = new SubType2('cavin')

subType2.sayName()

console.log(subType2.__proto__)

// 4.原型式继承

function createObj(o) {
  function Fn() {}
  Fn.prototype = o

  return new Fn()
}

// 其实就是Object.create()的实现
// 要求一个对象作为另一个对象的基础，然后再根据具体的需求对该对象进行增强
// 缺点：
// 如果传入的对象中有属性是引用类型的话，被所有创建出来的对象共享

// 寄生组合继承

function SuperType3(params) {}

function SubType3(params) {
  SuperType3.call(this, params)
}

SubType3.prototype = createObj(SuperType3.prototype)
SubType3.prototype.constructor = SubType3
