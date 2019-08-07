import axios from "axios";

const login = ({ email, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
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
