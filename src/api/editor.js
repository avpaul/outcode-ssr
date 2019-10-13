import axios from 'axios';
import getConfig from 'next/config';
import debounce from '../helpers/debounce';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

/**
 *
 * @param {Object} data of the article to create or update
 * @returns {Promise} promise that resolves with the server response
 */
const saveArticle = data =>
  new Promise(async (resolve, reject) => {
    const { slug, featuredImage, description, title } = data;
    const token = localStorage.getItem('token');

    const method = slug === null ? 'post' : 'put';
    const uri = slug === null ? '/articles' : `/articles/${slug}`;
    delete data.slug;
    try {
      if (featuredImage === null) delete data.featuredImage;
      if (title.length < 20 || description.length < 50)
        throw new Error('title or description too short');

      const response = await axios[`${method}`](
        `${publicRuntimeConfig.APP_API_URL}${uri}`,
        { ...data, author: 'av paul' },
        {
          headers: { authorization: `Bearer ${token}` },
          'Content-Type': 'application/json'
        }
      );
      return resolve({ data: response.data.data });
    } catch (error) {
      reject({ error: error.response || error });
    }
  });

const debounceSaveArticle = debounce(saveArticle, 1500);

export default debounceSaveArticle;
