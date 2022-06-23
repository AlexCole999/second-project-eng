const debounce = (fn, ms) => {

  let timeout;

  return function (...args) {

    const fnCall = () => { fn.apply(this, arguments) }

    clearTimeout(timeout);

    timeout = setTimeout(fnCall, ms)

  }

}

export default debounce;