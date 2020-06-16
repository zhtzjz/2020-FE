// eslint-disable-next-line no-unused-vars
const debounce = (fn, delay, immediate) => {
  let timeout = null
  let _immediate = immediate
  return function (...args) {
    clearTimeout(timeout)
    if (_immediate) {
      _immediate = false
      fn.call(this, ...args)
    } else {
      timeout = setTimeout(() => {
        fn.call(this, ...args)
      }, delay)
    }
  }
}
