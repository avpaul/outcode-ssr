import axios from 'axios';
import getConfig from 'next/config';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const login = ({ email, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(
        `${publicRuntimeConfig.APP_API_URL}/auth/login`,
        { email, password },
        {}
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export default login;
