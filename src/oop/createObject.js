// 《javascript 高级程序设计》-6.2 创建对象
// 学习笔记
// 分析不同方式的优缺点

// #工厂模式
function createObject(name, age) {
  const obj = new Object()
  obj.name = name
  obj.age = age
}

// eslint-disable-next-line
const cavin = createObject('cavin', 18)
// eslint-disable-next-line
const lily = createObject('lily', 18)

// 优点：
// 1.抽象了创建对象的具体过程，避免了繁琐的代码
// 2.创建过程类似于工厂生产产品的过程，即：原材料--加工--产品...

// 缺点
// 1.虽然工厂模式解决了创建多个相似对象的过程，但是没有解决对象的识别问题，不能反映出对象是同一个原型

// # 构造函数模式

function Person(name, age) {
  this.name = name
  this.age = age
}

// eslint-disable-next-line
const cavin1 = new Person('cavin', 18)
// eslint-disable-next-line
const lily2 = new Person('lily', 18)

console.log(cavin1, lily2)

console.log(cavin instanceof Person)

// 优点：
// 1.没有显示的创建对象,直接将方法和属性赋值给了this,没有return

// function Person(name, age) {
//   this.name = name
//   this.age = agename
//   this.sayName = new Function(console.log(this.name))
// }

//缺点：
// 1.如果构造函数中有方法的话，会在每个实例上创建一遍，不同实例上的同名函数是不相同的

// function Person(name, age) {
//   this.name = name
//   this.age = agename
//   this.sayName = sayName
// }

// function sayName () {
//   console.log(this.name)
// }

// 虽然用上述方法可以解决不同实例的同名函数是不相同的，
// 但是在全局作用域中定义的函数实际上只被某个对象调用，是不合理的

// # 原型模式
// eslint-disable-next-line
function Person1() {}

Person1.prototype.sayName = function () {
  console.log(this.name)
}
Person1.prototype.name = 'cavin'
Person1.prototype.age = 18

const person1 = new Person1()

// 我们创建的每个函数中都有一个指针。prototype指向一个对象，而这个对象的用途是包含所有实例共享的属性和方法
// eslint-disable-next-line
Person1.prototype.isPrototypeOf(person1)
Object.getPrototypeOf(person1) === Person1.prototype

person1.name = 'zh'

// console.log(Object.hasOwnProperty.call(person1, 'name'))
// console.log(Object.hasOwnProperty.call(person1, 'sayName'))

// console.log(Object.hasPrototypeProperty.call(person1, 'sayName'))

//用对象字面量来定义原型

// function Person2() {
// }

// Person2.prototype = {
// name: 'cavin',
// age: 18,
//   sayName: function () {
//     console.log(this.name)
//   }
// }

// 这样会覆盖原来constructor属性
// const person2 = new Person2()

// console.log(person2 instanceof Person2)
// console.log(person2.constructor)
// console.log(person2.name)

// 如果constructor属性真的很重要,可以使用object.defineProperty

// eslint-disable-next-line
function Person2() {}

Person2.prototype = {
  sayName: function () {
    console.log(this.name)
  }
}

Object.defineProperty(Person2.prototype, 'constructor', {
  enumerable: false,
  writable: false,
  value: Person2
})

const person2 = new Person2('cavin')
console.log(person2 instanceof Person2)
console.log(person2.constructor)
console.log(person2.name)

//如果在实例化后在覆盖原型，等于说切断了实例和原来的原型的联系

// 缺点：
// 1.首先省略了构造函数初始化这一步，导致所有实例获取到的值都是相同
// 2.原型上的值是共享的，如果是引用类型就会带来问题

// #构造函数模式和原型模式
// 最常见的方式就组合使用构造函数模式和原型模式，也是我们平时用的

function Person3(name, age) {
  this.name = name
  this.age = age
}

Person3.prototype.sayName = function () {
  console.log(this.name)
}

// #动态原型模式

// 因为javascript并不是一种面向对象语言，继承是通过原型链，所以在prototype上添加会使其OO语言的开发者看到
// 独立的构造函数和原型很困惑

function Person4(name, age) {
  this.name = name
  this.age = age

  if (typeof Person4.prototype.sayName !== 'function') {
    Person4.prototype.sayName = function () {
      console.log(this.name)
    }
  }
}

const person4 = new Person4('cavin')

console.log(person4.name)

// 寄生构造函数模式

// 这个模式可以在特殊情况下位对象创建构造函数，例如我们想创建一个有额外方法的特殊数组
// 并且在不修改Array构造函数的前提下

function SpecialAarray() {
  const array = new Array()
  // eslint-disable-next-line
  array.push.apply(array, arguments)

  array.toPipeString = function () {
    return this.join('|')
  }

  return array
}
// eslint-disable-next-line
const array = new SpecialAarray(1, 2, 3)
console.log(array)
console.log(array.toPipeString())

// # 稳妥构造函数模式

function Person6(name) {
  const obj = new Object()

  obj.sayName = function () {
    console.log(name)
  }

  return obj
}

const person6 = Person6('lily')
person6.sayName()

// 稳妥构造函数模式特点：
// 1.创建对象实例时不引用this
// 2.不使用new操作符
// 3.没有公平的属性

// 使用场景
// 1.在一些安全的环境中，在这些环境中仅禁用了this和new
// 2.防止数据被其他应用程序改动

// person6中保留了sayName方法可以访问到name，没有其他方式可以访问到name属性
