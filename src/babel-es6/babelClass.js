// class Person {
//     constructor(name){
//         this.name = name
//     }

//     sayName(){
//         console.log(this.name)
//     }
// }

// function Person (name){
//     this.name = name
// }

// Person.prototype.sayName = function(){
//     console.log(this.name)
// }

// // #静态属性

// class Person {
//     static age = 10

//     sayName(){
//         console.log(this.name)
//     }
// }

// function Person (name){
//     this.name
// }

// Person.age = 10

// // #getter 和 setter

// class Person {
//     name = null
//     get name(){
//         return this.name
//     }
//     set name (name){
//         this.name = name
//     }
// }

// function Person (name){
//     this.name
// }

// Person.prototype = {
//     get name(){
//         return this.name
//     },
//     set name(name){
//         this.name = name
//     }
// }

// // Babel 编译

// class Person {
//     static age = 18

//     foo = 'foo'

//     constructor(name){
//         this.name = name
//     }

//     sayName() {
//         console.log(this.name)
//     }

//     get name(){
//         return this.name
//     }

//     set name(name){
//         this.name = name
//     }
// }

const _classcallcheck = function (instance, constructor) {
  // eslint-disable-next-line
  if (!instance instanceof constructor) {
    throw new Error('并需通过new 调用')
  }
}

const _creatClass = (function () {
  const defineProperty = function (target, props) {
    for (let i = 0; i < props.length; i++) {
      const desc = props[i]

      desc.enumerable = desc.enumerable || false
      desc.configurable = true

      if (desc.value) desc.writable = true

      Object.defineProperty(target, desc.key, desc)
    }
  }

  return function (constructor, prototypeProp, staticProp) {
    if (prototypeProp) defineProperty(constructor.prototype, prototypeProp)
    if (staticProp) defineProperty(constructor, staticProp)

    return constructor
  }
})()

const Person = (function () {
  function Person() {
    //首先检查是不是通过构造函数进行调用的
    _classcallcheck(this, Person)

    //  this.name = name
    this.foo = 'foo'
  }

  _creatClass(
    Person,
    [
      {
        key: 'sayName',
        value() {
          console.log(1)
        }
      },
      {
        key: 'name',
        get() {
          return this.name
        },
        set(name) {
          this.name = name
        }
      }
    ],
    [
      {
        key: 'age',
        value: 18
      }
    ]
  )

  return Person
})()

const person = new Person('cavin')
person.sayName()
console.log(Person.age)
