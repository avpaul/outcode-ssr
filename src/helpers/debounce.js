/**
 *
 * @param {Function} func the function to execute after the given wait time
 * @param {Number} wait the time to wait before calling func
 * @returns {Promise} promise that resolves to the function's promise
 */
const debounce = (func, wait) => {
  let timeout;
  return function() {
    let context = this,
      args = arguments;

    clearTimeout(timeout);
    return new Promise(resolve => {
      timeout = setTimeout(() => {
        timeout = null;
        resolve(func.apply(context, args));
      }, wait);
    });
  };
};

export default debounce;
