import marked from "marked";
import Prism from "prismjs";

const convertFromMarkdown = data => {
  return marked(data, {
    headerIds: false,
    highlight: (code, lang, callBack) => {
      return Prism.highlight(
        code,
        Prism.languages[lang || "markup"] || "markup",
        lang || "markup"
      );
    }
  });
};

export default convertFromMarkdown;
