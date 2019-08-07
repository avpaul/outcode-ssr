// a debounce function is a function that return another function that is called after a given time
/**
 *
 * @param {Function} func the function to execute after the given wait time
 * @param {Number} wait the time to wait before calling func
 * @param {Boolean} immediate if true call func immediately
 */
const debounce = (func, wait, immediate = false) => {
  let timeout;
  return function() {
    let context = this,
      args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// function debounce(func, wait, immediate) {
//   var timeout;
//   console.log(timeout);
//   return function() {
//     var context = this,
//       args = arguments;
//     var later = function() {
//       timeout = null;
//       if (!immediate) func.apply(context, args);
//     };
//     var callNow = immediate && !timeout;
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//     if (callNow) func.apply(context, args);
//   };
// }

export default debounce;
