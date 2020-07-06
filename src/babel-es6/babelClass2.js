function _extends(subClass, supClass) {
  // eslint-disable-next-line
  if (typeof supClass !== null && typeof supClass !== 'function') return
  subClass.prototype = Object.create(supClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  })
  if (supClass) {
    //es6中多了此步骤，继承超类中的静态属性
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, supClass)
      : (subClass.__proto__ = supClass)
  }
}

function _check(instance, constructor) {
  // eslint-disable-next-line
  if (!instance instanceof constructor) {
    // eslint-disable-next-line
    return
  }
}

function _super(self, call) {
  if (!self) return

  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self
}

const Parent = function Parent(name) {
  this.name = name
}

Parent.prototype.sayName = function () {
  console.log(this.name)
}

const Child = (function (_Parent) {
  _extends(Child, _Parent)

  function Child(name) {
    // 检查是否是通过new方法创建的
    _check(this, Child)

    //执行超类
    const _this = _super(
      this,
      (Child.__proto__ || Object.getPrototypeOf(Child)).call(this, name)
    )

    return _this
  }

  return Child
})(Parent)

const child = new Child('cavin')
child.sayName()
