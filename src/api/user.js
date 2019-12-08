import axios from 'axios';

const login = ({ email, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(
        `${process.env.APP_API_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export default login;
