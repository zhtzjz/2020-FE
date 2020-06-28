Function.prototype.call2 = function () {
  if (typeof this !== 'function') {
    throw new Error('this must be function')
  }
  //eslint-disable-next-line
  const [context = window] = arguments
  const fnName = Symbol('fnName')
  context[fnName] = this

  const args = []
  //eslint-disable-next-line
  for (let i = 1; i < arguments.length; i++) {
    args.push(`arguments[${i}]`)
  }
  const result = eval(`context[fnName](${args})`)

  delete context[fnName]

  return result
}

function sayName() {
  //eslint-disable-next-line
  console.log(arguments)
  console.log(this.name)
  return 1
}

const person = {
  name: 'cavin'
}

//eslint-disable-next-line
const result = sayName.call2(person, 1, 2, 3)
console.log(result)

Function.prototype.apply2 = function () {
  if (typeof this !== 'function') {
    throw new Error('this must be function')
  }

  //eslint-disable-next-line
  const [context = window, _args] = arguments
  const fnName = Symbol('fnName')
  context[fnName] = this
  let result = []

  if (!_args.length) {
    result = context[fnName]()
  } else {
    const args = []
    for (let i = 0; i < _args.length; i++) {
      args.push(`_args[${i}]`)
    }
    result = eval(`context[fnName](${args})`)
  }

  delete context[fnName]

  return result
}
//eslint-disable-next-line
const result2 = sayName.apply2(person, [1, 2, 3])
console.log(result2)
