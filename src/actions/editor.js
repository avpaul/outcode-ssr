import Axios from "axios";
import debounce from "../helpers/debounce";
const saveArticle = debounce(data => {
  console.log(data);
}, 1000);

export default saveArticle;
