/** utility functions */

/**
 *
 * @param {string} cookieString
 * utility function to parse a cookie string from headers into an object
 * @returns {object} cookies
 */
export function cookieParser(cookieString) {
  const cookies = {};
  try {
    const cookieArray = cookieString.split(/;\s/);
    cookieArray.forEach(cookie => {
      cookies[cookie.split('=')[0]] = cookie.split('=')[1];
    });
  } finally {
    return cookies;
  }
}

/**
 *
 * @param {number} number
 * @param {number} reducedTo
 * a utility function to reduce numbers into a reduced form
 * i.e: if we want numbers between 1-5 and we have 25, it should be reduced to 5
 *      while 23 should be reduced to 3
 * @returns {number} reducedNumber
 */
export function reduceTo(number, reducedTo) {
  if (number <= reducedTo) {
    return number;
  }
  return reduceTo(number - reducedTo - 1, reducedTo);
}

export default reduceTo;

/**
 *
 * @param {*} dateString
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
}

/**
 *
 * a utility function to debounce actions triggered over a short period
 * @param {Function} func the function to execute after the given wait time
 * @param {Number} wait the time to wait before calling func
 * @returns {Promise} promise that resolves to the function's promise
 */
export function debounce(func, wait) {
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
}
