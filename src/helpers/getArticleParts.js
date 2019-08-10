/**
 *
 * @param {String} content markdown string to parse and return the title
 * @returns {String} title the first h1 element that will be the title
 */
const getTitle = content => {
  const text = content.substr(0, 200);
  const startIndex = text.search(/^(<h1>)/) + 4;
  const lastIndex = text.search(/(<\/h1>)/) - 4;
  return text.substr(startIndex, lastIndex);
};

/**
 *
 * @param {String} content markdown string to parse and return the title
 * @returns {String} description the first h1 element that will be the title
 */
const getDescription = content => {
  const text = content.substr(0, 500);
  const startIndex = content.indexOf("<p>") + 3;
  const lastIndex = content.indexOf("</p>");
  return text.substr(startIndex, lastIndex - startIndex);
};

export { getTitle, getDescription };
