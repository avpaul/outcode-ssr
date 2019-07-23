import marked from 'marked';

const convertFromMarkdown = (data) => {
  return marked(data);
}

export default convertFromMarkdown;