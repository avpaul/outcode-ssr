import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true
});

const login = ({ email, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data
      } = await axiosInstance.post(`${process.env.APP_API_URL}/auth/login`, {
        email,
        password
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export default login;
