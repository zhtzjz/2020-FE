// eslint-disable-next-line no-unused-vars
const throttle = (fn, delay) => {
  let timer = null
  let last = null

  return function (...args) {
    const now = Number(new Date())
    const remaining = last ? last + delay - now : 0
    if (remaining > 0) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        last = Number(new Date())
        fn.call(this, args)
      }, remaining)
    } else {
      last = Number(new Date())
      fn.call(this, args)
    }
  }
}
